import React from "react";
import { QueryResult } from "react-apollo";
import { get, isEmpty, flow } from "lodash/fp";
import { FormikProps, FastField, FieldProps } from "formik";
import { NamespacesConsumer } from "react-i18next";
import classnames from "classnames";
import { IMappedSettingFormMutations } from "../../../../../../../utils/setting";
import { ModalContext } from "../../../../../Contexts/Modals";
import { MODAL_TYPES } from "../../../../../../../constants/modals";
import { areMutationsLoading } from "../../../../../../../utils/setting";
import localeNamespaceKeys from "../../../../../../../constants/localization";
import { months } from "../../../../../../../constants/setting";
import { settingDetailFormFields } from "../../../../../../../constants/formFields";
import { extractDataFromResult } from "../../../../../../../utils";
import { SettingFormValues } from "../../../../../../../typeDefinitions/setting/forms";
import { UserActionTopBarDropdownContext } from "../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES,
  DROP_DOWN_BUTTON_TEXT
} from "../../../../../../../constants/dropDowns";
import {
  CompanyNodeQuery,
  CompanyNodeVariables
} from "../../../../../../../typeDefinitions/__generated__/components";

const {
  UikWidget,
  UikWidgetHeader,
  UikToggle,
  UikWidgetTable,
  UikWidgetContent,
  UikButton
} = require("../../../../../../../@uik");

interface IProps {
  domainId: string;
  mutations: IMappedSettingFormMutations;
  promoCodeFormBag: FormikProps<SettingFormValues>;
  companyNodeQueryresult:
    | QueryResult<CompanyNodeQuery, CompanyNodeVariables>
    | undefined;
}
export interface SelectOption {
  label: string;
  value: string;
}
const getPromotionDatas = (
  queryCompanyResult:
    | QueryResult<CompanyNodeQuery, CompanyNodeVariables>
    | undefined
) => {
  return flow(
    extractDataFromResult,
    get("domains.edges.0.node.promotions.edges")
  )((queryCompanyResult as unknown) as QueryResult);
};

const deletingItems: Array<string> = [];
const allPromotionIds: Array<string> = [];

