import React from "react";
import { QueryResult } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Formik, Form } from "formik";
import { adopt } from "react-adopt";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";

import BrandingForm from "./Forms/BrandingForm";
import BusinessForm from "./Forms/BusinessForm";
import KeyInformationForm from "./Forms/KeyInformationForm";
import LocationForm from "./Forms/LocationForm";
import PayoutsForm from "./Forms/PayoutsForm";
import PromotionForm from "./Forms/PromotionForm";
import ShippingForm from "./Forms/ShippingForm";
import UsersForm from "./Forms/UsersForm";
import Scroll from "react-scroll";

import { IMapper } from "../../../Authentication/Register";
import { submitSettings } from "../../../../../../api/submitSettings";
import { UserActionTopBarDropdownContext } from "../../../../Contexts/UserActionTopBarDropdown";
import { SettingInitialContext } from "../../../../Contexts/SettingInitial";
import { getSettingInitialValue } from "../../../../../../api/setting";
import { settingDetailsValidationSchema } from "../../../../../../utils/formValidation/settings";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../constants/dropDowns";
import {
  UpdateCompanyComponent,
  UploadCompanyAvatarComponent,
  CreateCampaignTrackingPixelComponent,
  UpdateShippingLocationComponent,
  DeleteShippingLocationComponent,
  RemoveUserFromDomainComponent,
  UpdateDomainComponent,
  RemoveFreeShippingThresholdComponent,
  DeletePromotionComponent,
  CompanyNodeQuery,
  CompanyNodeVariables
} from "../../../../../../typeDefinitions/__generated__/components";

import UserActionTopBarDropdownSwitch from "./../../../../Helpers/UserActionTopBarDropdownSwitch";
import { areMutationsLoading } from "./../../../../../../utils/setting";
import { DropDownProps } from "./../../../../Helpers/UserActionTopBarDropdownSwitch/UserActionTopBarDropdownBase";
import Loading from "../../../../Helpers/Loading";
import { CompanyNodeContext } from "../../../../Contexts/CompanyNode";
import { ShippingLocationsContext } from "../../../../Contexts/ShippingLocations";
import { UsersContext } from "../../../../Contexts/Users";
import { extractDataFromResult } from "../../../../../../utils";
import { IMappedSettingFormMutations } from "../../../../../../utils/setting";

const keyInformationPixelMutation = ({ render }: IMapper) => (
  <CreateCampaignTrackingPixelComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateCampaignTrackingPixelComponent>
);

const brandingMutation = ({ render }: IMapper) => (
  <UploadCompanyAvatarComponent>
    {(mutation, result) => render({ mutation, result })}
  </UploadCompanyAvatarComponent>
);
const updateShippingLocationMutation = ({ render }: IMapper) => (
  <UpdateShippingLocationComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateShippingLocationComponent>
);
const deleteShippingLocationMutation = ({ render }: IMapper) => (
  <DeleteShippingLocationComponent>
    {(mutation, result) => render({ mutation, result })}
  </DeleteShippingLocationComponent>
);
const deleteUserMutation = ({ render }: IMapper) => (
  <RemoveUserFromDomainComponent>
    {(mutation, result) => render({ mutation, result })}
  </RemoveUserFromDomainComponent>
);
const businessDetailsMutation = ({ render }: IMapper) => (
  <UpdateCompanyComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateCompanyComponent>
);
const updateDomainMutation = ({ render }: IMapper) => (
  <UpdateDomainComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateDomainComponent>
);
const removeFreeShippingMutation = ({ render }: IMapper) => (
  <RemoveFreeShippingThresholdComponent>
    {(mutation, result) => render({ mutation, result })}
  </RemoveFreeShippingThresholdComponent>
);
const deletePromotionMutation = ({ render }: IMapper) => (
  <DeletePromotionComponent>
    {(mutation, result) => render({ mutation, result })}
  </DeletePromotionComponent>
);

const ComposedMutation = adopt({
  brandingMutation,
  businessDetailsMutation,
  keyInformationPixelMutation,
  updateShippingLocationMutation,
  deleteShippingLocationMutation,
  deleteUserMutation,
  updateDomainMutation,
  removeFreeShippingMutation,
  deletePromotionMutation
});
const Element = Scroll.Element;

interface Props extends RouteComponentProps<{ domainId: string }> {
  active: string;
}
let initialized = false,
  firstInitialValues: Object;

