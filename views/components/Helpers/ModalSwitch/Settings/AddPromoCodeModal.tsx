import React from "react";
import { Formik } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import get from "lodash/fp/get";

import Modal from "../../Modal";
import { IMapper, MutationRenderProp } from "../../../../../typeDefinitions";
import AddPromoCodeFields from "../../FormFields/Settings/AddPromoCodeFields";
import {
  CreatePromotionComponent,
  CreatePromotionMutation,
  CreatePromotionVariables
} from "../../../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../../GraphQLErrors";
import { areMutationErrors } from "../../../../../utils/catalog";
import { settingDetailFormFields } from "../../../../../constants/formFields";
import { promoValidation } from "../../../../../utils/formValidation/settings";
import { UserActionTopBarDropdownContext } from "../../../Contexts/UserActionTopBarDropdown";
import { getPromoFormInitialValue } from "../../../../../api/setting";
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

const addPromotionMutation = ({ render }: IMapper) => (
  <CreatePromotionComponent>
    {(mutation, result) => render({ mutation, result })}
  </CreatePromotionComponent>
);
export interface IMappedPromotionFormMutations {
  [key: string]: MutationRenderProp<any, any>;
  addPromotionMutation: MutationRenderProp<
    CreatePromotionMutation,
    CreatePromotionVariables
  >;
}

const ComposedMutation = adopt({
  addPromotionMutation
});

const AddPromoCodeModal = ({
  isOpen,
  handleCloseModal,
  domainId,
  data,
  refetch
}: Props) => {
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);
  let modalName = "Add Promo Code";
  if (data) {
    modalName = "Edit Promo Code";
  }
  return (
    <ComposedMutation>
      {({ addPromotionMutation }: IMappedPromotionFormMutations) => (
        <Formik
          onSubmit={(values, formActions) => {
            return addPromotionMutation
              .mutation({
                variables: {
                  domainId: domainId,
                  promotions: [
                    {
                      label: get([settingDetailFormFields.promotion.promoCode])(values),
                      startDatetime: get([settingDetailFormFields.promotion.firstDateTime])(values),
                      endDatetime: get([settingDetailFormFields.promotion.lastDateTime])(values),
                      discountValue: get([settingDetailFormFields.promotion.discount])(values),
                      discountType: get(`${[settingDetailFormFields.promotion.unitOfDiscount]}.0.value`)(values)
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
          }}
          validationSchema={promoValidation()}
          initialValues={getPromoFormInitialValue(data)}
          render={promoCodeFormBag => {
            const buttonDisabled =
              addPromotionMutation.result.loading ||
              promoCodeFormBag.isSubmitting;
            const isError = areMutationErrors({
              addPromotionMutation
            });
            const idOfCreate = get("result.data.createPromotion.promotions.0.id")(
              addPromotionMutation
            );
            if (idOfCreate) {
              handleCloseModal();
            }
            return (
              <Modal
                className="promo_code_modal"
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

                  <AddPromoCodeFields promoCodeFormBag={promoCodeFormBag} />

                  {isError && (
                    <UikWidgetContent>
                      <GraphQLErrors
                        mutationResult={addPromotionMutation.result}
                      />
                    </UikWidgetContent>
                  )}
                  <UikWidgetContent>
                    <UikFormInputGroup>
                      <UikButton
                        success
                        onClick={promoCodeFormBag.submitForm}
                        disabled={buttonDisabled}
                        isLoading={addPromotionMutation.result.loading}
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

export default AddPromoCodeModal;
