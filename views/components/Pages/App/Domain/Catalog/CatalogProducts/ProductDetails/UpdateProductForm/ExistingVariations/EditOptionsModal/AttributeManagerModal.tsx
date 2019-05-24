import React from "react";
import { Field, FieldArray } from "formik";
import isEmpty from "lodash/fp/isEmpty";

const {
  UikFormInputGroup,
  UikButton,
  UikWidgetContent,
  UikWidgetHeader,
  UikWidget
} = require("../../../../../../../../../../../@uik");

import { updateProductEditVariationOptionsFormFields } from "../../../../../../../../../../../constants/formFields";
import {
  getNewDefaultAttribute,
  areMutationErrors,
  areMutationsLoading
} from "../../../../../../../../../../../utils/catalog";
import { EditVariationOptionsFormBag } from "../../../../../../../../../../../typeDefinitions/catalog/forms";
import AttributeValueManager from "./NewAttributeManager/AttributeValueManager";
import {
  ProductNode,
  AttributesInputObject
} from "../../../../../../../../../../../typeDefinitions/__generated__/components";
import { EditOptionsMappedMutations } from "../EditOptions";
import GraphQLErrors from "../../../../../../../../../Helpers/GraphQLErrors";

interface Props {
  editVariationOptionsFormBag: EditVariationOptionsFormBag;
  handleCloseModal: () => void;
  product: ProductNode;
  refetchProduct: () => void;
  mutations: EditOptionsMappedMutations;
}

type State = {
  temporaryAttribute: null | AttributesInputObject;
};

// TODO: localization
class AttributeManagerModal extends React.Component<Props, State> {
  state: State = {
    temporaryAttribute: null
  };
  handleAddAnotheroption = () => {
    const { editVariationOptionsFormBag } = this.props;
    const { attributes, additions } = editVariationOptionsFormBag.values;
    const cannotAddAnotherAttribute =
      (attributes && additions && attributes.length + additions.length >= 3) ||
      (attributes &&
        additions &&
        attributes.length + additions.length >= 2 &&
        this.state.temporaryAttribute);

    if (!cannotAddAnotherAttribute) {
      const allAttributes =
        (additions && attributes && [...attributes, ...additions]) || [];
      const newAttribute = getNewDefaultAttribute(allAttributes);
      this.setState({ temporaryAttribute: newAttribute });
    }
  };

  deleteTemp = () => {
    this.setState({ temporaryAttribute: null });
  };