const Setting = ({ match, active }: Props) => {
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);

  const { domainId } = match.params;

  const getCompanyNode = (
    queryCompanyResult:
      | QueryResult<CompanyNodeQuery, CompanyNodeVariables>
      | undefined
  ) => {
    return flow(
      extractDataFromResult,
      get("domains.edges.0.node")
    )((queryCompanyResult as unknown) as QueryResult);
  };

  return (
    <div className="setting-panel">
      <ComposedMutation>
        {({
          brandingMutation,
          businessDetailsMutation,
          keyInformationPixelMutation,
          updateShippingLocationMutation,
          deleteShippingLocationMutation,
          deleteUserMutation,
          updateDomainMutation,
          removeFreeShippingMutation,
          deletePromotionMutation
        }: IMappedSettingFormMutations) => {
          return (
            <CompanyNodeContext.Consumer>
              {companyNodeQueryresult => {
                const companyNode = getCompanyNode(companyNodeQueryresult);
                if (companyNode && !initialized) {
                  firstInitialValues = companyNode;
                  initialized = true;
                }
                const refetchCompany = get("refetch")(companyNodeQueryresult);
                const companyLoading = get("loading")(companyNodeQueryresult);
                const companyAddressId = get("company.address.id")(companyNode);
                let allMuations = {
                  brandingMutation,
                  businessDetailsMutation,
                  keyInformationPixelMutation,
                  updateShippingLocationMutation,
                  deleteShippingLocationMutation,
                  deleteUserMutation,
                  updateDomainMutation,
                  removeFreeShippingMutation,
                  deletePromotionMutation
                };
                return (
                  <SettingInitialContext.Consumer>
                    {({ avatar, setAvatar }) => {
                      return (
                        <ShippingLocationsContext.Consumer>
                          {locationQueryResult => {
                            const refetchLocation = get("refetch")(
                              locationQueryResult
                            );
                            return (
                              <UsersContext.Consumer>
                                {usersQueryResult => {
                                  const refetchUsers = get("refetch")(
                                    usersQueryResult
                                  );
                                  if (companyLoading) {
                                    return (
                                      <Loading className="setting-loading" />
                                    );
                                  }
                                  return (
                                    <Formik
                                      onSubmit={async (values, formActions) => {
                                        try {
                                          await submitSettings(
                                            setAvatar,
                                            companyAddressId,
                                            domainId,
                                            values,
                                            allMuations
                                          );
                                          refetchCompany();
                                          refetchLocation();
                                          refetchUsers();
                                          formActions.setSubmitting(false);
                                          showDropDown(
                                            DROP_DOWN_TYPES.DROP_DOWN_SUCCESS,
                                            {
                                              title:
                                                DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                                            }
                                          );
                                          initialized = false;
                                        } catch (error) {
                                          formActions.setSubmitting(false);
                                          showDropDown(
                                            DROP_DOWN_TYPES.DROP_DOWN_ERROR,
                                            {
                                              title:
                                                DROP_DOWN_TITLES.DROP_DOWN_ERROR,
                                              buttonProps: {
                                                type: "submit"
                                              },
                                              buttonText:
                                                DROP_DOWN_BUTTON_TEXT.DROP_DOWN_ERROR
                                            }
                                          );
                                        }
                                      }}
                                      // enableReinitialize
                                      isInitialValid
                                      validationSchema={settingDetailsValidationSchema()}
                                      initialValues={getSettingInitialValue(
                                        firstInitialValues,
                                        avatar
                                      )}
                                      render={FormBag => {
                                        return (
                                          <Form>
                                            <UserActionTopBarDropdownContext.Consumer>
                                              {({
                                                dropDownType,
                                                dropDownProps,
                                                close
                                              }) => (
                                                <UserActionTopBarDropdownSwitch
                                                  type={dropDownType}
                                                  close={close}
                                                  props={
                                                    {
                                                      ...dropDownProps,
                                                      isLoading: areMutationsLoading(
                                                        {
                                                          brandingMutation,
                                                          businessDetailsMutation,
                                                          keyInformationPixelMutation,
                                                          updateShippingLocationMutation,
                                                          deleteShippingLocationMutation
                                                        }
                                                      )
                                                    } as DropDownProps
                                                  }
                                                />
                                              )}
                                            </UserActionTopBarDropdownContext.Consumer>
                                            <Element name="branding">
                                              <BrandingForm
                                                mutations={allMuations}
                                                brandingFormBag={FormBag}
                                              />
                                            </Element>
                                            <Element name="businessDetails">
                                              <BusinessForm
                                                mutations={allMuations}
                                                businessDetailFormBag={FormBag}
                                              />
                                            </Element>
                                            <Element name="keyInformation">
                                              <KeyInformationForm
                                                mutations={allMuations}
                                                keyInformationFormBag={FormBag}
                                              />
                                            </Element>
                                            <Element name="locations">
                                              <LocationForm
                                                mutations={allMuations}
                                                domainId={domainId}
                                                shippingLocationsQueryResult={
                                                  locationQueryResult
                                                }
                                                locationFormBag={FormBag}
                                              />
                                            </Element>
                                            <Element name="payouts">
                                              <PayoutsForm
                                                mutations={allMuations}
                                                payOutsFormBag={FormBag}
                                              />
                                            </Element>
                                            <Element name="promotions">
                                              <PromotionForm
                                                mutations={allMuations}
                                                promoCodeFormBag={FormBag}
                                                domainId={domainId}
                                                companyNodeQueryresult={
                                                  companyNodeQueryresult
                                                }
                                              />
                                            </Element>
                                            <Element name="shipping">
                                              <ShippingForm
                                                mutations={allMuations}
                                                shippingFormBag={FormBag}
                                              />
                                            </Element>
                                            <Element name="users">
                                              <UsersForm
                                                mutations={allMuations}
                                                domainId={domainId}
                                                usersQueryResult={
                                                  usersQueryResult
                                                }
                                                usersFormBag={FormBag}
                                              />
                                            </Element>
                                          </Form>
                                        );
                                      }}
                                    />
                                  );
                                }}
                              </UsersContext.Consumer>
                            );
                          }}
                        </ShippingLocationsContext.Consumer>
                      );
                    }}
                  </SettingInitialContext.Consumer>
                );
              }}
            </CompanyNodeContext.Consumer>
          );
        }}
      </ComposedMutation>
    </div>
  );
};

export default withRouter(Setting);
