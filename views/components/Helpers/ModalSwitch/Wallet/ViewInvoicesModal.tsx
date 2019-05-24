import React from "react";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../constants/localization";
import Modal from "../../Modal";

import { MODAL_TYPES } from "../../../../../constants/modals";
import { ModalContext } from "../../../Contexts/Modals";

const {
  UikWidget,
  UikWidgetHeader,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup,
} = require("../../../../../@uik");
import { getFormattedDate } from "../../../../../utils/date";
import {
  walletModalStyle,
  WalletModalProps
} from ".";


const ViewInvoicesModal = ({
  currentDomain,
  currentWallet,
  isOpen,
  handleCloseModal,
}: WalletModalProps) => {
  const { toggleModalType } = React.useContext(ModalContext);
  const { invoices } = currentWallet;
  invoices.sort((a, b) => { // Sort Invoices order by endDatetime desc
    const c: any = new Date(a.endDatetime);
    const d: any = new Date(b.endDatetime);
    return d - c;
  })
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.wallet._name]}>
      {(t) => 
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
              {t(`${localeNamespaceKeys.wallet.walletInvoices}`)}
            </UikWidgetHeader>
            {invoices.map((invoice, index) => (
              <UikWidgetContent key={index}>
                <div className="invoice-list">
                  <span className="invoice-date">{getFormattedDate(invoice.startDatetime)}</span>
                  <UikButton
                    clear
                    Component="a"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={invoice.url}
                    className="invoice-link-button"
                  >
                    {t(`${localeNamespaceKeys.wallet.download}`)}
                  </UikButton>
                </div>
              </UikWidgetContent>
            ))}
            <UikWidgetContent>
              <UikFormInputGroup>
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
      }
    </NamespacesConsumer>
  );
};

export default ViewInvoicesModal;
