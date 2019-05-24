import React from "react";
import { FastField, ErrorMessage } from "formik";

import FormRow from "../FormRow";
import FormField from "../FormField";
import FormLabel from "../FormLabel";
import { createDomainFormFields } from "../../../../constants/formFields";

const CreateDomainFields = () => {
  return (
    <FormRow>
      <FormField>
        <FormLabel>Store Name</FormLabel>
        <FastField
          name={createDomainFormFields.name}
          className="uik-input__input"
          type="text"
        />
        <ErrorMessage name={createDomainFormFields.name}>
          {msg => <div className="error-message">{msg}</div>}
        </ErrorMessage>
      </FormField>
    </FormRow>
  );
};

export default CreateDomainFields;
