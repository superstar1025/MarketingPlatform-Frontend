import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import { adopt } from "react-adopt";
import get from "lodash/fp/get";
import classNames from "classnames";

import CowLogo from "../../UI/Icons/CowLogo";
import routePaths from "../../../../constants/routePaths";
import { createDomainFormFields } from "../../../../constants/formFields";
import { areMutationErrors } from "../../../../utils/catalog";
import {
  CreateDomainComponent,
  CreateDomainMutation,
  CreateDomainVariables
} from "../../../../typeDefinitions/__generated__/components";
import { IMapper } from "../Authentication/Register";
import { MutationRenderProp } from "../../../../typeDefinitions";
import { getEmailFromToken } from "../../../../utils/browserAPI";
import GraphQLErrors from "../../Helpers/GraphQLErrors";
import CreateDomainFields from "../../Helpers/FormFields/CreateDomainFields";
import { DomainsContext } from "../../Contexts/Domains";
import FormSection from "../../Helpers/FormSection";
import Loading from "../../Helpers/Loading";

const {
  UikWidget,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../@uik");

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

const CreateDomain = () => {
  const domainsResult = React.useContext(DomainsContext);
  const email = getEmailFromToken();

  if (domainsResult && domainsResult.loading) return <Loading />;
  return (
    <div className="widget-page-container page">
      <div>
        <CowLogo />
      </div>
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
                if (domainsResult) {
                  domainsResult.refetch();
                }
                return (
                  <Redirect push to={routePaths.getDashboardPath(domainId)} />
                );
              }
              return (
                <UikWidget className="widget-page-widget">
                  <UikWidgetContent className="widget-page-header-section">
                    <div className="widget-page-form-header">
                      Name your store
                    </div>
                    <div className="widget-page-form-link">
                      <span className="light-text">Already have a store? </span>
                      <Link to={routePaths.domains.stores}>
                        Go to your store listing.
                      </Link>
                    </div>
                  </UikWidgetContent>

                  <FormSection>
                    <CreateDomainFields />
                  </FormSection>
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
              );
            }}
          />
        )}
      </ComposedMutation>
    </div>
  );
};

export default CreateDomain;
