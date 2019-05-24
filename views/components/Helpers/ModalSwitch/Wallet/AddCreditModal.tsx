import React from "react";
import { Formik, FastField, FieldProps } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import { NamespacesConsumer } from "react-i18next";

import Modal from "../../Modal";
import localeNamespaceKeys from "../../../../../constants/localization";
import { MODAL_TYPES } from "../../../../../constants/modals";
import { amountOptions, creditCards } from "../../../../../constants/wallet";
import { addCreditFormFields } from "../../../../../constants/formFields";
import { areMutationErrors } from "../../../../../utils/catalog";
import {
  AddCreditsComponent,
  AddCreditsMutation,
  AddCreditsVariables
} from "../../../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../../../Helpers/GraphQLErrors";
import { IMapper } from "../../../Pages/Authentication/Register";
import { MutationRenderProp } from "../../../../../@uik../../typeDefinitions";

import { ModalContext } from "../../../Contexts/Modals";

const {
  UikWidget,
  UikWidgetHeader,
  UikSelect,
  UikRadio,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup,
} = require("../../../../../@uik");
import CurrencyField from "../../../Helpers/FormFields/CurrencyField";
import {
  getFormattedPrice,
  getDisplayCardName,
  getDollarsFromCents,
  getCentsFromDollars
} from "../../../../../utils/price";
import {
  walletModalStyle,
  WalletModalProps
} from ".";


export interface SelectOption {
  label: string;
  value: string;
}

const addCreditsMutation = ({ render }: IMapper) => (
  <AddCreditsComponent>
    {(mutation, result) => render({ mutation, result })}
  </AddCreditsComponent>
);

type addCreditsMappedMutations = {
  addCreditsMutation: MutationRenderProp<
    AddCreditsMutation,
    AddCreditsVariables
  >;
};

const ComposedMutation = adopt({
  addCreditsMutation
});

