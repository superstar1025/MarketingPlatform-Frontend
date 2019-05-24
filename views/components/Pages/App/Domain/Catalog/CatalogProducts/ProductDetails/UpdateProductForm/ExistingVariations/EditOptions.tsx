import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { Formik } from "formik";
import isEmpty from "lodash/fp/isEmpty";
import { adopt } from "react-adopt";

import localeNamespaceKeys from "../../../../../../../../../../constants/localization";
import Modal from "../../../../../../../../Helpers/Modal";
import AttributeManagerModal from "./EditOptionsModal/AttributeManagerModal";
import {
  EditVariationOptionsFormBag,
  EditVariationOptionsFormValues
} from "../../../../../../../../../../typeDefinitions/catalog/forms";
import { updateProductEditVariationOptionsFormFields } from "../../../../../../../../../../constants/formFields";
import { updateProductVariationOptionsValidation } from "../../../../../../../../../../utils/formValidation/updateProduct";
import {
  ProductNode,
  AttributeInputObject,
  UpdateAttributesComponent,
  DeleteAttributeComponent,
  UpdateAttributesMutation,
  UpdateAttributesVariables,
  DeleteAttributeMutation,
  DeleteAttributeVariables
} from "../../../../../../../../../../typeDefinitions/__generated__/components";
import { IMapper } from "../../../../../../../Authentication/Register";
import { MutationRenderProp } from "../../../../../../../../../../typeDefinitions";
import { UserActionTopBarDropdownContext } from "../../../../../../../../Contexts/UserActionTopBarDropdown";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES
} from "../../../../../../../../../../constants/dropDowns";

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  product: ProductNode;
  refetchProduct: () => void;
}

const updateAttributesMutation = ({ render }: IMapper) => (
  <UpdateAttributesComponent>
    {(mutation, result) => render({ mutation, result })}
  </UpdateAttributesComponent>
);

const deleteAttributeMutation = ({ render }: IMapper) => (
  <DeleteAttributeComponent>
    {(mutation, result) => render({ mutation, result })}
  </DeleteAttributeComponent>
);

export type EditOptionsMappedMutations = {
  [key: string]: MutationRenderProp<any, any>;
  updateAttributesMutation: MutationRenderProp<
    UpdateAttributesMutation,
    UpdateAttributesVariables
  >;
  deleteAttributeMutation: MutationRenderProp<
    DeleteAttributeMutation,
    DeleteAttributeVariables
  >;
};

const ComposedMutations = adopt({
  updateAttributesMutation,
  deleteAttributeMutation
});

const EditOptions = ({
  isModalOpen,
  handleCloseModal,
  product,
  refetchProduct
}: Props) => {
  const productId = product.id;
  const domainId = product.domain.id;

  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);

  return (
    <NamespacesConsumer
      ns={[
        localeNamespaceKeys.catalog._name,
        localeNamespaceKeys.formValidation._name
      ]}
    >
      {(t, { ready }) => {
        return (
          ready && (
            <ComposedMutations>
              {({
                updateAttributesMutation,
                deleteAttributeMutation
              }: EditOptionsMappedMutations) => (
                <Modal
                  isOpen={isModalOpen}
                  handleCloseModal={handleCloseModal}
                  className="edit-options-modal"
                >
                  <Formik
                    onSubmit={async (
                      values: EditVariationOptionsFormValues,
                      formActions
                    ) => {
                      const renames =
                        values.renames &&
                        values.renames.filter(rename => {
                          return (
                            rename.newName && rename.newName !== rename.oldName
                          );
                        });
                      const additions =
                        values.additions &&
                        values.additions.filter(addition => {
                          return (
                            addition.attributeKey && addition.attributeValue
                          );
                        });

                      let updateAttributesCall = Promise.resolve();

                      if (!isEmpty(renames) || !isEmpty(additions)) {
                        updateAttributesCall = updateAttributesMutation
                          .mutation({
                            variables: {
                              domainId,
                              productId,
                              renames,
                              additions
                            }
                          })
                          .then(result => result)
                          .catch(error => error);
                      }
                      if (values.removals && !isEmpty(values.removals)) {
                        for (const attributeKey of values.removals) {
                          await deleteAttributeMutation.mutation({
                            variables: {
                              domainId,
                              productId,
                              attributeKey
                            }
                          });
                        }
                      }

                      return updateAttributesCall
                        .then(async result => {
                          await refetchProduct();
                          formActions.setSubmitting(false);
                          showDropDown(DROP_DOWN_TYPES.DROP_DOWN_SUCCESS, {
                            title: DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                          });
                          handleCloseModal();
                          return result;
                        })
                        .catch(error => {
                          formActions.setSubmitting(false);
                          return error;
                        });
                    }}
                    validate={updateProductVariationOptionsValidation}
                    initialValues={{
                      [updateProductEditVariationOptionsFormFields.attributes]:
                        product.attributes,
                      [updateProductEditVariationOptionsFormFields.additions]: [],
                      [updateProductEditVariationOptionsFormFields.renames]:
                        product.attributes &&
                        product.attributes.map(
                          (attribute: AttributeInputObject) => ({
                            oldName: attribute.attributeKey,
                            newName: attribute.attributeKey
                          })
                        ),
                      [updateProductEditVariationOptionsFormFields.removals]: []
                    }}
                    render={(
                      editVariationOptionsFormBag: EditVariationOptionsFormBag
                    ) => (
                      <AttributeManagerModal
                        refetchProduct={refetchProduct}
                        product={product}
                        mutations={{
                          updateAttributesMutation,
                          deleteAttributeMutation
                        }}
                        handleCloseModal={handleCloseModal}
                        editVariationOptionsFormBag={
                          editVariationOptionsFormBag
                        }
                      />
                    )}
                  />
                </Modal>
              )}
            </ComposedMutations>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default EditOptions;
