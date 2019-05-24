import React, { useRef } from "react";
import { NamespacesConsumer } from "react-i18next";
import { Formik, ErrorMessage } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import StripeComponent from "./StripeComponent";

import localeNamespaceKeys from "../../../../../constants/localization";
import { areMutationErrors } from "../../../../../utils/catalog";
import Modal from "../../Modal";
import { MODAL_TYPES } from "../../../../../constants/modals";
import { ModalContext } from "../../../Contexts/Modals";

const {
  UikWidget,
  UikWidgetHeader,
  UikButton,
  UikCheckbox,
  UikWidgetContent,
  UikFormInputGroup,
} = require("../../../../../@uik");
import FormRow from "../../FormRow";
import FormField from "../../FormField";
import { addCardFormFields } from "../../../../../constants/formFields";
import {
  walletModalStyle,
  WalletModalProps
} from ".";
import { IMapper, MutationRenderProp } from "../../../../../typeDefinitions";

import {
  AddPaymentCardsComponent,
  AddPaymentCardsMutation,
  AddPaymentCardsVariables
} from "../../../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../../../Helpers/GraphQLErrors";

const addPaymentCardsMutation = ({ render }: IMapper) => (
  <AddPaymentCardsComponent>
    {(mutation, result) => render({ mutation, result })}
  </AddPaymentCardsComponent>
);

type AddPaymentCardsMappedMutations = {
  addPaymentCardsMutation: MutationRenderProp<
    AddPaymentCardsMutation,
    AddPaymentCardsVariables
  >;
};

const ComposedMutation = adopt({
  addPaymentCardsMutation
});

const AddCreditCardModal = ({
  currentDomain,
  currentWallet,
  isOpen,
  handleCloseModal
}: WalletModalProps) => {
  const { toggleModalType } = React.useContext(ModalContext);
  const { id } = currentDomain;
  const stripeRef: any = useRef();
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.wallet._name]}>
      {(t) => 
        <ComposedMutation>
          {({ addPaymentCardsMutation }: AddPaymentCardsMappedMutations)  => (
              <Formik
                onSubmit={(values, formActions) => {
                  stripeRef.current.getStripe().createToken()
                    .then((payload: any) => {
                      if (payload.token) {
                        let variables = {
                          domainId: id,
                          sourceTokens: [payload.token.id],
                          defaultSourceToken: payload.token.id,
                        };
                        if (!values[addCardFormFields.defaultPaymentMethod]) {
                          delete variables.defaultSourceToken;
                        }
                        return addPaymentCardsMutation
                          .mutation({
                            variables: variables
                          })
                          .then(() => {
                            formActions.setSubmitting(false);
                            toggleModalType(MODAL_TYPES.OPEN_WALLET, {
                              currentDomain,
                              currentWallet,
                              type: MODAL_TYPES.WALLET.VIEW_WALLET
                            });
                          })
                          .catch(() => {
                            formActions.setSubmitting(false);
                          });
                      } else if (payload.error) {
                        formActions.setFieldError(addCardFormFields.errorField, payload.error.message);
                        formActions.setSubmitting(false);
                      } else {
                        formActions.setSubmitting(false);
                      }
                    });
                }}
                initialValues={{
                  [addCardFormFields.defaultPaymentMethod]: true,
                  [addCardFormFields.errorField]: null,
                }}
                render={({ submitForm, isSubmitting, setFieldValue, handleChange }) => {
                  const buttonDisabled =
                    addPaymentCardsMutation.result.loading ||
                    isSubmitting;
                  const isError = areMutationErrors({
                    addPaymentCardsMutation
                  });
                  return (
                    <Modal
                      isOpen={isOpen}
                      handleCloseModal={handleCloseModal}
                      style={walletModalStyle}
                    >
                      <UikWidget className="wallet-modal">
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
                          {t(`${localeNamespaceKeys.wallet.walletAddCard}`)}
                        </UikWidgetHeader>
                        <UikWidgetContent>
                          <FormRow>
                            <StripeComponent ref={stripeRef} t={t}/>
                          </FormRow>
                          <FormRow>
                            <FormField>
                              <UikCheckbox
                                id={addCardFormFields.defaultPaymentMethod}
                                onChange={handleChange}
                                label={t(`${localeNamespaceKeys.wallet.defaultPaymentMethod}`)}
                              />
                            </FormField>
                          </FormRow>
                          <ErrorMessage name={addCardFormFields.errorField}>
                            {msg => <div className="error-message">{msg}</div>}
                          </ErrorMessage>
                        </UikWidgetContent>
                        {isError && (
                          <UikWidgetContent>
                            <GraphQLErrors
                              mutationResult={addPaymentCardsMutation.result}
                            />
                          </UikWidgetContent>
                        )}
                        <UikWidgetContent>
                          <UikFormInputGroup>
                            <UikButton
                              success
                              onClick={submitForm}
                              disabled={buttonDisabled}
                              isLoading={
                                addPaymentCardsMutation.result.loading
                              }
                              className={classNames({
                                "uik-button-disabled": buttonDisabled
                              })}
                            >
                              {t(`${localeNamespaceKeys.wallet.addCard}`)}
                            </UikButton>
                            <UikButton
                              onClick={() => {
                                toggleModalType(MODAL_TYPES.OPEN_WALLET, {
                                  currentDomain,
                                  currentWallet,
                                  type: MODAL_TYPES.WALLET.VIEW_WALLET
                                });
                              }}
                            >
                              {t(`${localeNamespaceKeys.wallet.backToWallet}`)}
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
      }
    </NamespacesConsumer>
  );
};

export default AddCreditCardModal;
