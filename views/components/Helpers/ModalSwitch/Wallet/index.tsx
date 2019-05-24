import React from "react";
import flow from "lodash/fp/flow";
import { extractApolloData, extractDomains } from "../../../../../utils";
import {
  WalletDefaultPaymentCard,
  WalletPaymentCards,
  WalletAddOnPlans,
  WalletAddOns,
  WalletInvoices,
} from "../../../../../typeDefinitions/__generated__/components";
import { MODAL_TYPES } from "../../../../../constants/modals";
import { DomainsContext } from "../../../Contexts/Domains";
import { WalletContext } from "../../../Contexts/Wallet";
import { ModalContext } from "../../../Contexts/Modals";
import ModalLoading from "../../../Helpers/ModalLoading";
import WalletModal from "./../../ModalSwitch/Wallet/WalletModal";
import AddCardModal from "./../../ModalSwitch/Wallet/AddCardModal";
import ViewInvoicesModal from "./../../ModalSwitch/Wallet/ViewInvoicesModal";
import ViewAddonsModal from "./../../ModalSwitch/Wallet/ViewAddonsModal";
import AddCreditModal from "./../../ModalSwitch/Wallet/AddCreditModal";


export interface WalletModalProps {
  currentDomain: {
    id: string;
    credits: number;
    paymentCardCount: number;
  };
  currentWallet: {
    defaultPaymentCard: WalletDefaultPaymentCard
    paymentCards: WalletPaymentCards[]
    addOnPlans: WalletAddOnPlans[]
    addOns: WalletAddOns[]
    invoices: WalletInvoices[]
  };
  type: string;
  isOpen: boolean;
  handleCloseModal: (v?: string) => void;
};

export const walletModalStyle = {
  content: {
    zIndex: "500",
    padding: "0",
    width: 350,
    maxHeight: "75%",
    height: "auto",
    position: "static",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0"
  }
}

const Wallet = ({
  currentDomain,
  currentWallet,
  type,
  ...modalProps
}: WalletModalProps) => {
  const { toggleModalType } = React.useContext(ModalContext);
  const { id } = currentDomain;

  const domainsResult = React.useContext(DomainsContext);
  const domains = flow(
    () => extractApolloData(domainsResult, "domains"),
    extractDomains
  )();
  currentDomain = domains.find(domain => domain.id === id);

  const walletResult = React.useContext(WalletContext);
  if (walletResult && walletResult.loading) {
    return <ModalLoading />;
  }
  const wallets = flow(
    () => extractApolloData(walletResult, "domains"),
    extractDomains
  )();
  currentWallet = wallets.find(domain => domain.id === id);

  switch (type) {
    case MODAL_TYPES.WALLET.VIEW_WALLET:
      return (
        <WalletModal
          currentDomain={currentDomain}
          currentWallet={currentWallet}
          isOpen
          handleCloseModal={toggleModalType}
          {...modalProps as WalletModalProps}
        />
      )
    case MODAL_TYPES.WALLET.ADD_CARD:
      return (
        <AddCardModal
          currentDomain={currentDomain}
          currentWallet={currentWallet}
          isOpen
          handleCloseModal={toggleModalType}
          {...modalProps as WalletModalProps}
        />
      )
    case MODAL_TYPES.WALLET.ADD_CREDIT:
      return (
        <AddCreditModal
          currentDomain={currentDomain}
          currentWallet={currentWallet}
          isOpen
          handleCloseModal={toggleModalType}
          {...modalProps as WalletModalProps}
        />
      )
    case MODAL_TYPES.WALLET.VIEW_ADD_ONS:
      return (
        <ViewAddonsModal
          currentDomain={currentDomain}
          currentWallet={currentWallet}
          isOpen
          handleCloseModal={toggleModalType}
          {...modalProps as WalletModalProps}
        />
      )
    case MODAL_TYPES.WALLET.VIEW_INVOICES:
      return (
        <ViewInvoicesModal
          currentDomain={currentDomain}
          currentWallet={currentWallet}
          isOpen
          handleCloseModal={toggleModalType}
          {...modalProps as WalletModalProps}
        />
      )
    default:
      return null;
  }
};

export default Wallet;
