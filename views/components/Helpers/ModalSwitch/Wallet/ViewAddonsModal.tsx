import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../constants/localization";
import Modal from "../../Modal";

import { MODAL_TYPES } from "../../../../../constants/modals";
import { ModalContext } from "../../../Contexts/Modals";

const {
  UikWidget,
  UikWidgetHeader,
  UikCheckbox,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup,
} = require("../../../../../@uik");
import { IMapper, MutationRenderProp } from "../../../../../typeDefinitions";

import { getFormattedPrice } from "../../../../../utils/price";
import {
  Maybe,
  CreateAddOnsComponent,
  CreateAddOnsMutation,
  CreateAddOnsVariables,
  DeleteAddOnsComponent,
  DeleteAddOnsMutation,
  DeleteAddOnsVariables,
} from "../../../../../typeDefinitions/__generated__/components";
import {
  walletModalStyle,
  WalletModalProps
} from ".";
import ConfirmModal from "./ConfirmModal";


const createAddOnsMutation = ({ render }: IMapper) => (
  <CreateAddOnsComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateAddOnsComponent>
);

const deleteAddOnsMutation = ({ render }: IMapper) => (
  <DeleteAddOnsComponent>
    {(mutation, result) => render({ mutation, result })}
  </DeleteAddOnsComponent>
);

type CreateAddOnsDeleteAddOnsMappedMutations = {
  createAddOnsMutation: MutationRenderProp<
    CreateAddOnsMutation,
    CreateAddOnsVariables
  >;
  deleteAddOnsMutation: MutationRenderProp<
    DeleteAddOnsMutation,
    DeleteAddOnsVariables
  >;
};

const ComposedMutation = adopt({
  createAddOnsMutation,
  deleteAddOnsMutation
});

const ViewAddonsModal = ({
  currentDomain,
  currentWallet,
  handleCloseModal,
}: WalletModalProps) => {
  const [ showConfirmModal, setConfirmModalState ] = useState(false);
  const [ currentField, setCurrentField ] = useState('');
  const [ removedAddOnSubscriptionIds, setRemovedAddOnSubscriptionIds ] = useState();
  const { toggleModalType } = React.useContext(ModalContext);
  const { id } = currentDomain;
  const { addOnPlans, addOns } = currentWallet;
  const planIds: Array<any> = addOns.map((addOn: { planId: Maybe<string> }) => addOn.planId);
  let firstInitialValues: {[key: string]: boolean} = {};
  addOnPlans.forEach((plan: {
    id: Maybe<string>;
  }) => {
    if (plan.id !== null) {
      firstInitialValues[plan.id] = planIds.includes(plan.id);
    }
  });
  const [initialValues, setInitialValues] = useState(firstInitialValues);
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.wallet._name]}>
      {(t) =>
        <ComposedMutation>
          {({
            createAddOnsMutation,
            deleteAddOnsMutation
          }: CreateAddOnsDeleteAddOnsMappedMutations) => (
            <Formik
              onSubmit={(values, formActions) => {
                let addOnPlanIds: Array<string> = [];
                Object.keys(values).map(key => {
                  if (values[key] && !planIds.includes(key)) {
                    addOnPlanIds.push(key);
                  }
                })
                return createAddOnsMutation
                  .mutation({
                    variables: {
                      domainId: id,
                      addOnPlanIds: addOnPlanIds
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
              enableReinitialize
              render={({ values, submitForm, dirty, setSubmitting, isSubmitting, handleChange, setFieldValue }) => {
                const buttonDisabled = createAddOnsMutation.result.loading || deleteAddOnsMutation.result.loading || !dirty || isSubmitting;
                let amount = 0;
                addOnPlans.forEach((plan) => {
                  if (plan.id !== null && values[plan.id] && plan.amount !== null && !isNaN(plan.amount)) {
                    amount += plan.amount;
                  }
                });
                return (
                  <div>
                    <Modal
                      isOpen={!showConfirmModal}
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
                          {t(`${localeNamespaceKeys.wallet.walletAddons}`)}
                        </UikWidgetHeader>
                        <UikWidgetContent>
                          <div className="content-header">
                            <span>{t(`${localeNamespaceKeys.wallet.enableAddons}`)}</span>
                          </div>
                          {addOnPlans.map((plan, index) => plan.id !== null && (
                            <UikCheckbox
                              checked={values[plan.id]}
                              className="addons-item"
                              onChange={(e: any) => {
                                handleChange(e);
                                let removedAddOnPlanIds: Array<string> = [];
                                let removedAddOnSubscriptionIds: Array<string> = [];
                                if (planIds.includes(plan.id) && plan.id !== null && values[plan.id]) {
                                  removedAddOnPlanIds.push(plan.id);
                                  const addOn = addOns.find(obj => obj.planId === plan.id);
                                  if (addOn && addOn.subscriptionId) {
                                    removedAddOnSubscriptionIds.push(addOn.subscriptionId);
                                  }
                                }
                                if (removedAddOnPlanIds.length) { // TODO: improve this section
                                  setConfirmModalState(true);
                                  if (plan.id !== null) {
                                    setCurrentField(plan.id);
                                  }
                                  setRemovedAddOnSubscriptionIds(removedAddOnSubscriptionIds);
                                }
                              }}
                              key={index}
                              id={plan.id}
                              description={t(`${localeNamespaceKeys.wallet.addonDescription}`, {
                                amount: plan.amount ? getFormattedPrice(plan.amount) : 0
                              })}
                              label={plan.name}
                            />
                          ))}
                        </UikWidgetContent>
                        <UikWidgetContent>
                          <UikFormInputGroup>
                            <UikButton
                              success
                              onClick={submitForm}
                              disabled={buttonDisabled}
                              isLoading={createAddOnsMutation.result.loading}
                              className={classNames({
                                "uik-button-disabled": buttonDisabled
                              })}
                            >
                              {t(`${localeNamespaceKeys.wallet.confirmMonthlyAddons}`, {
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
                      <div id="confirm_modal" />
                    </Modal>
                    {showConfirmModal && <ConfirmModal
                      isOpen={showConfirmModal}
                      isLoading={deleteAddOnsMutation.result.loading}
                      title={t(`${localeNamespaceKeys.wallet.deleteAddOnConfirmModalTitle}`)}
                      description={t(`${localeNamespaceKeys.wallet.deleteAddOnConfirmModalText}`)}
                      handleConfirm={() => {
                        setSubmitting(true);
                        deleteAddOnsMutation
                          .mutation({
                            variables: {
                              domainId: id,
                              subscriptionIds: removedAddOnSubscriptionIds
                            }
                          })
                          .then(() => {
                            const values = initialValues;
                            values[currentField] = false;
                            setInitialValues(values);
                            setSubmitting(false);
                            setConfirmModalState(false);
                          })
                          .catch(() => {
                            setSubmitting(false);
                            setConfirmModalState(false);
                          });
                      }}
                      handleCancel={() => {
                        setConfirmModalState(false);
                        setFieldValue(currentField, true);
                      }}
                      handleCloseModal={handleCloseModal}
                    />}
                  </div>
                );
              }}
            />
          )}
        </ComposedMutation>
      }
    </NamespacesConsumer>
  );
};

export default ViewAddonsModal;
