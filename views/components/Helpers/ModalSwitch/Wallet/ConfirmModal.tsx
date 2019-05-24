import React from "react";
import { NamespacesConsumer } from "react-i18next";
import localeNamespaceKeys from "../../../../../constants/localization";
import Modal from "../../Modal";

const {
  UikWidget,
  UikWidgetHeader,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup,
} = require("../../../../../@uik");

import { walletModalStyle } from ".";


const ConfirmModal = ({
  handleConfirm,
  handleCancel,
  handleCloseModal,
  title,
  isOpen,
  isLoading,
  description
}: any) => {
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.wallet._name]}>
      {(t) =>
        <Modal
          isOpen={isOpen}
          handleCloseModal={handleCloseModal}
          style={walletModalStyle}
        >
          <UikWidget className="wallet-modal">
            <UikWidgetHeader>
              {title}
            </UikWidgetHeader>
            <UikWidgetContent>
              {description}
            </UikWidgetContent>
            <UikWidgetContent>
              <UikFormInputGroup direction="horizontal">
                <UikButton
                  error
                  isLoading={isLoading}
                  onClick={() => {
                    handleConfirm();
                  }}
                >
                  {t(`${localeNamespaceKeys.wallet.confirm}`)}
                </UikButton>
                <UikButton
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  {t(`${localeNamespaceKeys.wallet.cancel}`)}
                </UikButton>
              </UikFormInputGroup>
            </UikWidgetContent>
          </UikWidget>
        </Modal>
      }
    </NamespacesConsumer>
  );
};

export default ConfirmModal;
