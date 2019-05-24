import React from "react";
import classnames from "classnames";
import { FormikProps } from "formik";
import { QueryResult } from "react-apollo";
import { flow, get, isEmpty } from "lodash/fp";
import { NamespacesConsumer } from "react-i18next";

import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";
import { ModalContext } from "../../../../../Contexts/Modals";
import { extractDataFromResult } from "../../../../../../../utils";
import { MODAL_TYPES } from "../../../../../../../constants/modals";
import { areMutationsLoading } from "../../../../../../../utils/setting";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import {
  UsersQuery,
  UsersVariables
} from "../../../../../../../typeDefinitions/__generated__/components";

const {
  UikWidget,
  UikWidgetHeader,
  UikButton
} = require("../../../../../../../@uik");

interface IProps {
  domainId: string;
  usersQueryResult: QueryResult<UsersQuery, UsersVariables> | undefined;
  mutations: IMappedSettingFormMutations;
  usersFormBag: FormikProps<SettingFormValues>;
}
export interface SelectOption {
  label: string;
  value: string;
}
const getData = (
  usersQueryResult: QueryResult<UsersQuery, UsersVariables> | undefined
) => {
  return flow(
    extractDataFromResult,
    get("domains.edges.0.node.users.edges")
  )((usersQueryResult as unknown) as QueryResult);
};

const deletingItems: Array<string> = [];

const UsersForm = ({
  domainId,
  usersQueryResult,
  mutations,
  usersFormBag
}: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );

  const { toggleModalType } = React.useContext(ModalContext);

  const refetch = get("refetch")(usersQueryResult);

  let UsersNode = getData(usersQueryResult);

  const confirmDeletion = (userId: string, index: number) => {
    if (!deletingItems.includes(userId)) {
      deletingItems.push(userId);
      UsersNode.splice(index, 1);
    }
    usersFormBag.setFieldValue(
      settingDetailFormFields.user.deleteUsers,
      deletingItems
    );
  };

  if (!UsersNode || UsersNode.length === 0) UsersNode = [];

  React.useEffect(() => {
    if (usersFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!usersFormBag.dirty && isEmpty(usersFormBag.touched)) {
      close();
    }
  }, [usersFormBag.dirty, usersFormBag.values]);

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
                <UikWidgetHeader
                  className="section-header"
                  rightEl={
                    <UikButton
                      onClick={() => {
                        toggleModalType(MODAL_TYPES.SETTINGS.ADD_USER, {
                          domainId: domainId,
                          refetch: refetch
                        });
                      }}
                      primary
                    >
                      Add User
                    </UikButton>
                  }
                >
                  <span className="title">Users</span>
                  <br />
                  <span className="description">
                    Invite your team members to join your admin panel.
                  </span>
                </UikWidgetHeader>
                {UsersNode.map((userInfo: Object, index: number) => {
                  const user = get("node")(userInfo);
                  const userId = get("id")(user);
                  return (
                    <UikWidgetHeader
                      key={index}
                      className="section-header"
                      rightEl={
                        <div className="setting-remove-buttons">
                          <UikButton
                            className="setting-btn"
                            icon={<i className="icofont-settings" />}
                            iconOnly
                            onClick={() => {
                              toggleModalType(MODAL_TYPES.SETTINGS.ADD_USER, {
                                domainId: domainId,
                                refetch: refetch,
                                data: user
                              });
                            }}
                          />
                          <UikButton
                            className="remove-btn"
                            icon={<i className="icofont-ui-delete" />}
                            iconOnly
                            onClick={() => {
                              confirmDeletion(userId, index);
                            }}
                          />
                        </div>
                      }
                      noDivider
                    >
                      <span className="users-name">
                        {get("firstName")(user)} {get("lastName")(user)}
                      </span>
                      <span
                        className={classnames({
                          "users-role": true,
                          "hide-item": get("isSuperuser")(user) === false
                        })}
                      >
                        - Account Owner
                      </span>
                      <br />
                      <span className="description">{get("email")(user)}</span>
                    </UikWidgetHeader>
                  );
                })}
              </UikWidget>
            </div>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default UsersForm;
