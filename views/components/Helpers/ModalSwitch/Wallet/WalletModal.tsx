import React, { useState } from "react";
import { adopt } from "react-adopt";
import { NamespacesConsumer } from "react-i18next";
import CowLogoWhite from "../../../UI/Icons/CowLogoWhite";
import classNames from "classnames";

import localeNamespaceKeys from "../../../../../constants/localization";
import Modal from "../../Modal";
import { MODAL_TYPES } from "../../../../../constants/modals";
import {
  SetDefaultPaymentCardComponent,
  SetDefaultPaymentCardMutation,
  SetDefaultPaymentCardVariables,
  DeletePaymentCardsComponent,
  DeletePaymentCardsMutation,
  DeletePaymentCardsVariables,
} from "../../../../../typeDefinitions/__generated__/components";
import { IMapper } from "../../../Pages/Authentication/Register";
import { MutationRenderProp } from "../../../../../typeDefinitions";
import { ModalContext } from "../../../Contexts/Modals";
import { getFormattedPrice } from "../../../../../utils/price";
import { WalletModalProps, walletModalStyle } from ".";
import ConfirmModal from "./ConfirmModal";


const {
  UikWidget,
  UikWidgetHeader,
  UikButton,
  UikRadio,
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../../@uik");

const setDefaultPaymentCardMutation = ({ render }: IMapper) => (
  <SetDefaultPaymentCardComponent>
    {(mutation, result) => render({ mutation, result })}
  </SetDefaultPaymentCardComponent>
);

const deletePaymentCardsMutation = ({ render }: IMapper) => (
  <DeletePaymentCardsComponent>
    {(mutation, result) => render({ mutation, result })}
  </DeletePaymentCardsComponent>
);

type SetDefaultPaymentCardAndDeletePaymentCardsMappedMutations = {
  setDefaultPaymentCardMutation: MutationRenderProp<
    SetDefaultPaymentCardMutation,
    SetDefaultPaymentCardVariables
  >;
  deletePaymentCardsMutation: MutationRenderProp<
    DeletePaymentCardsMutation,
    DeletePaymentCardsVariables
  >;
};

const ComposedMutation = adopt({
  setDefaultPaymentCardMutation,
  deletePaymentCardsMutation
});

const WalletModal = ({
  currentDomain,
  currentWallet,
  handleCloseModal,
}: WalletModalProps) => {
  const { toggleModalType } = React.useContext(ModalContext);
  const { id, credits, paymentCardCount, defaultPaymentCard, paymentCards, invoices } = { ...currentWallet, ...currentDomain };
  const [showConfirmModal, setConfirmModalState] = useState(false);
  const [currentCard, setCurrentCard] = useState();
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.wallet._name]}>
      {(t) =>
        <ComposedMutation>
          {({
            setDefaultPaymentCardMutation,
            deletePaymentCardsMutation
          }: SetDefaultPaymentCardAndDeletePaymentCardsMappedMutations) => {
            const isLoading = deletePaymentCardsMutation.result.loading;
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
                      {t(`${localeNamespaceKeys.wallet.walletTitle}`)}
                    </UikWidgetHeader>
                    <UikWidgetContent>
                      <div className={classNames({ "elliot-wallet-card": true, "invalid": credits === 0 })}>
                        <div className="logo">
                          <CowLogoWhite />
                        </div>
                        <div className="current-balance">
                          <span className="credit-count">{getFormattedPrice(currentDomain.credits)}</span>
                          <span className="credit-subtext">{t(`${localeNamespaceKeys.wallet.currentBalance}`)}</span>
                        </div>
                      </div>
                      {
                        (paymentCardCount > 0 && credits > 0) ? (
                          <div className="wallet-payment-methods">
                            <div className="content-header">
                              <span>{t(`${localeNamespaceKeys.wallet.paymentMethods}`)}</span>
                            </div>
                            {paymentCards.map((card, index) => (
                              <div key={index} className="card-item">
                                <div className="left-area">
                                  <UikRadio
                                    defaultChecked={card.id === defaultPaymentCard.id}
                                    label={t(`${localeNamespaceKeys.wallet.creditCardShortName}`, {
                                      brand: card.brand !== null && card.brand !== undefined ?
                                        card.brand.toUpperCase() : card.brand, last4: card.last4
                                    })}
                                    onClick={() => {
                                      if (card.id) {
                                        setDefaultPaymentCardMutation
                                          .mutation({
                                            variables: {
                                              domainId: id,
                                              cardId: card.id
                                            }
                                          })
                                          .then((res) => {
                                            console.log(res);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                          })
                                      }
                                    }}
                                    name="paymentMethods"
                                  />
                                </div>
                                <div className="right-area">
                                  <UikButton
                                    clear
                                    icon={(<i className="icofont-bin"></i>)}
                                    onClick={() => {
                                      setCurrentCard(card);
                                      setConfirmModalState(true);
                                    }}
                                    iconOnly
                                  />
                                </div>
                              </div>
                            ))}
                            <UikButton
                              clear
                              onClick={() => {
                                toggleModalType(MODAL_TYPES.OPEN_WALLET, {
                                  currentDomain,
                                  currentWallet,
                                  type: MODAL_TYPES.WALLET.ADD_CARD
                                });
                              }}
                              Component="a"
                              className="link-button"
                            >
                              {t(`${localeNamespaceKeys.wallet.addAnotherCreditCard}`)}
                            </UikButton>
                          </div>
                        ) : (
                          <div className="error-section">
                            {
                              paymentCardCount === 0 && (
                                <div className="message">
                                  <span>{t(`${localeNamespaceKeys.wallet.noCreditCard}`)}</span>
                                </div>
                              )
                            }
                            {
                              credits ? (
                                <div className="description">
                                  <span>{t(`${localeNamespaceKeys.wallet.noCreditCardMessage}`)}</span>
                                </div>
                              ) : (
                                <div className="description">
                                  <p className="strong">{t(`${localeNamespaceKeys.wallet.invalidCreditCardMessage_1}`)}</p>
                                  <span>{t(`${localeNamespaceKeys.wallet.invalidCreditCardMessage_2}`)}</span>
                                </div>
                              )
                            }
                          </div>
                        )
                      }
                    </UikWidgetContent>
                    {(credits > 0 && paymentCardCount > 0) && (
                      <UikWidgetContent>
                        <UikFormInputGroup direction="horizontal">
                          <UikButton
                            primary
                            onClick={() => {
                              toggleModalType(MODAL_TYPES.OPEN_WALLET, {
                                currentDomain,
                                currentWallet,
                                type: MODAL_TYPES.WALLET.VIEW_ADD_ONS
                              });
                            }}
                          >
                            {t(`${localeNamespaceKeys.wallet.viewAddons}`)}
                          </UikButton>
                          {invoices.length > 0 && <UikButton
                            onClick={() => {
                              toggleModalType(MODAL_TYPES.OPEN_WALLET, {
                                currentDomain,
                                currentWallet,
                                type: MODAL_TYPES.WALLET.VIEW_INVOICES
                              });
                            }}
                          >
                            {t(`${localeNamespaceKeys.wallet.viewInvoices}`)}
                          </UikButton>}
                        </UikFormInputGroup>
                      </UikWidgetContent>
                    )}
                    <UikWidgetContent>
                      <UikFormInputGroup>
                        {paymentCardCount > 0 ? (
                          <UikButton
                            success
                            onClick={() => {
                              toggleModalType(MODAL_TYPES.OPEN_WALLET, {
                                currentDomain,
                                currentWallet,
                                type: MODAL_TYPES.WALLET.ADD_CREDIT
                              });
                            }}
                          >
                            {t(`${localeNamespaceKeys.wallet.addCreditsToWallet}`)}
                          </UikButton>
                        ) : (
                          <UikButton
                            success
                            onClick={() => {
                              toggleModalType(MODAL_TYPES.OPEN_WALLET, {
                                currentDomain,
                                currentWallet,
                                type: MODAL_TYPES.WALLET.ADD_CARD
                              });
                            }}
                          >
                            {t(`${localeNamespaceKeys.wallet.addCreditCard}`)}
                          </UikButton>
                        )}
                      </UikFormInputGroup>
                    </UikWidgetContent>
                  </UikWidget>
                </Modal>
                {showConfirmModal && <ConfirmModal
                  isOpen={showConfirmModal}
                  isLoading={isLoading}
                  title={t(`${localeNamespaceKeys.wallet.deleteCardConfirmModalTitle}`)}
                  description={t(`${localeNamespaceKeys.wallet.deleteCardConfirmModaltext}`, { last4: currentCard.last4 })}
                  handleConfirm={() => {
                    deletePaymentCardsMutation
                      .mutation({
                        variables: {
                          domainId: id,
                          cardIds: [currentCard.id]
                        }
                      })
                      .then((res) => {
                        setConfirmModalState(false);
                        console.log(res)
                      })
                      .catch((err) => {
                        setConfirmModalState(false);
                        console.log(err)
                      })
                  }}
                  handleCancel={() => {
                    setConfirmModalState(false);
                  }}
                  handleCloseModal={handleCloseModal}
                />}
              </div>
            )
          }}
        </ComposedMutation>
      }
    </NamespacesConsumer>
  );
};

export default WalletModal;
