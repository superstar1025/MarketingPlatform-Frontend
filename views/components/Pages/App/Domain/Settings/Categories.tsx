import React from "react";
import classnames from "classnames";
import Scroll from "react-scroll";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../../constants/localization";

const {
  UikNavSection,
  UikNavSectionTitle,
  UikWidget
} = require("../../../../../../@uik");

interface IProps {
  clickCategory: (param: string) => void;
  isActivated: string;
}
const Link = Scroll.Link;
const containerId = "containerElement";
const duration = 600;

const Categories = ({ clickCategory, isActivated }: IProps) => {
  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.setting._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) => {
        return (ready && (
          <UikWidget className="setting-widget">
            <UikNavSection className="setting-widget-section">
              <UikNavSectionTitle className="item-header">
                {t(`${localeNamespaceKeys.setting.general}`)}
              </UikNavSectionTitle>
              <Link
                to="branding"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("branding")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "branding" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.branding._name}`)}
              </Link>
              <Link
                to="businessDetails"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("business details")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "business details" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.businessDetails._name}`)}
              </Link>
              <Link
                to="keyInformation"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("key information")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "key information" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.keyInformation._name}`)}
              </Link>
              <Link
                to="locations"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("Locations")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "Locations" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.location._name}`)}
              </Link>
              <Link
                to="payouts"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("Payouts")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "Payouts" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.payouts._name}`)}
              </Link>
              <Link
                to="promotions"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("Promotions")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "Promotions" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.promotion._name}`)}
              </Link>
              <Link
                to="shipping"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("Shipping")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "Shipping" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.shipping._name}`)}
              </Link>
              <Link
                to="users"
                spy={true}
                smooth={true}
                duration={duration}
                containerId={containerId}
                onClick={() => clickCategory("Users")}
                className={classnames({
                  "widget-item": true,
                  activated: isActivated === "Users" ? true : false
                })}
              >
                {t(`${localeNamespaceKeys.setting.user._name}`)}
              </Link>
            </UikNavSection>
          </UikWidget>
        ));
      }}
    </NamespacesConsumer>
  );
};

export default Categories;
