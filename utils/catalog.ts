import { FetchResult } from "react-apollo";
import cartestianProduct from "cartesian-product";
import shortid from "shortid";
import get from "lodash/fp/get";
import keys from "lodash/fp/keys";
import uniq from "lodash/fp/uniq";
import flow from "lodash/fp/flow";
import zipObject from "lodash/fp/zipObject";
import isNumber from "lodash/fp/isNumber";
import isEmpty from "lodash/fp/isEmpty";
import flatten from "lodash/fp/flatten";
import toNumber from "lodash/fp/toNumber";
import toUpper from "lodash/fp/toUpper";
import omit from "lodash/fp/omit";
import includes from "lodash/fp/includes";

import {
  defaultAttributes,
  unitsOfWeight,
  defaultUnitOfWeight,
  unitsOfDimension,
  minimumPriceInCents,
  minimumDimensionSize,
  minimumQuantity,
  defaultUnitOfDimension
} from "../constants/catalog";

import {
  updateProductFormFields,
  updateSimpleProductFormFields,
  createProductEditVariantFormFields
} from "../constants/formFields";
import { extractDropdownValue } from ".";
import {
  SkuNodeEdge,
  SkuCreationNode,
  SkuNode
} from "../typeDefinitions/catalog";
import { CreateProductFormValues } from "../typeDefinitions/catalog/forms";
import { MutationRenderProp } from "../typeDefinitions";
import {
  SkuNodeConnection,
  ProductNode,
  AttributesInputObject,
  AddAttributeInput
} from "../typeDefinitions/__generated__/components";
import { getFormattedPrice } from "./price";

// TODO: write test for these
export const getDisplayPrice = (
  basePrice?: string | number | null,
  salePrice?: string | number | null
) => {
  if (basePrice === "" && salePrice === "") {
    return null;
  }
  const bp = toNumber(basePrice);
  if (salePrice === null && !isNaN(bp) && bp !== null) {
    return getFormattedPrice(bp);
  }
  const sp = toNumber(salePrice);
  if (isNaN(bp) && isNaN(sp)) {
    return null;
  }
  if (sp !== null && !isNaN(sp) && sp < bp) {
    return getFormattedPrice(sp);
  } else {
    return getFormattedPrice(bp);
  }
};

export const getNewDefaultAttribute = (
  attributes?: (AttributesInputObject | AddAttributeInput)[]
) => {
  return defaultAttributes.filter(defaultAttribute => {
    const foundMatch =
      attributes &&
      attributes.find(
        attribute => attribute.attributeKey === defaultAttribute.attributeKey
      );
    if (foundMatch) return false;
    return true;
  })[0];
};

export const getSkuPermutationsFromAttributeValues = (
  attributes: AttributesInputObject[],
  values: CreateProductFormValues
) => {
  const allAttributes = attributes.map(attribute => attribute.attributeKey);
  const allAttributeValues = attributes.map(
    attribute => attribute.attributeValues
  );
  const permutations = cartestianProduct(allAttributeValues);
  const {
    sku,
    basePrice,
    salePrice,
    quantity,
    unitOfWeight,
    weight,
    unitOfDimensions,
    height,
    width,
    length
  } = values;

  return permutations.map((permutation: string[]) => {
    const attributes = zipObject(allAttributes)(permutation);
    const dynamicSku = Object.values(attributes)
      .map(attribute => toUpper(attribute))
      .join("-");
    return {
      ...generateSkuFromFormValues({
        attributes,
        basePrice,
        salePrice,
        quantity,
        unitOfWeight,
        weight,
        unitOfDimensions,
        height,
        width,
        length
      }),
      tempId: shortid.generate(),
      sku: sku ? `${sku}-${dynamicSku}` : dynamicSku
    };
  });
};

export const convertFinalSkusToUniqueProductAttributes = (
  skus: SkuCreationNode[]
) => {
  const attributes = skus.map((sku: SkuCreationNode) => keys(sku.attributes));
  const flattenedSkuAttributes = flatten(attributes);
  const uniqueAttributes = uniq(flattenedSkuAttributes);
  return uniqueAttributes;
};

export const generateSkuFromFormValues = (sku: SkuCreationNode) => {
  return {
    id: sku.id || undefined,
    stripeId: sku.stripeId || undefined,
    sku: sku.sku || "",
    attributes: sku.attributes || undefined,
    basePrice: isNumber(sku.basePrice) ? sku.basePrice : minimumPriceInCents,
    salePrice:
      sku.salePrice === undefined ||
      sku.salePrice === null ||
      typeof sku.salePrice === "string"
        ? null
        : sku.salePrice,
    quantity: isNumber(sku.quantity) ? sku.quantity : minimumQuantity,
    unitOfWeight: extractDropdownValue(sku.unitOfWeight),
    weight: isNumber(sku.weight) ? `${sku.weight}` : minimumDimensionSize,
    unitOfDimensions: extractDropdownValue(sku.unitOfDimensions),
    height: isNumber(sku.height) ? `${sku.height}` : minimumDimensionSize,
    width: isNumber(sku.width) ? `${sku.width}` : minimumDimensionSize,
    length: isNumber(sku.length) ? `${sku.length}` : minimumDimensionSize
  };
};

export const removeSkuBlacklist = (sku: SkuCreationNode) => {
  return omit([
    createProductEditVariantFormFields.tempId,
    createProductEditVariantFormFields.image
  ])(sku);
};

export const getSkuIds = (
  result: void | FetchResult<any, Record<string, any>>,
  mutationName: string
) => {
  return flow(
    get(`data.${mutationName}.skus`),
    skus =>
      skus
        ? skus.reduce(
            (accVal: string[], currVal: { id: string }) => [
              ...accVal,
              currVal.id
            ],
            []
          )
        : []
  )(result);
};

