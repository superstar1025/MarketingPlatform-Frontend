import * as yup from "yup";
import startCase from "lodash/fp/startCase";

export const dropDownValueValidation = yup.array().of(
  yup.object().shape({
    label: yup.string().required(),
    value: yup.mixed().required()
  })
);

export const minimumValueRequired = (
  field: string,
  min: number,
  displayMin?: number
) =>
  yup
    .number()
    .required(`${startCase(field)} is a required field`)
    .min(
      min,
      `${startCase(field)} has a minimum value of ${
        displayMin === undefined ? min : displayMin
      }`
    );

export const minimumValue = (field: string, min: number, displayMin?: number) =>
  yup
    .number()
    .min(
      min,
      `${startCase(field)} has a minimum value of ${
        displayMin === undefined ? min : displayMin
      }`
    );
