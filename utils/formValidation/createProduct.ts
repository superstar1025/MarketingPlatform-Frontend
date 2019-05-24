import * as yup from "yup";
import _ from "lodash";

import { createProductFormFields } from "../../constants/formFields";
import { IVariationsFormValues } from "../../views/components/Pages/App/Domain/Catalog/CreateProduct/CreateProductForm/NewVariations";
import { minimumValueRequired, minimumValue, dropDownValueValidation } from ".";
import {
  minimumPriceInCents,
  minimumDimensionSize,
  minimumPriceInDollars
} from "../../constants/catalog";
import { CreateProductFormValues } from "../../typeDefinitions/catalog/forms";
import { AttributesInputObject } from "../../typeDefinitions/__generated__/components";

// IMPORTANT: Our form validation schemas pass back our locale keys instead of the raw error message. This way the components can utilize the translation function and have ready access to the right key.
// const { formValidation } = localeNamespaceKeys;

const titleValidation = yup.string().required("Title is a required field");

export const createProductValidationSchema = () =>
  yup.object().shape({
    [createProductFormFields.title]: titleValidation,
    [createProductFormFields.basePrice]: minimumValueRequired(
      createProductFormFields.basePrice,
      minimumPriceInCents,
      minimumPriceInDollars
    ),
    [createProductFormFields.salePrice]: minimumValue(
      createProductFormFields.salePrice,
      minimumPriceInCents,
      minimumPriceInDollars
    ).nullable(true),
    [createProductFormFields.height]: minimumValueRequired(
      createProductFormFields.height,
      minimumDimensionSize
    ),
    [createProductFormFields.quantity]: yup
      .number()
      .positive("Inventory must be greater than or equal to 0")
      .required("Inventory is a required field"),
    [createProductFormFields.unitOfWeight]: dropDownValueValidation.required(
      "Unit of Weight is a required field"
    ),
    [createProductFormFields.weight]: minimumValueRequired(
      createProductFormFields.weight,
      minimumDimensionSize
    ),
    [createProductFormFields.unitOfDimensions]: dropDownValueValidation.required(
      "Unit of Dimensions is a required field"
    ),
    [createProductFormFields.height]: minimumValueRequired(
      createProductFormFields.height,
      minimumDimensionSize
    ),
    [createProductFormFields.width]: minimumValueRequired(
      createProductFormFields.width,
      minimumDimensionSize
    ),
    [createProductFormFields.length]: minimumValueRequired(
      createProductFormFields.length,
      minimumDimensionSize
    ),
    [createProductFormFields.sku]: yup
      .string()
      .required("Sku is a required field")
  });

export const createProductCustomValidation = (
  values: CreateProductFormValues
) => {
  let errors: { [key: string]: string } = {};
  const attributes = values[createProductFormFields.attributes];

  const checkValues = attributes.map(
    (attribute: AttributesInputObject) => attribute.attributeKey
  );

  if (!_.isEmpty(checkValues)) {
    const dupes = _.filter(
      checkValues,
      (attributeKey: string, i: number, iteratee) =>
        _.includes(iteratee, attributeKey, i + 1)
    );
    if (!_.isEmpty(dupes)) {
      errors[createProductFormFields.attributes] =
        "All attribute keys must be unique";
    }

    if (!_.isEmpty(checkValues.filter((value: string) => value === ""))) {
      errors[createProductFormFields.attributes] =
        "Attribute keys are required";
    }
  }
  return errors;
};

// TODO: move this to product validation
export const createProductVariationValidation = (
  values: IVariationsFormValues
) => {
  let errors: { [key: string]: string } = {};

  const attributes = values[createProductFormFields.attributes];
  if (attributes) {
    const dupes = _.filter(attributes, (val: string, i: number, iteratee) =>
      _.includes(iteratee, val, i + 1)
    );
    if (!_.isEmpty(dupes)) {
      errors[createProductFormFields.attributes] =
        "All attributes must be unique";
    }
  }
  return errors;
};

export const createProductEditVariantValidationSchema = yup.object().shape({
  [createProductFormFields.basePrice]: minimumValueRequired(
    createProductFormFields.basePrice,
    minimumPriceInCents,
    minimumPriceInDollars
  ),
  [createProductFormFields.salePrice]: minimumValue(
    createProductFormFields.salePrice,
    minimumPriceInCents,
    minimumPriceInDollars
  ).nullable(true),
  [createProductFormFields.height]: minimumValueRequired(
    createProductFormFields.height,
    minimumDimensionSize
  ),
  [createProductFormFields.quantity]: yup
    .number()
    .positive("Inventory must be greater than or equal to 0")
    .required("Inventory is a required field"),
  [createProductFormFields.unitOfWeight]: dropDownValueValidation.required(
    "Unit of Weight is a required field"
  ),
  [createProductFormFields.weight]: minimumValueRequired(
    createProductFormFields.weight,
    minimumDimensionSize
  ),
  [createProductFormFields.unitOfDimensions]: dropDownValueValidation.required(
    "Unit of Dimensions is a required field"
  ),
  [createProductFormFields.height]: minimumValueRequired(
    createProductFormFields.height,
    minimumDimensionSize
  ),
  [createProductFormFields.width]: minimumValueRequired(
    createProductFormFields.width,
    minimumDimensionSize
  ),
  [createProductFormFields.length]: minimumValueRequired(
    createProductFormFields.length,
    minimumDimensionSize
  ),
  [createProductFormFields.sku]: yup
    .string()
    .required("Sku is a required field")
});
