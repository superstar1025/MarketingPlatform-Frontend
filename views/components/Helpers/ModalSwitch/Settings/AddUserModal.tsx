import React from "react";
import { Formik } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import get from "lodash/fp/get";

import Modal from "../../Modal";
import { IMapper, MutationRenderProp } from "../../../../../typeDefinitions";
import AddUserFields from "../../FormFields/Settings/AddUserFields";
import {
  AddUserComponent,
  AddUserMutation,
  AddUserVariables,
  UpdateUserComponent,
  UpdateUserMutation,
  UpdateUserVariables
} from "../../../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../../GraphQLErrors";
import { areMutationErrors } from "../../../../../utils/catalog";
import { settingDetailFormFields } from "../../../../../constants/formFields";
import { userValidation } from "../../../../../utils/formValidation/settings";
import { UserActionTopBarDropdownContext } from "../../../Contexts/UserActionTopBarDropdown";
import { getUsersFormInitialValue } from "../../../../../api/setting";
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

const addUserMutation = ({ render }: IMapper) => (
  <AddUserComponent>
    {(mutation, result) => render({ mutation, result })}
  </AddUserComponent>
);
const updateUserMutation = ({ render }: IMapper) => (
  <UpdateUserComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateUserComponent>
);
export interface IMappedUsersFormMutations {
  [key: string]: MutationRenderProp<any, any>;
  addUserMutation: MutationRenderProp<AddUserMutation, AddUserVariables>;
  updateUserMutation: MutationRenderProp<
    UpdateUserMutation,
    UpdateUserVariables
  >;
}

const ComposedMutation = adopt({
  addUserMutation,
  updateUserMutation
});

const AddUserModal = ({
  isOpen,
  handleCloseModal,
  domainId,
  data,
  refetch
}: Props) => {
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);
  let modalName = "Add User";
  let modalType = "Add";
  if (data) {
    modalName = "Edit User";
    modalType = "Edit";
  }
  return (
    <ComposedMutation>
      {({ addUserMutation, updateUserMutation }: IMappedUsersFormMutations) => (
        <Formik
          onSubmit={(values, formActions) => {
            if (!data) {
              return addUserMutation
                .mutation({
                  variables: {
                    domainId: domainId,
                    firstName: get([settingDetailFormFields.user.firstName])(
                      values
                    ),
                    lastName: get([settingDetailFormFields.user.lastName])(
                      values
                    ),
                    email: get([settingDetailFormFields.user.email])(values)
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
              const userId = get("id")(data);
              return updateUserMutation
                .mutation({
                  variables: {
                    domainId: domainId,
                    id: userId,
                    firstName: get([settingDetailFormFields.user.firstName])(
                      values
                    ),
                    lastName: get([settingDetailFormFields.user.lastName])(
                      values
                    )
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
          validationSchema={userValidation()}
          initialValues={getUsersFormInitialValue(data)}
          render={userFormBag => {
            const buttonDisabled =
              addUserMutation.result.loading || userFormBag.isSubmitting;
            const isError = areMutationErrors({
              addUserMutation
            });
            const idOfCreate = get("result.data.addUser.user.id")(
              addUserMutation
            );
            const idOfUpdate = get("result.data.updateUser.user.id")(
              updateUserMutation
            );
            if (idOfCreate || idOfUpdate) {
              handleCloseModal();
            }
            return (
              <Modal
                className="add_user_modal"
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

                  <AddUserFields
                    userFormBag={userFormBag}
                    modalType={modalType}
                  />
                  {isError && (
                    <UikWidgetContent>
                      <GraphQLErrors mutationResult={addUserMutation.result} />
                    </UikWidgetContent>
                  )}
                  <UikWidgetContent>
                    <UikFormInputGroup>
                      <UikButton
                        success
                        onClick={userFormBag.submitForm}
                        disabled={buttonDisabled}
                        isLoading={addUserMutation.result.loading}
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

export default AddUserModal;