const PromotionForm = ({
  promoCodeFormBag,
  mutations,
  companyNodeQueryresult,
  domainId
}: IProps) => {
  const { showDropDown, close } = React.useContext(
    UserActionTopBarDropdownContext
  );
  const refetch = get("refetch")(companyNodeQueryresult);

  const { toggleModalType } = React.useContext(ModalContext);

  let promotionDatas = getPromotionDatas(companyNodeQueryresult);
  if (!promotionDatas || promotionDatas.length === 0) promotionDatas = [];

  const timeConverter = (UNIX_timestamp: number) => {
    const dateValue = new Date(UNIX_timestamp);
    const year = dateValue.getFullYear();
    const month = months[dateValue.getMonth()];
    const date =
      dateValue.getDate() < 10
        ? "0" + dateValue.getDate()
        : dateValue.getDate();
    const hour =
      dateValue.getHours() < 10
        ? "0" + dateValue.getHours()
        : dateValue.getHours();
    const min =
      dateValue.getMinutes() < 10
        ? "0" + dateValue.getMinutes()
        : dateValue.getMinutes();
    const sec =
      dateValue.getSeconds() < 10
        ? "0" + dateValue.getSeconds()
        : dateValue.getSeconds();
    const time =
      month + " " + date + ", " + year + ", " + hour + ":" + min + ":" + sec;
    return time;
  };

  const confirmDeletion = (promitionId: string, index: number) => {
    if (!deletingItems.includes(promitionId)) {
      deletingItems.push(promitionId);
      promotionDatas.splice(index, 1);
    }
    promoCodeFormBag.setFieldValue(
      settingDetailFormFields.promotion.deletePromotions,
      deletingItems
    );
  };

  const confirmDeleteAll = () => {
    promoCodeFormBag.setFieldValue(
      settingDetailFormFields.promotion.allPromotionIds,
      allPromotionIds
    );
  }

  React.useEffect(() => {
    if (promoCodeFormBag.dirty) {
      showDropDown(DROP_DOWN_TYPES.DROP_DOWN_READY, {
        title: DROP_DOWN_TITLES.DROP_DOWN_READY,
        buttonText: DROP_DOWN_BUTTON_TEXT.DROP_DOWN_READY,
        isLoading: areMutationsLoading(mutations),
        buttonProps: {
          type: "submit"
        }
      });
    }
    if (!promoCodeFormBag.dirty && isEmpty(promoCodeFormBag.touched)) {
      close();
    }
  }, [promoCodeFormBag.dirty, promoCodeFormBag.values]);

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
            <div className="promotion-Form">
              <UikWidget
                className={classnames({
                  "setting-section": true
                })}
              >
                <UikWidgetHeader className="section-header">
                  <span className="title">
                    {t(`${localeNamespaceKeys.setting.promotion._name}`)}
                  </span>
                  <br />
                  <span className="description">
                    {t(`${localeNamespaceKeys.setting.promotion.description}`)}
                  </span>
                </UikWidgetHeader>
                <UikWidgetHeader
                  className="section-header"
                  rightEl={
                    <FastField
                      name={settingDetailFormFields.promotion.activatedPromo}
                      value={
                        promoCodeFormBag.values[
                          settingDetailFormFields.promotion.activatedPromo
                        ]
                      }
                      component={({ field: { value } }: FieldProps) => (
                        <UikToggle
                          checked={value}
                          onChange={() => {
                            if (value)
                              confirmDeleteAll();
                            promoCodeFormBag.setFieldValue(
                              settingDetailFormFields.promotion.activatedPromo,
                              !value
                            );
                          }}
                        />
                      )}
                    />
                  }
                >
                  <span className="sub-title">
                    {t(`${localeNamespaceKeys.setting.promotion.subTitle}`)}
                  </span>
                  <br />
                  <span className="description">
                    {t(
                      `${localeNamespaceKeys.setting.promotion.subDescription}`
                    )}
                  </span>
                </UikWidgetHeader>
                <div
                  className={classnames({
                    "promo-table-section": true,
                    deactive:
                      promoCodeFormBag.values[
                        settingDetailFormFields.promotion.activatedPromo
                      ] === false
                  })}
                >
                  <UikWidgetTable className="promotion-table">
                    <thead>
                      <tr>
                        <th>
                          {t(
                            `${localeNamespaceKeys.setting.promotion.promoCode}`
                          )}
                        </th>
                        <th>
                          {t(
                            `${localeNamespaceKeys.setting.promotion.duration}`
                          )}
                        </th>
                        <th>
                          {t(
                            `${localeNamespaceKeys.setting.promotion.discount}`
                          )}
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {promotionDatas.map((dataObj: Object, index: number) => {
                        const data = get("node")(dataObj);
                        const promotionId = get("id")(data);
                        if (!allPromotionIds.includes(promotionId)) {
                          allPromotionIds.push(promotionId)
                        }
                        const startDateTime = timeConverter(data.startDatetime);
                        const endDatetime = timeConverter(data.endDatetime);
                        const unit = data.discountType === 0 ? "%" : "$";
                        return (
                          <tr key={index}>
                            <td className="promo-title">{data.label}</td>
                            <td>
                              Starts {startDateTime}
                              <br />
                              Ends {endDatetime}
                            </td>
                            <td>
                              {unit}
                              {data.discountValue}
                            </td>
                            <td className="setting-remove-buttons">
                              <UikButton
                                className="remove-btn"
                                icon={<i className="icofont-ui-delete" />}
                                iconOnly
                                onClick={() => {
                                  confirmDeletion(promotionId, index);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </UikWidgetTable>
                </div>
                <UikWidgetContent
                  className={classnames({
                    "section-content": true,
                    deactive:
                      promoCodeFormBag.values[
                        settingDetailFormFields.promotion.activatedPromo
                      ] === false
                  })}
                >
                  <UikButton
                    onClick={() => {
                      toggleModalType(MODAL_TYPES.SETTINGS.ADD_PromoCode, {
                        domainId: domainId,
                        refetch: refetch
                      });
                    }}
                  >
                    {t(`${localeNamespaceKeys.setting.promotion.addButton}`)}
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

export default PromotionForm;