  render() {
    const {
      editVariationOptionsFormBag,
      handleCloseModal,
      product,
      refetchProduct,
      mutations
    } = this.props;
    const { temporaryAttribute } = this.state;
    const { attributes, additions } = editVariationOptionsFormBag.values;
    const cannotAddAnotherAttribute =
      (attributes && additions && attributes.length + additions.length >= 3) ||
      (attributes &&
        additions &&
        attributes.length + additions.length >= 2 &&
        this.state.temporaryAttribute);
    const temporaryAttributePosition =
      attributes && attributes.length - 1 > 0 ? attributes.length - 1 : 0;
    const buttonDisabled =
      !editVariationOptionsFormBag.dirty ||
      editVariationOptionsFormBag.isSubmitting ||
      !isEmpty(editVariationOptionsFormBag.errors);

    return (
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
          Edit Options
        </UikWidgetHeader>
        <UikWidgetContent>
          <FieldArray
            name={updateProductEditVariationOptionsFormFields.attributes}
            render={attributesHelpers => (
              <FieldArray
                name={updateProductEditVariationOptionsFormFields.renames}
                render={renameHelpers => (
                  <div>
                    {attributes &&
                      [...attributes].map(
                        (
                          attribute: AttributesInputObject,
                          attributeIndex: number
                        ) => {
                          return (
                            <UikFormInputGroup
                              key={attributeIndex}
                              className="attribute-manager-row"
                            >
                              <div className="attribute">
                                <Field
                                  name={`${
                                    updateProductEditVariationOptionsFormFields.renames
                                  }[${attributeIndex}].newName`}
                                  type="text"
                                  className="form-input"
                                />
                              </div>
                              <div className="attribute-values">
                                <AttributeValueManager
                                  handleCloseModal={handleCloseModal}
                                  refetchProduct={refetchProduct}
                                  product={product}
                                  index={attributeIndex}
                                  attribute={attribute}
                                />
                              </div>
                              <div className="delete-attribute">
                                <FieldArray
                                  name={
                                    updateProductEditVariationOptionsFormFields.removals
                                  }
                                  render={removalHelpers => (
                                    <UikButton
                                      style={{
                                        display:
                                          attributes.length <= 1 ||
                                          attribute.attributeValues.length > 1
                                            ? "none"
                                            : "block"
                                      }}
                                      primary
                                      onClick={() => {
                                        renameHelpers.remove(attributeIndex);
                                        attributesHelpers.remove(
                                          attributeIndex
                                        );
                                        removalHelpers.push(
                                          attribute.attributeKey
                                        );
                                      }}
                                    >
                                      <i className="icofont-trash" />
                                    </UikButton>
                                  )}
                                />
                              </div>
                            </UikFormInputGroup>
                          );
                        }
                      )}
                  </div>
                )}
              />
            )}
          />
          <FieldArray
            name={updateProductEditVariationOptionsFormFields.additions}
            render={additionHelpers => (
              <React.Fragment>
                {editVariationOptionsFormBag.values.additions &&
                  [...editVariationOptionsFormBag.values.additions].map(
                    (addition, index) => (
                      <UikFormInputGroup
                        key={index}
                        className="attribute-manager-row"
                      >
                        <div className="attribute">
                          <Field
                            name={`${
                              updateProductEditVariationOptionsFormFields.additions
                            }[${index}].attributeKey`}
                            type="text"
                            className="form-input"
                            value={
                              editVariationOptionsFormBag.values.additions &&
                              editVariationOptionsFormBag.values.additions[
                                index
                              ].attributeKey
                            }
                          />
                        </div>
                        <div className="attribute-values">
                          <span className="tag-wrapper">
                            <span>{addition.attributeValue}</span>{" "}
                          </span>
                        </div>
                        <div className="delete-attribute">
                          <UikButton
                            primary
                            onClick={() => {
                              additionHelpers.remove(index);
                            }}
                          >
                            <i className="icofont-trash" />
                          </UikButton>
                        </div>
                      </UikFormInputGroup>
                    )
                  )}
                {temporaryAttribute && (
                  <UikFormInputGroup className="attribute-manager-row">
                    <div className="attribute">
                      <Field
                        onChange={(
                          e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          this.setState({
                            temporaryAttribute: {
                              attributeKey: e.currentTarget.value,
                              attributeValues: []
                            }
                          });
                        }}
                        type="text"
                        className="form-input"
                        value={temporaryAttribute.attributeKey}
                      />
                    </div>
                    <div className="attribute-values">
                      <AttributeValueManager
                        handleCloseModal={handleCloseModal}
                        refetchProduct={refetchProduct}
                        product={product}
                        index={temporaryAttributePosition}
                        handleAddition={newValue => {
                          this.deleteTemp();
                          additionHelpers.push({
                            attributeKey: temporaryAttribute.attributeKey,
                            attributeValue: newValue.text
                          });
                        }}
                        attribute={temporaryAttribute}
                      />
                    </div>
                    <div
                      style={{
                        visibility:
                          temporaryAttribute.attributeValues.length <= 1
                            ? "visible"
                            : "hidden"
                      }}
                      className="delete-attribute"
                    >
                      <UikButton primary onClick={() => this.deleteTemp()}>
                        <i className="icofont-trash" />
                      </UikButton>
                    </div>
                  </UikFormInputGroup>
                )}
              </React.Fragment>
            )}
          />

          {!cannotAddAnotherAttribute ? (
            <UikButton
              className="add-attribute-button"
              onClick={this.handleAddAnotheroption}
            >
              Add Another Option
            </UikButton>
          ) : null}
        </UikWidgetContent>
        {!isEmpty(editVariationOptionsFormBag.errors) && (
          <UikWidgetContent>
            {Object.keys(editVariationOptionsFormBag.errors).map(errorKey => (
              <div key={errorKey} className="error-message">
                {editVariationOptionsFormBag.errors[errorKey]}
              </div>
            ))}
          </UikWidgetContent>
        )}
        {areMutationErrors(mutations) && (
          <UikWidgetContent>
            {Object.keys(mutations).map((mutation, index) => (
              <GraphQLErrors
                key={index}
                mutationResult={mutations[mutation].result}
              />
            ))}
          </UikWidgetContent>
        )}
        <UikWidgetContent>
          <UikFormInputGroup>
            <UikButton
              success
              onClick={editVariationOptionsFormBag.submitForm}
              disabled={buttonDisabled}
              isLoading={
                areMutationsLoading(mutations) ||
                editVariationOptionsFormBag.isSubmitting
              }
            >
              Save Changes
            </UikButton>
          </UikFormInputGroup>
        </UikWidgetContent>
      </UikWidget>
    );
  }
}

export default AttributeManagerModal;
