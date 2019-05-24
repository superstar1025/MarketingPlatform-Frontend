import React from "react";
import { Formik } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import get from "lodash/fp/get";

import Modal from "../Modal";
import { getEmailFromToken } from "../../../../utils/browserAPI";
import { IMapper, MutationRenderProp } from "../../../../typeDefinitions";
import CreateDomainFields from "../FormFields/CreateDomainFields";
import { createDomainFormFields } from "../../../../constants/formFields";
import {
  CreateDomainComponent,
  CreateDomainMutation,
  CreateDomainVariables
} from "../../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../GraphQLErrors";
import { areMutationErrors } from "../../../../utils/catalog";
import { Redirect } from "react-router";
import routePaths from "../../../../constants/routePaths";

const {
  UikWidget,
  UikWidgetHeader,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../@uik");

type Props = {
  refetchDomains: () => void;
  isOpen: boolean;
  handleCloseModal: (v?: string) => void;
};

const createDomainMutation = ({ render }: IMapper) => (
  <CreateDomainComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateDomainComponent>
);

type CreateDomainMappedMutations = {
  createDomainMutation: MutationRenderProp<
    CreateDomainMutation,
    CreateDomainVariables
  >;
};

const ComposedMutation = adopt({
  createDomainMutation
});

const CreateStoreModal = ({
  isOpen,
  handleCloseModal,
  refetchDomains
}: Props) => {
  const email = getEmailFromToken();
  return (
    <ComposedMutation>
      {({ createDomainMutation }: CreateDomainMappedMutations) => (
        <Formik
          onSubmit={(values, formActions) => {
            return createDomainMutation
              .mutation({
                variables: {
                  label: values.name
                }
              })
              .then(() => {
                formActions.setSubmitting(false);
              })
              .catch(() => {
                formActions.setSubmitting(false);
              });
          }}
          initialValues={{
            [createDomainFormFields.name]: ""
          }}
          render={({ submitForm, isSubmitting }) => {
            const buttonDisabled =
              createDomainMutation.result.loading || isSubmitting;
            const isError = areMutationErrors({
              createDomainMutation
            });
            const domainId = get("result.data.createDomain.domain.id")(
              createDomainMutation
            );
            if (domainId) {
              refetchDomains();
              handleCloseModal();
              return (
                <Redirect to={routePaths.getDashboardPath(domainId)} push />
              );
            }
            return (
              <Modal isOpen={isOpen} handleCloseModal={handleCloseModal}>
                <UikWidget>
                  <UikWidgetHeader
                    rightEl={
                      <UikButton
                        clear
                        icon={<i className="icofont-close" />}
                        iconOnly
                        onClick={handleCloseModal}
                      />
                    }
                  >
                    Add another store
                  </UikWidgetHeader>
                  <UikWidgetContent>
                    <CreateDomainFields />
                  </UikWidgetContent>
                  {isError && (
                    <UikWidgetContent>
                      <GraphQLErrors
                        mutationResult={createDomainMutation.result}
                      />
                    </UikWidgetContent>
                  )}
                  <UikWidgetContent>
                    <UikFormInputGroup>
                      <UikButton
                        success
                        onClick={submitForm}
                        disabled={buttonDisabled}
                        isLoading={createDomainMutation.result.loading}
                        className={classNames({
                          "uik-button-disabled": buttonDisabled
                        })}
                      >
                        Launch store
                      </UikButton>
                    </UikFormInputGroup>
                  </UikWidgetContent>
                </UikWidget>
              </Modal>
            );
          }}
        />
      )}
    </ComposedMutation>
  );
};

export default CreateStoreModal;