const AddCreditModal = ({
  currentDomain,
  currentWallet,
  isOpen,
  handleCloseModal,
}: WalletModalProps) => {
  const { toggleModalType } = React.useContext(ModalContext);
  const { id } = currentDomain;
  const { paymentCards, defaultPaymentCard } = currentWallet;
  const paymentOptions = paymentCards.map((card) => ({
    label: (
      <span className="payment-card-label">
        {card.brand === creditCards.VISA && <i className="icofont-visa payment-card-icon"></i>}
        {card.brand === creditCards.AMEX && <i className="icofont-american-express payment-card-icon"></i>}
        {card.brand === creditCards.DISCOVER && <i className="icofont-discover payment-card-icon"></i>}
        {card.brand === creditCards.MASTERCARD && <i className="icofont-mastercard payment-card-icon"></i>}
        {getDisplayCardName(card)}
      </span>
    ),
    value: card.id
  }));
  const initialValues: { [key: string]: any } = {
    paymentMethod: [{
      label: (
        <span className="payment-card-label">
          {defaultPaymentCard.brand === creditCards.VISA && <i className="icofont-visa payment-card-icon"></i>}
          {defaultPaymentCard.brand === creditCards.AMEX && <i className="icofont-american-express payment-card-icon"></i>}
          {defaultPaymentCard.brand === creditCards.DISCOVER && <i className="icofont-discover payment-card-icon"></i>}
          {defaultPaymentCard.brand === creditCards.MASTERCARD && <i className="icofont-mastercard payment-card-icon"></i>}
          {getDisplayCardName(defaultPaymentCard)}
        </span>
      ),
      value: defaultPaymentCard.id
    }],
    amountOption: "amount_50",
    anotherAmount: 0,
  };
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.wallet._name]}>
      {(t) =>
        <ComposedMutation>
          {({ addCreditsMutation }: addCreditsMappedMutations) => (
            <Formik
              onSubmit={(values, formActions) => {
                let amount = 0;
                if (values.amountOption === addCreditFormFields.amountOptions.amount_another) {
                  amount = values.anotherAmount;
                } else {
                  amountOptions.some(option => {
                    if (option.id === values.amountOption) {
                      amount = option.value;
                      return true;
                    } else {
                      return false;
                    }
                  });
                }
                return addCreditsMutation
                  .mutation({
                    variables: {
                      domainId: id,
                      credits: amount
                    }
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
              }}
              initialValues={initialValues}
              render={(addCreditFormik) => {
                const { submitForm, isSubmitting } = addCreditFormik;
                const buttonDisabled = addCreditsMutation.result.loading || isSubmitting;
                const isError = areMutationErrors({
                  addCreditsMutation
                });
                let amount = 0;
                const { values, handleChange } = addCreditFormik;
                if (values.amountOption === addCreditFormFields.amountOptions.amount_another) {
                  amount = values.anotherAmount;
                } else {
                  amountOptions.some(option => {
                    if (option.id === values.amountOption) {
                      amount = option.value;
                      return true;
                    } else {
                      return false;
                    }
                  });
                }
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
                        {t(`${localeNamespaceKeys.wallet.walletAddCredits}`)}
                      </UikWidgetHeader>
                      <UikWidgetContent>
                        <UikFormInputGroup>
                          <FastField
                            name={addCreditFormFields.paymentMethod}
                            value={
                              values[addCreditFormFields.paymentMethod]
                            }
                            component={({ field: { value } }: FieldProps) => (
                              <UikSelect
                                options={paymentOptions}
                                value={value}
                                onChange={(newValue: SelectOption) => {
                                  addCreditFormik.setFieldValue(
                                    addCreditFormFields.paymentMethod,
                                    [newValue]
                                  );
                                }}
                              />
                            )}
                          />
                        </UikFormInputGroup>
                        <div className="content-header" style={{ marginTop: '1.5rem' }}>
                          <span>{t(`${localeNamespaceKeys.wallet.specifyCreditAmount}`)}</span>
                        </div>
                        <UikFormInputGroup className="specify-credit-field">
                          {amountOptions.map((amountOption: any, index) => (
                            <UikRadio
                              onChange={handleChange}
                              key={index}
                              defaultChecked={
                                values[addCreditFormFields.amountOption] === amountOption.id
                              }
                              value={amountOption.id}
                              id={amountOption.id}
                              name={addCreditFormFields.amountOption}
                              label={amountOption.label}
                            />
                          ))}
                          {values.amountOption === addCreditFormFields.amountOptions.amount_another && (
                            <CurrencyField
                              onBlur={() => {
                                addCreditFormik.setFieldTouched(
                                  addCreditFormFields.anotherAmount,
                                  true
                                );
                              }}
                              name={addCreditFormFields.anotherAmount}
                              value={
                                getDollarsFromCents(
                                  values.anotherAmount
                                )
                              }
                              formBag={addCreditFormik}
                              onValueChange={val => {
                                const cents = parseInt(
                                  getCentsFromDollars(val.floatValue) || ""
                                );
                                if (isNaN(cents)) {
                                  addCreditFormik.setFieldValue(
                                    addCreditFormFields.anotherAmount,
                                    ""
                                  );
                                } else {
                                  addCreditFormik.setFieldValue(
                                    addCreditFormFields.anotherAmount,
                                    cents
                                  );
                                }
                              }}
                            />
                          )}
                        </UikFormInputGroup>
                      </UikWidgetContent>
                      {isError && (
                        <UikWidgetContent>
                          <GraphQLErrors
                            mutationResult={addCreditsMutation.result}
                          />
                        </UikWidgetContent>
                      )}
                      <UikWidgetContent>
                        <UikFormInputGroup>
                          <UikButton
                            success
                            onClick={submitForm}
                            disabled={buttonDisabled}
                            isLoading={addCreditsMutation.result.loading}
                            className={classNames({
                              "uik-button-disabled": buttonDisabled
                            })}
                          >
                            {t(`${localeNamespaceKeys.wallet.addToWallet}`, {
                              amount: getFormattedPrice(amount)
                            })}
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

export default AddCreditModal;
