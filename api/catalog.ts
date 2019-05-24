import isEmpty from "lodash/fp/isEmpty";
import get from "lodash/fp/get";

import {
  createProductFormFields,
  updateProductFormFields,
  updateSimpleProductFormFields
} from "../constants/formFields";
import {
  CreateProductFormValues,
  UpdateProductFormValues
} from "../typeDefinitions/catalog/forms";
import { IMappedCreateProductMutations } from "../views/components/Pages/App/Domain/Catalog/CreateProduct";
import {
  removeSkuBlacklist,
  getSkuIds,
  generateSkuFromFormValues
} from "../utils/catalog";
import { SkuCreationNode } from "../typeDefinitions/catalog";
import { mutationNames } from "../constants/graphql";
import { IMappedUpdateProductMutations } from "../views/components/Pages/App/Domain/Catalog/CatalogProducts/ProductDetails";
import {
  ProductNode,
  ProductImageInputObject
} from "../typeDefinitions/__generated__/components";

export const submitCreateProductForm = async (
  domainId: string,
  values: CreateProductFormValues,
  mutations: IMappedCreateProductMutations
) => {
  try {
    const createProductResult = await mutations.createProductMutation.mutation({
      variables: {
        domainId,
        name: values.title || "",
        description: values.description || undefined,
        gender: values.gender,
        htsCode: values.htsCode || undefined,
        attributes: values.attributes
      }
    });

    const productId =
      (createProductResult &&
        createProductResult.data &&
        createProductResult.data.createProduct &&
        createProductResult.data.createProduct.product &&
        createProductResult.data.createProduct.product.id) ||
      "";

    const stripeProductId =
      (createProductResult &&
        createProductResult.data &&
        createProductResult.data.createProduct &&
        createProductResult.data.createProduct.product &&
        createProductResult.data.createProduct.product.stripeId) ||
      "";

    let skuIds = [];
    const isSimpleProduct = isEmpty(values.attributes);

    if (productId) {
      // PRODUCT WITH VARIANTS
      if (!isSimpleProduct) {
        const uploadSkus = values.skus.map((sku: SkuCreationNode) => {
          return removeSkuBlacklist(sku);
        });

        const createSkusResult = await mutations.createSkuMutation.mutation({
          variables: {
            domainId,
            productId,
            stripeProductId,
            skus: uploadSkus
          }
        });

        skuIds = getSkuIds(createSkusResult, mutationNames.createSku);

        await Promise.all(
          skuIds.map((skuId: string, index: number) => {
            const image = get(`${createProductFormFields.skus}.${index}.image`)(
              values
            );
            if (!image) {
              return Promise.resolve(false);
            }
            return mutations.uploadSkuImagesMutation
              .mutation({
                variables: {
                  domainId,
                  skuId,
                  image
                }
              })
              .then(() => {
                return true;
              })
              .catch(() => {
                return false;
              });
          })
        );
      } else {
        // SIMPLE PRODUCT
        await mutations.createSkuMutation.mutation({
          variables: {
            domainId,
            productId,
            stripeProductId,
            skus: [
              generateSkuFromFormValues({
                sku: values[createProductFormFields.sku],
                basePrice: values[createProductFormFields.basePrice],
                salePrice: values[createProductFormFields.salePrice],
                quantity: values[createProductFormFields.quantity],
                unitOfWeight: values[createProductFormFields.unitOfWeight],
                weight: values[createProductFormFields.weight],
                unitOfDimensions:
                  values[createProductFormFields.unitOfDimensions],
                height: values[createProductFormFields.height],
                width: values[createProductFormFields.width],
                length: values[createProductFormFields.length]
              })
            ]
          }
        });
      }

      if (
        values[createProductFormFields.imageUploads] &&
        !isEmpty(values[createProductFormFields.imageUploads])
      ) {
        const productImages = [
          ...values[createProductFormFields.imageUploads]
        ].map((image: File) => ({
          image
        }));
        await mutations.uploadProductImagesMutation.mutation({
          variables: {
            domainId,
            productId,
            images: productImages
          }
        });
      }
      return Promise.resolve(productId);
    }
    return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const submitUpdateSimpleProductForm = async (
  domainId: string,
  product: ProductNode,
  values: any,
  mutations: IMappedUpdateProductMutations
) => {
  const productId = product.id;
  const isSimpleProduct = isEmpty(values.attributes);
  try {
    await mutations.updateProductMutation.mutation({
      variables: {
        domainId,
        id: productId,
        stripeId: product.stripeId,
        name: values.title,
        description: values.description || undefined,
        gender: values.gender,
        htsCode: values.htsCode || undefined
      }
    });

    let skuIds = [];

    if (productId) {
      // SIMPLE PRODUCT NOW WITH VARIANTS
      if (!isSimpleProduct) {
        await mutations.updateProductAttributesMutation.mutation({
          variables: {
            domainId,
            productId,
            stripeProductId: product.stripeId,
            attributes: values.attributes
          }
        });
        const skus = values.skus.map((sku: SkuCreationNode) => {
          return generateSkuFromFormValues(sku);
        });

        const createSkusResult = await mutations.createOrUpdateSkuMutation.mutation(
          {
            variables: {
              domainId,
              productId,
              stripeProductId: product.stripeId,
              skus
            }
          }
        );

        skuIds = getSkuIds(createSkusResult, mutationNames.createSku);

        await Promise.all(
          skuIds.map((skuId: string, index: number) => {
            const image =
              values[updateSimpleProductFormFields.skus][index] &&
              values[updateSimpleProductFormFields.skus][index].image;

            if (!image) {
              return Promise.resolve(false);
            }
            return mutations.uploadSkuImagesMutation
              .mutation({
                variables: {
                  domainId,
                  skuId,
                  image
                }
              })
              .then(() => {
                return true;
              })
              .catch(() => {
                return false;
              });
          })
        );
      } else {
        // SIMPLE PRODUCT
        const simpleProductSkuId =
          product.skus &&
          product.skus.edges[0] &&
          product.skus.edges[0].node &&
          product.skus.edges[0].node.id;

        await mutations.createOrUpdateSkuMutation.mutation({
          variables: {
            domainId,
            productId,
            skus: [
              {
                ...generateSkuFromFormValues({
                  sku: values[updateSimpleProductFormFields.sku],
                  basePrice: values[updateSimpleProductFormFields.basePrice],
                  salePrice: values[updateSimpleProductFormFields.salePrice],
                  quantity: values[updateSimpleProductFormFields.quantity],
                  unitOfWeight:
                    values[updateSimpleProductFormFields.unitOfWeight],
                  weight: values[updateSimpleProductFormFields.weight],
                  unitOfDimensions:
                    values[updateSimpleProductFormFields.unitOfDimensions],
                  height: values[updateSimpleProductFormFields.height],
                  width: values[updateSimpleProductFormFields.width],
                  length: values[updateSimpleProductFormFields.length]
                }),
                id: simpleProductSkuId
              }
            ]
          }
        });
      }

      if (
        values[updateSimpleProductFormFields.images] &&
        !isEmpty(values[updateSimpleProductFormFields.images])
      ) {
        const productImages = values[updateSimpleProductFormFields.images].map(
          (image: ProductImageInputObject) => ({
            id: image.id
          })
        );
        await mutations.uploadProductImagesMutation.mutation({
          variables: {
            domainId,
            productId,
            images: productImages
          }
        });
      }
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const submitUpdateProductForm = (
  domainId: string,
  productId: string,
  values: UpdateProductFormValues,
  mutations: IMappedUpdateProductMutations
) => {
  const updateProduct = mutations.updateProductMutation.mutation({
    variables: {
      domainId,
      id: productId,
      name: values.name,
      description: values.description || undefined,
      gender: values.gender,
      htsCode: values.htsCode || undefined
    }
  });
  let imageUpload = Promise.resolve();
  const images =
    values[updateProductFormFields.images] &&
    [...values[updateProductFormFields.images]].map(
      (image: ProductImageInputObject) => ({
        id: image.id
      })
    );
  if (images && !isEmpty(images)) {
    imageUpload = mutations.uploadProductImagesMutation
      .mutation({
        variables: {
          domainId,
          productId,
          images
        }
      })
      .then(result => result)
      .catch(error => error);
  }

  return Promise.all([updateProduct, imageUpload]);
};
