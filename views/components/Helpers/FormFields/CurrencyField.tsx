import React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import classNames from "classnames";
import { FormikProps } from "formik";
import FormField from "../FormField";
import FormLabel from "../FormLabel";

type Props = {
  placeholder?: string;
  value?: number | string;
  label?: string;
  onValueChange?: (values: NumberFormatValues) => void;
  onBlur: () => void;
  formBag: FormikProps<{ [key: string]: any }>;
  className?: string;
  name: string;
};

const CurrencyField = ({ label, formBag, className, name, ...rest }: Props) => {
  return (
    <FormField>
      {label && <FormLabel>{label}</FormLabel>}
      <NumberFormat
        className={classNames(className, "form-input")}
        isAllowed={values => {
          const { formattedValue, floatValue } = values;
          return (
            formattedValue === "" ||
            floatValue === undefined ||
            floatValue > -0.01
          );
        }}
        decimalSeparator="."
        decimalScale={2}
        isNumericString={true}
        fixedDecimalScale
        prefix="$"
        thousandSeparator={true}
        {...rest}
      />

      {formBag.touched &&
        formBag.touched[name] &&
        formBag.errors &&
        formBag.errors[name] && (
          <div className="error-message">{formBag.errors[name]}</div>
        )}
    </FormField>
  );
};

export default CurrencyField;