// PRODUCT DETAILS
export const extractSkus = (skus?: null | SkuNodeConnection) => {
  const edges = get("edges")(skus);

  if (edges) {
    return edges
      .map((sku: SkuNodeEdge) => sku.node)
      .filter((sku: SkuNode) => !isEmpty(sku.attributes));
  }
  return [];
};

export const getUnitOfWeightByNumber = (number: number) => {
  if (isNumber(number)) {
    const unitOfWeight = unitsOfWeight.find(unit => unit.value === number);
    return unitOfWeight ? [unitOfWeight] : [defaultUnitOfWeight];
  }
  return [defaultUnitOfWeight];
};

export const getUnitOfDimensionsByNumber = (number: number) => {
  if (isNumber(number)) {
    const unitOfDimension = unitsOfDimension.find(
      unit => unit.value === number
    );
    return unitOfDimension ? [unitOfDimension] : [defaultUnitOfDimension];
  }
  return [defaultUnitOfWeight];
};

export const getProductDetailsInitialValuesFromProduct = (
  product: null | ProductNode
) => {
  if (!product) {
    return;
  }
  const isSimpleProduct = isEmpty(product.attributes);
  const images = product.images
    ? product.images.edges.map(imageNode => imageNode.node)
    : [];

  if (isSimpleProduct) {
    const basePath = "skus.edges.0.node.";
    return {
      [updateSimpleProductFormFields.title]: product.name,
      [updateSimpleProductFormFields.description]: product.description || "",
      [updateSimpleProductFormFields.images]: images,
      [updateSimpleProductFormFields.attributes]: [],
      [updateSimpleProductFormFields.htsCode]: product.htsCode,
      [updateSimpleProductFormFields.skus]: [],
      [updateSimpleProductFormFields.gender]:
        product.gender === undefined || product.gender === null
          ? 5
          : product.gender,
      [updateSimpleProductFormFields.basePrice]: get(
        `${basePath}${updateSimpleProductFormFields.basePrice}`
      )(product),
      [updateSimpleProductFormFields.salePrice]: get(
        `${basePath}${updateSimpleProductFormFields.salePrice}`
      )(product),
      [updateSimpleProductFormFields.weight]: get(
        `${basePath}${updateSimpleProductFormFields.unitOfWeight}`
      )(product),
      [updateSimpleProductFormFields.unitOfWeight]: flow(
        get(`${basePath}${updateSimpleProductFormFields.unitOfWeight}`),
        getUnitOfWeightByNumber
      )(product),
      [updateSimpleProductFormFields.unitOfDimensions]: flow(
        get(`${basePath}${updateSimpleProductFormFields.unitOfDimensions}`),
        getUnitOfDimensionsByNumber
      )(product),
      [updateSimpleProductFormFields.length]: get(
        `${basePath}${updateSimpleProductFormFields.length}`
      )(product),
      [updateSimpleProductFormFields.width]: get(
        `${basePath}${updateSimpleProductFormFields.width}`
      )(product),
      [updateSimpleProductFormFields.height]: get(
        `${basePath}${updateSimpleProductFormFields.height}`
      )(product),
      [updateSimpleProductFormFields.sku]: get(
        `${basePath}${updateSimpleProductFormFields.sku}`
      )(product),
      [updateSimpleProductFormFields.quantity]: get(
        `${basePath}${updateSimpleProductFormFields.quantity}`
      )(product)
    };
  } else {
    return {
      [updateProductFormFields.title]: product.name,
      [updateProductFormFields.description]: product.description || "",
      [updateProductFormFields.images]: images,
      [updateProductFormFields.htsCode]: product.htsCode,
      [updateProductFormFields.gender]:
        product.gender === undefined || product.gender === null
          ? 5
          : product.gender
    };
  }
};

export const convertSkuNodesToRemoveSkuInputObjects = (skus: SkuNode[]) =>
  skus.map((sku: SkuNode) => ({ id: sku.id, stripeId: sku.stripeId }));

export const areMutationsLoading = (calls: {
  [key: string]: MutationRenderProp<any, any>;
}) =>
  !isEmpty(calls)
    ? Object.keys(calls)
        .map((key: string) => calls[key])
        .reduce((accVal, call) => call.result.loading || accVal, false)
    : [];

export const areMutationErrors = (calls: {
  [key: string]: MutationRenderProp<any, any>;
}) =>
  !isEmpty(calls)
    ? Object.keys(calls)
        .map((key: string) => calls[key])
        .reduce((accVal, call) => !isEmpty(call.result.error) || accVal, false)
    : [];

export const doesProductAttributeValueExist = (
  attribute: string,
  attributeValue: string,
  productAttributes: AttributesInputObject[]
) => {
  const { attributeValues: matchingAttributeValues } = productAttributes.find(
    ({ attributeKey }) => attributeKey === attribute
  ) || { attributeValues: [] };
  const doesExist = includes(attributeValue)(matchingAttributeValues);
  if (doesExist) {
    return true;
  }
  return false;
};

export const updatedAttributesSchema = (
  skuAttributes: { [key: string]: string },
  productAttributes: AttributesInputObject[]
) => {
  let schema = [...productAttributes];

  for (const attribute in skuAttributes) {
    const attributeValue = skuAttributes[attribute];
    const doesExist = doesProductAttributeValueExist(
      attribute,
      attributeValue,
      productAttributes
    );
    if (!doesExist) {
      schema = schema.map(productAttribute => {
        if (productAttribute.attributeKey === attribute) {
          return {
            ...productAttribute,
            attributeValues: [
              ...productAttribute.attributeValues,
              attributeValue
            ]
          };
        }
        return productAttribute;
      });
    }
  }
  return schema;
};
