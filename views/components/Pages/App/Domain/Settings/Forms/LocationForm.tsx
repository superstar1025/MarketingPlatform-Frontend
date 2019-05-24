import React from "react";
import { FormikProps } from "formik";
import { NamespacesConsumer } from "react-i18next";
import classnames from "classnames";
import { flow, get, isEmpty } from "lodash/fp";

const {
  UikWidget,
  UikWidgetContent,
  UikWidgetHeader,
  UikButton,
  UikDivider,
  UikContentTitle
} = require("../../../../../../../@uik");

import localeNamespaceKeys from "../../../../../../../constants/localization";
import { ModalContext } from "../../../../../Contexts/Modals";
import { MODAL_TYPES } from "../../../../../../../constants/modals";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";
import { QueryResult } from "react-apollo";
import {
  ShippingLocationsQuery,
  ShippingLocationsVariables
} from "../../../../../../../typeDefinitions/__generated__/components";
import { extractDataFromResult } from "../../../../../../../utils";
import { areMutationsLoading } from "../../../../../../../utils/setting";
import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";

interface IProps {
  domainId: string;
  shippingLocationsQueryResult:
    | QueryResult<ShippingLocationsQuery, ShippingLocationsVariables>
    | undefined;
  locationFormBag: FormikProps<SettingFormValues>;
  mutations: IMappedSettingFormMutations;
}

const getData = (
  queryCompanyResult:
    | QueryResult<ShippingLocationsQuery, ShippingLocationsVariables>
    | undefined
) => {
  return flow(
    extractDataFromResult,
    get("domains.edges.0.node.shippingLocations.edges")
  )((queryCompanyResult as unknown) as QueryResult);
};
const deletingItems: Array<string> = [];

const LocationForm = ({
  domainId,
  shippingLocationsQueryResult,
  locationFormBag,
  mutations
}: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );

  const { toggleModalType } = React.useContext(ModalContext);

  const refetch = get("refetch")(shippingLocationsQueryResult);

  let shippingLocations = getData(shippingLocationsQueryResult);

  const confirmDeletion = (locationId: string, index: number) => {
    if (!deletingItems.includes(locationId)) {
      deletingItems.push(locationId);
      shippingLocations.splice(index, 1);
    }
    locationFormBag.setFieldValue(
      settingDetailFormFields.location.deleteLocations,
      deletingItems
    );
  };

  React.useEffect(() => {
    if (locationFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!locationFormBag.dirty && isEmpty(locationFormBag.touched)) {
      close();
    }
  }, [locationFormBag.dirty, locationFormBag.values]);

  if (!shippingLocations || shippingLocations.length === 0)
    shippingLocations = [];

  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.setting._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) => {
        return (
          ready && (
            <div>
              <UikWidget
                className={classnames({
                  "setting-section": true
                })}
              >
                <UikWidgetHeader className="section-header">
                  <span className="title">
                    {t(`${localeNamespaceKeys.setting.location._name}`)}
                  </span>
                  <br />
                  <span className="description">
                    {t(`${localeNamespaceKeys.setting.location.description}`)}
                  </span>
                </UikWidgetHeader>
                <UikWidgetHeader className="section-header">
                  <span className="description">
                    {t(
                      `${localeNamespaceKeys.setting.location.subDescription}`
                    )}
                  </span>
                </UikWidgetHeader>
                <UikWidgetContent
                  className={classnames({
                    "section-content": true,
                    "hide-item":
                      !shippingLocations || shippingLocations.length === 0
                  })}
                >
                  <UikContentTitle>
                    {t(`${localeNamespaceKeys.setting.location.subTitle}`)}
                  </UikContentTitle>
                  <UikDivider className="divider" />
                </UikWidgetContent>
                {shippingLocations.map((location: Object, index: number) => {
                  const data = get("node")(location);
                  const locationId = get("id")(data);
                  return (
                    <div key={index}>
                      <UikWidgetHeader
                        className="section-header"
                        rightEl={
                          <div className="setting-remove-buttons">
                            <UikButton
                              className="setting-btn"
                              icon={<i className="icofont-settings" />}
                              iconOnly
                              onClick={() => {
                                toggleModalType(MODAL_TYPES.SETTINGS.ADD_LOCATION, {
                                  domainId: domainId,
                                  refetch: refetch,
                                  data: data
                                });
                              }}
                            />
                            <UikButton
                              className="remove-btn"
                              icon={<i className="icofont-ui-delete" />}
                              iconOnly
                              onClick={() => {
                                confirmDeletion(locationId, index);
                              }}
                            />
                          </div>
                        }
                        noDivider
                      >
                        <span className="location-details">
                          {get("name")(data)}
                        </span>
                      </UikWidgetHeader>
                      <UikWidgetContent className="divider-wrapper">
                        <UikDivider className="divider" />
                      </UikWidgetContent>
                    </div>
                  );
                })}
                <UikWidgetContent className="section-content">
                  <UikButton
                    onClick={() => {
                      toggleModalType(MODAL_TYPES.SETTINGS.ADD_LOCATION, {
                        domainId: domainId,
                        refetch: refetch
                      });
                    }}
                  >
                    Add another location
                  </UikButton>
                </UikWidgetContent>
              </UikWidget>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default LocationForm;
