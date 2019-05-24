import * as yup from "yup";
import _ from "lodash";
import isEmpty from "lodash/fp/isEmpty";

import localeNamespaceKeys from "../../constants/localization";
import {
  updateProductFormFields,
  updateProducAddVariantFormFields,
  updateProductEditVariationOptionsFormFields,
  updateSimpleProductFormFields
} from "../../constants/formFields";
import {
  EditVariationOptionsFormValues,
  UpdateSimpleProductFormValues
} from "../../typeDefinitions/catalog/forms";
import { dropDownValueValidation, minimumValueRequired, minimumValue } from ".";
import {
  minimumPriceInCents,
  minimumDimensionSize,
  minimumPriceInDollars
} from "../../constants/catalog";
import {
  RenameAttributeKeyInput,
  AddAttributeInput,
  AttributesInputObject
} from "../../typeDefinitions/__generated__/components";

// TODO: localization
// IMPORTANT: Our form validation schemas pass back our locale keys instead of the raw error message. This way the components can utilize the translation function and have ready access to the right key.

const titleValidation = yup.string().required("Title is a required field");

export const updateProductWithVariantsValidationSchema = yup.object().shape({
  [updateProductFormFields.title]: titleValidation
});

export const updateSimpleProductValidationSchema = () =>
  yup.object().shape({
    [updateSimpleProductFormFields.title]: titleValidation,
    [updateSimpleProductFormFields.basePrice]: minimumValueRequired(
      updateSimpleProductFormFields.basePrice,
      minimumPriceInCents,
      minimumPriceInDollars
    ),
    [updateSimpleProductFormFields.salePrice]: minimumValue(
      updateSimpleProductFormFields.salePrice,
      minimumPriceInCents,
      minimumPriceInDollars
    ).nullable(true),
    [updateSimpleProductFormFields.height]: minimumValueRequired(
      updateSimpleProductFormFields.height,
      minimumDimensionSize
    ),
    [updateSimpleProductFormFields.quantity]: yup
      .number()
      .positive("Inventory must be greater than or equal to 0")
      .required("Inventory is a required field"),
    [updateSimpleProductFormFields.unitOfWeight]: dropDownValueValidation.required(
      "Unit of Weight is a required field"
    ),
    [updateSimpleProductFormFields.weight]: minimumValueRequired(
      updateSimpleProductFormFields.weight,
      minimumDimensionSize
    ),
    [updateSimpleProductFormFields.unitOfDimensions]: dropDownValueValidation.required(
      "Unit of Dimensions is a required field"
    ),
    [updateSimpleProductFormFields.height]: minimumValueRequired(
      updateSimpleProductFormFields.height,
      minimumDimensionSize
    ),
    [updateSimpleProductFormFields.width]: minimumValueRequired(
      updateSimpleProductFormFields.width,
      minimumDimensionSize
    ),
    [updateSimpleProductFormFields.length]: minimumValueRequired(
      updateSimpleProductFormFields.length,
      minimumDimensionSize
    ),
    [updateSimpleProductFormFields.sku]: yup
      .string()
      .required("Sku is a required field")
  });

export const updateProductVariationOptionsValidation = (
  values: EditVariationOptionsFormValues
) => {
  let errors: { [key: string]: string } = {};
  const renames = values[updateProductEditVariationOptionsFormFields.renames];
  const additions =
    values[updateProductEditVariationOptionsFormFields.additions];
  const attributes =
    values[updateProductEditVariationOptionsFormFields.attributes];

  const renamesToCheck = renames.map(
    (rename: RenameAttributeKeyInput) => rename.newName
  );
  const additionsToCheck = additions.map(
    (addition: AddAttributeInput) => addition.attributeKey
  );

  const checkValues = [...renamesToCheck, ...additionsToCheck];

  if (!isEmpty(checkValues)) {
    const dupes = _.filter(
      checkValues,
      (attributeKey: string, i: number, iteratee) =>
        _.includes(iteratee, attributeKey, i + 1)
    );
    if (!isEmpty(dupes)) {
      errors[updateProductEditVariationOptionsFormFields.renames] =
        "All attribute keys must be unique";
    }

    if (!isEmpty(checkValues.filter(value => value === ""))) {
      errors[updateProductEditVariationOptionsFormFields.renames] =
        "Attribute keys are required";
    }
  }

  if (isEmpty([...attributes, ...additions])) {
    errors[updateProducAddVariantFormFields.attributes] =
      "You must have at least one attribute with one attribute value";
  }
  return errors;
};

