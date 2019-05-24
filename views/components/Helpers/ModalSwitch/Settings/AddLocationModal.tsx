import React from "react";
import { Formik } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import get from "lodash/fp/get";

import Modal from "../../Modal";
import { IMapper, MutationRenderProp } from "../../../../../typeDefinitions";
import AddLocationFields from "../../FormFields/Settings/AddLocationFields";
import {
  CreateShippingLocationComponent,
  CreateShippingLocationMutation,
  CreateShippingLocationVariables,
  UpdateShippingLocationComponent,
  UpdateShippingLocationMutation,
  UpdateShippingLocationVariables
} from "../../../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../../GraphQLErrors";
import { areMutationErrors } from "../../../../../utils/catalog";
import { settingDetailFormFields } from "../../../../../constants/formFields";
import { getLocationInitialValue } from "../../../../../api/setting";
import { locationValidation } from "../../../../../utils/formValidation/settings";
import { UserActionTopBarDropdownContext } from "../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES
} from "../../../../../constants/dropDowns";

const {
  UikWidget,
  UikWidgetHeader,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../../@uik");

export interface DomainProps {
  domainId: string;
  refetch: () => void;
  data: Object;
}
interface Props extends DomainProps {
  isOpen: boolean;
  handleCloseModal: (v?: string) => void;
}

const createLocationMutation = ({ render }: IMapper) => (
  <CreateShippingLocationComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreateShippingLocationComponent>
);
const updateLocationMutation = ({ render }: IMapper) => (
  <UpdateShippingLocationComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateShippingLocationComponent>
);
export interface IMappedCreateLocationFormMutations {
  [key: string]: MutationRenderProp<any, any>;
  createLocationMutation: MutationRenderProp<
    CreateShippingLocationMutation,
    CreateShippingLocationVariables
  >;
  updateLocationMutation: MutationRenderProp<
    UpdateShippingLocationMutation,
    UpdateShippingLocationVariables
  >;
}

const ComposedMutation = adopt({
  createLocationMutation,
  updateLocationMutation
});

const AddLocationModal = ({
  isOpen,
  handleCloseModal,
  domainId,
  refetch,
  data
}: Props) => {
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);
  let modalName = "Add Location";
  if (data) {
    modalName = "Edit Location";
  }
  return (
    <ComposedMutation>
      {({
        createLocationMutation,
        updateLocationMutation
      }: IMappedCreateLocationFormMutations) => (
        <Formik
          onSubmit={(values, formActions) => {
            if (!data) {
              return createLocationMutation
                .mutation({
                  variables: {
                    domainId: domainId,
                    shippingLocations: [
                      {
                        name:
                          values[settingDetailFormFields.location.locationName],
                        address1:
                          values[
                            settingDetailFormFields.location.locationAdress1
                          ],
                        address2:
                          values[
                            settingDetailFormFields.location.locationAdress2
                          ],
                        city:
                          values[settingDetailFormFields.location.locationCity],
                        state:
                          values[
                            settingDetailFormFields.location.locationState
                          ],
                        zipCode:
                          values[
                            settingDetailFormFields.location.locationZipCode
                          ],
                        email:
                          values[
                            settingDetailFormFields.location.locationEmail
                          ],
                        phoneNumber:
                          values[
                            settingDetailFormFields.location.locationPhoneNumber
                          ],
                        country:
                          values[
                            settingDetailFormFields.location.locationCountry
                          ]
                      }
                    ]
                  }
                })
                .then(() => {
                  formActions.setSubmitting(false);
                  showDropDown(DROP_DOWN_TYPES.DROP_DOWN_SUCCESS, {
                    title: DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                  });
                  refetch();
                })
                .catch(() => {
                  formActions.setSubmitting(false);
                  showDropDown(DROP_DOWN_TYPES.DROP_DOWN_ERROR, {
                    title: DROP_DOWN_TITLES.DROP_DOWN_ERROR
                  });
                });
            } else {
              const locationId = get("id")(data);
              return updateLocationMutation
                .mutation({
                  variables: {
                    domainId: domainId,
                    shippingLocations: [
                      {
                        id: locationId,
                        name:
                          values[settingDetailFormFields.location.locationName],
                        address1:
                          values[
                            settingDetailFormFields.location.locationAdress1
                          ],
                        address2:
                          values[
                            settingDetailFormFields.location.locationAdress2
                          ],
                        city:
                          values[settingDetailFormFields.location.locationCity],
                        state:
                          values[
                            settingDetailFormFields.location.locationState
                          ],
                        zipCode:
                          values[
                            settingDetailFormFields.location.locationZipCode
                          ],
                        email:
                          values[
                            settingDetailFormFields.location.locationEmail
                          ],
                        phoneNumber:
                          values[
                            settingDetailFormFields.location.locationPhoneNumber
                          ],
                        country:
                          values[
                            settingDetailFormFields.location.locationCountry
                          ]
                      }
                    ]
                  }
                })
                .then(() => {
                  formActions.setSubmitting(false);
                  showDropDown(DROP_DOWN_TYPES.DROP_DOWN_SUCCESS, {
                    title: DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                  });
                  refetch();
                })
                .catch(() => {
                  formActions.setSubmitting(false);
                  showDropDown(DROP_DOWN_TYPES.DROP_DOWN_ERROR, {
                    title: DROP_DOWN_TITLES.DROP_DOWN_ERROR
                  });
                });
            }
          }}
          validationSchema={locationValidation()}
          initialValues={getLocationInitialValue(data)}
          render={locationFormBag => {
            const buttonDisabled =
              createLocationMutation.result.loading ||
              locationFormBag.isSubmitting;
            const isError = areMutationErrors({
              createLocationMutation
            });

            const domainIdOfCreate = get(
              "result.data.createShippingLocation.domain.id"
            )(createLocationMutation);
            const domainIdOfUpdate = get(
              "result.data.updateShippingLocation.domain.id"
            )(updateLocationMutation);
            if (domainIdOfCreate || domainIdOfUpdate) {
              handleCloseModal();
            }
            return (
              <Modal
                className="location-modal"
                isOpen={isOpen}
                handleCloseModal={handleCloseModal}
              >
                <UikWidget>
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
                    {modalName}
                  </UikWidgetHeader>
                  <UikWidgetContent>
                    <AddLocationFields locationFormBag={locationFormBag} />
                  </UikWidgetContent>
                  {isError && (
                    <UikWidgetContent>
                      <GraphQLErrors
                        mutationResult={createLocationMutation.result}
                      />
                    </UikWidgetContent>
                  )}
                  <UikWidgetContent>
                    <UikFormInputGroup>
                      <UikButton
                        success
                        onClick={locationFormBag.submitForm}
                        disabled={buttonDisabled}
                        isLoading={createLocationMutation.result.loading}
                        className={classNames({
                          "uik-button-disabled": buttonDisabled
                        })}
                      >
                        Save Changes
                      </UikButton>
                    </UikFormInputGroup>
                  </UikWidgetContent>
                </UikWidget>
              </Modal>
            );
          }}
        />
      )}
    </ComposedMutation>
  );
};

export default AddLocationModal;
