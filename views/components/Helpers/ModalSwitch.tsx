import React from "react";
import { MODAL_TYPES } from "../../../constants/modals";
import CreateStoreModal from "./ModalSwitch/CreateStoreModal";
import AddLocationModal from "./ModalSwitch/Settings/AddLocationModal";
import AddUserModal from "./ModalSwitch/Settings/AddUserModal";
import AddPromoCodeModal from "./ModalSwitch/Settings/AddPromoCodeModal";
import CountrySelectProvider from "../../../views/components/Contexts/CountrySelect";
import DeleteAttributeValueModal, {
  DeleteAttributeValueModalPassedProps
} from "./ModalSwitch/DeleteAttributeValueModal";
import {DomainProps} from "./ModalSwitch/Settings/AddLocationModal";
import WalletProvider from "../Contexts/Wallet";
import Wallet, {
  WalletModalProps
} from "./ModalSwitch/Wallet";

type Props = {
  modalType: string;
  modalProps?: { [key: string]: any };
  toggleModalType: (v?: string, p?: { [key: string]: any }) => void;
};

const ModalSwitch = ({ modalType, modalProps, toggleModalType }: Props) => {
  switch (modalType) {
    case MODAL_TYPES.CREATE_STORE:
      return (
        <CreateStoreModal
          isOpen
          handleCloseModal={toggleModalType}
          {...modalProps as { refetchDomains: () => void }}
        />
      );
    case MODAL_TYPES.DELETE_ATTRIBUTE:
      return (
        <DeleteAttributeValueModal
          isOpen
          handleCloseModal={toggleModalType}
          {...modalProps as DeleteAttributeValueModalPassedProps}
        />
      );
    case MODAL_TYPES.SETTINGS.ADD_LOCATION:
      return (
        <CountrySelectProvider>
          <AddLocationModal
            isOpen
            handleCloseModal={toggleModalType}
            {...modalProps as DomainProps}
          />
        </CountrySelectProvider>
      );
    case MODAL_TYPES.SETTINGS.ADD_USER:
      return (
          <AddUserModal
            isOpen
            handleCloseModal={toggleModalType}
            {...modalProps as DomainProps}
          />
      );
    case MODAL_TYPES.SETTINGS.ADD_PromoCode:
      return (
          <AddPromoCodeModal
            isOpen
            handleCloseModal={toggleModalType}
            {...modalProps as DomainProps}
          />
      );
    case MODAL_TYPES.OPEN_WALLET:
      if (modalProps) {
        const { currentDomain } = modalProps;
        if (currentDomain) {
          return (
            <WalletProvider domainId={currentDomain.id}>
              <Wallet
                isOpen
                type={MODAL_TYPES.WALLET.VIEW_WALLET}
                handleCloseModal={toggleModalType}
                {...modalProps as WalletModalProps}
              />
            </WalletProvider>
          );
        }
      }
    default:
      return null;
  }
};

export default ModalSwitch;
