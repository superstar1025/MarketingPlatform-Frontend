import { FormikProps, FieldProps } from "formik";
import { SkuNode, SkuCreationNode } from "../catalog";
import {
  AddAttributeInput,
  RenameAttributeKeyInput,
  AttributesInputObject,
  ProductImageInputObject
} from "../__generated__/components";

export interface CreateProductFormValues {
  [key: string]: any;
  title?: string;
  description?: string;
  imageUploads?: File[] | [];
  sku?: string;
  basePrice?: number | string;
  salePrice?: number | string;
  quantity?: number;
  unitOfWeight?: { label: string; value: number }[];
  weight?: number;
  htsCode?: string;
  unitOfDimensions?: { label: string; value: number }[];
  length?: number;
  width?: number;
  height?: number;
  attributes?: AttributesInputObject[];
}

export type CreateProductFormBag = FormikProps<CreateProductFormValues>;

export interface ReorderVariantAttributesFormValues {
  attributes?: AttributesInputObject[];
}

export type ReorderVariantAttributesFormBag = FormikProps<
  ReorderVariantAttributesFormValues
>;

export interface UpdateSimpleProductFormValues {
  [key: string]: any;
  title?: string;
  description?: string;
  images?: ProductImageInputObject[];
  sku?: string;
  basePrice?: number | string;
  salePrice?: number | string;
  quantity?: number;
  unitOfWeight?: { label: string; value: number }[];
  weight?: number;
  htsCode?: string;
  unitOfDimensions?: { label: string; value: number }[];
  length?: number;
  width?: number;
  height?: number;
  skus?: SkuNode[];
}

export interface UpdateProductFormValues {
  [key: string]: any;
  title?: string;
  description?: string;
  images?: ProductImageInputObject[];
  htsCode?: string;
  sku?: string;
  basePrice?: number | string;
  salePrice?: number | string;
  quantity?: number;
  unitOfWeight?: { label: string; value: number }[];
  weight?: number;
  unitOfDimensions?: { label: string; value: number }[];
  length?: number;
  width?: number;
  height?: number;
  skus?: SkuNode[];
}

export type UpdateProductFormBag = FormikProps<UpdateProductFormValues>;

export type UpdateProductFormFieldProps = FieldProps<
  UpdateSimpleProductFormValues
>;
export type UpdateSimpleProductFormBag = FormikProps<
  UpdateSimpleProductFormValues
>;

export type EditVariationOptionsFormValues = {
  [key: string]: any;
  additions?: [] | AddAttributeInput[];
  renames?: [] | RenameAttributeKeyInput[];
  removals?: [] | string[];
  attributes?: [] | AttributesInputObject[];
};

export interface UpdateProductReorderVariationsFormValues {
  [key: string]: any;
  attributes?: AttributesInputObject[];
}
export type UpdateProductReorderVariationsFormBag = FormikProps<
  UpdateProductReorderVariationsFormValues
>;

export type EditVariationOptionsFormBag = FormikProps<
  EditVariationOptionsFormValues
>;

export interface UpdateProductEditVariantModalFormValues
  extends SkuCreationNode {}

export type UpdateProductEditVariantFormBag = FormikProps<
  UpdateProductEditVariantModalFormValues
>;

export interface UpdateProductAddVariantModalFormValues
  extends SkuCreationNode {}

export type UpdateProductAddVariantModalFormBag = FormikProps<
  UpdateProductAddVariantModalFormValues
>;
