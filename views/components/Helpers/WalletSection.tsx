import * as React from "react";
import classnames from "classnames";
import flow from "lodash/fp/flow";
import { NamespacesConsumer } from "react-i18next";
import localeNamespaceKeys from "../../../constants/localization";
import { MODAL_TYPES } from "../../../constants/modals";
import { ModalContext } from "../Contexts/Modals";
import { WalletContext } from "../Contexts/Wallet";

import { extractApolloData, extractDomains } from "../../../utils";
import { getFormattedPrice } from "../../../utils/price";

interface WalletSectionProps {
  currentDomain: {
    id: string;
    credits: number;
    paymentCardCount: number;
  };
};

const WalletSection = ({ currentDomain }: WalletSectionProps) => {
  const noCredits = !currentDomain.credits;
  const { toggleModalType } = React.useContext(ModalContext);
  const walletResult = React.useContext(WalletContext);
  const wallet = flow(
    () => extractApolloData(walletResult, "domains"),
    extractDomains
  )();
  const currentWallet = wallet.find(domain => domain.id === currentDomain.id);

  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.navigation._name]}>
      {(t) =>
        <div
          className={classnames({ "account-credits": true, "no-credits": noCredits })}
          onClick={() => {
            toggleModalType(MODAL_TYPES.OPEN_WALLET, {
              currentDomain,
              currentWallet
            });
          }}
        >
          <div className="account-credits-left">
            <p className="credit-count">
              {getFormattedPrice(currentDomain.credits)}
            </p>
            <p className="subtext">
              {t(`${
                noCredits
                  ? localeNamespaceKeys.navigation.updateWalletSettings
                  : localeNamespaceKeys.navigation.availableCredits
                }`)}
            </p>
          </div>
          <div className="account-credits-right">
            <i className="icofont-wallet" />
          </div>
        </div>
      }
    </NamespacesConsumer>
  );
};

export default WalletSection;