export const updateProductAddVariantValidation = (defaultAttributes: {
  [key: string]: any;
}) => {
  const attributesShape = defaultAttributes
    ? Object.keys(defaultAttributes).reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: yup.string().required(`${curr} is required`)
        };
      }, {})
    : {};

  return yup.object().shape({
    [updateProducAddVariantFormFields.attributes]: yup
      .object()
      .shape(attributesShape),
    [updateProducAddVariantFormFields.basePrice]: minimumValueRequired(
      updateProducAddVariantFormFields.basePrice,
      minimumPriceInCents,
      minimumPriceInDollars
    ),
    [updateProducAddVariantFormFields.salePrice]: minimumValue(
      updateProducAddVariantFormFields.salePrice,
      minimumPriceInCents,
      minimumPriceInDollars
    ).nullable(true),
    [updateProducAddVariantFormFields.height]: minimumValueRequired(
      updateProducAddVariantFormFields.height,
      minimumDimensionSize
    ),
    [updateProducAddVariantFormFields.quantity]: yup
      .number()
      .positive("Inventory must be greater than or equal to 0")
      .required("Inventory is a required field"),
    [updateProducAddVariantFormFields.unitOfWeight]: dropDownValueValidation.required(
      "Unit of Weight is a required field"
    ),
    [updateProducAddVariantFormFields.weight]: minimumValueRequired(
      updateProducAddVariantFormFields.weight,
      minimumDimensionSize
    ),
    [updateProducAddVariantFormFields.unitOfDimensions]: dropDownValueValidation.required(
      "Unit of Dimensions is a required field"
    ),
    [updateProducAddVariantFormFields.height]: minimumValueRequired(
      updateProducAddVariantFormFields.height,
      minimumDimensionSize
    ),
    [updateProducAddVariantFormFields.width]: minimumValueRequired(
      updateProducAddVariantFormFields.width,
      minimumDimensionSize
    ),
    [updateProducAddVariantFormFields.length]: minimumValueRequired(
      updateProducAddVariantFormFields.length,
      minimumDimensionSize
    ),
    [updateProducAddVariantFormFields.sku]: yup
      .string()
      .required("Sku is a required field")
  });
};

export const updateProductEditVariantValidation = yup.object().shape({
  [updateProducAddVariantFormFields.basePrice]: minimumValueRequired(
    updateProducAddVariantFormFields.basePrice,
    minimumPriceInCents,
    minimumPriceInDollars
  ),
  [updateProducAddVariantFormFields.salePrice]: minimumValue(
    updateProducAddVariantFormFields.salePrice,
    minimumPriceInCents,
    minimumPriceInDollars
  ).nullable(true),
  [updateProducAddVariantFormFields.height]: minimumValueRequired(
    updateProducAddVariantFormFields.height,
    minimumDimensionSize
  ),
  [updateProducAddVariantFormFields.quantity]: yup
    .number()
    .positive("Inventory must be greater than or equal to 0")
    .required("Inventory is a required field"),
  [updateProducAddVariantFormFields.unitOfWeight]: dropDownValueValidation.required(
    "Unit of Weight is a required field"
  ),
  [updateProducAddVariantFormFields.weight]: minimumValueRequired(
    updateProducAddVariantFormFields.weight,
    minimumDimensionSize
  ),
  [updateProducAddVariantFormFields.unitOfDimensions]: dropDownValueValidation.required(
    "Unit of Dimensions is a required field"
  ),
  [updateProducAddVariantFormFields.height]: minimumValueRequired(
    updateProducAddVariantFormFields.height,
    minimumDimensionSize
  ),
  [updateProducAddVariantFormFields.width]: minimumValueRequired(
    updateProducAddVariantFormFields.width,
    minimumDimensionSize
  ),
  [updateProducAddVariantFormFields.length]: minimumValueRequired(
    updateProducAddVariantFormFields.length,
    minimumDimensionSize
  ),
  [updateProducAddVariantFormFields.sku]: yup
    .string()
    .required("Sku is a required field")
});

export const updateSimpleProductCustomValidation = (
  values: UpdateSimpleProductFormValues
) => {
  let errors: { [key: string]: string } = {};
  const attributes = values[updateSimpleProductFormFields.attributes];

  const checkValues = attributes.map(
    (attribute: AttributesInputObject) => attribute.attributeKey
  );

  if (!isEmpty(checkValues)) {
    const dupes = _.filter(
      checkValues,
      (attributeKey: string, i: number, iteratee) =>
        _.includes(iteratee, attributeKey, i + 1)
    );
    if (!isEmpty(dupes)) {
      errors[updateSimpleProductFormFields.attributes] =
        "All attribute keys must be unique";
    }

    if (!isEmpty(checkValues.filter((value: string) => value === ""))) {
      errors[updateSimpleProductFormFields.attributes] =
        "Attribute keys are required";
    }
  }
  return errors;
};
