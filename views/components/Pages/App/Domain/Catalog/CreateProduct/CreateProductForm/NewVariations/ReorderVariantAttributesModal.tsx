import React, { PureComponent } from "react";
import { NamespacesConsumer } from "react-i18next";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import { WithContext as ReactTags } from "react-tag-input";
import { Formik } from "formik";

const {
  UikButton,
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../../../../../../@uik");

import localeNamespaceKeys from "../../../../../../../../../constants/localization";
import Modal from "../../../../../../../Helpers/Modal";
import {
  createProductReorderVariationsFormFields,
  createProductFormFields
} from "../../../../../../../../../constants/formFields";
import { getSkuPermutationsFromAttributeValues } from "../../../../../../../../../utils/catalog";
import {
  CreateProductFormBag,
  ReorderVariantAttributesFormBag,
  ReorderVariantAttributesFormValues
} from "../../../../../../../../../typeDefinitions/catalog/forms";
import { AttributeValueTag } from "../NewVariations";
import { AttributesInputObject } from "../../../../../../../../../typeDefinitions/__generated__/components";

interface IProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  createProductFormBag: CreateProductFormBag;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  display: "flex",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  width: "100%"
});

// TODO: unit test some of this logic
// TODO: fix the dragging error
// TODO: localization
class ReorderVariantAttributesModal extends PureComponent<IProps> {
  handleDragAttributeValues = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    attributeIndex: number,
    attributes?: AttributesInputObject[]
  ) => (
    currentAttributeValue: AttributeValueTag,
    currPos: number,
    newPos: number
  ) => {
    const attributesCopy = (attributes && [...attributes]) || [];
    const currentAttribute =
      attributesCopy &&
      attributesCopy[attributeIndex] &&
      attributesCopy[attributeIndex];

    if (currentAttribute) {
      // delete moving attribute value at previous position and insert at new position
      currentAttribute.attributeValues.splice(currPos, 1);
      currentAttribute.attributeValues.splice(
        newPos,
        0,
        currentAttributeValue.text
      );

      setFieldValue(
        createProductReorderVariationsFormFields.attributes,
        attributesCopy
      );
    }
  };
  handleDragAttributes = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    attributes?: AttributesInputObject[]
  ) => (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newAttributes = this.reorder(
      result.source.index,
      result.destination.index,
      attributes
    );
    setFieldValue(
      createProductReorderVariationsFormFields.attributes,
      newAttributes
    );
  };
  reorder = (
    startIndex: number,
    endIndex: number,
    attributes?: AttributesInputObject[]
  ) => {
    const result = (attributes && [...attributes]) || [];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  submitForm = (values: ReorderVariantAttributesFormValues) => () => {
    const { createProductFormBag, handleCloseModal } = this.props;

    const newSkus = getSkuPermutationsFromAttributeValues(
      values.attributes || [],
      createProductFormBag.values
    );

    createProductFormBag.setFieldValue(createProductFormFields.skus, newSkus);
    createProductFormBag.setFieldValue(
      createProductFormFields.attributes,
      values.attributes
    );
    handleCloseModal();
  };
  render() {
    const { isModalOpen, handleCloseModal, createProductFormBag } = this.props;
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
              <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal}>
                <Formik
                  onSubmit={() => {}}
                  initialValues={{
                    [createProductReorderVariationsFormFields.attributes]:
                      createProductFormBag.values.attributes
                  }}
                  render={(
                    reorderVariantAttributesFormBag: ReorderVariantAttributesFormBag
                  ) => (
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
                        Reorder variation options and values
                      </UikWidgetHeader>
                      <div className="reorder-variants-modal">
                        <UikWidgetContent>
                          <DragDropContext
                            onDragEnd={this.handleDragAttributes(
                              reorderVariantAttributesFormBag.setFieldValue,
                              reorderVariantAttributesFormBag.values.attributes
                            )}
                          >
                            <Droppable droppableId="droppable">
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  style={getListStyle(snapshot.isDraggingOver)}
                                >
                                  {reorderVariantAttributesFormBag.values
                                    .attributes &&
                                    reorderVariantAttributesFormBag.values.attributes.map(
                                      (
                                        attribute: AttributesInputObject,
                                        index: number
                                      ) => (
                                        <div
                                          className="attribute-row"
                                          key={attribute.attributeKey}
                                        >
                                          <Draggable
                                            key={attribute.attributeKey}
                                            draggableId={attribute.attributeKey}
                                            index={index}
                                          >
                                            {(provided, snapshot) => {
                                              return (
                                                <div
                                                  className="draggable-item"
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                      .style
                                                  )}
                                                >
                                                  <div>
                                                    {attribute.attributeKey}
                                                  </div>
                                                </div>
                                              );
                                            }}
                                          </Draggable>
                                          <div className="attribute-values">
                                            <ReactTags
                                              tags={attribute.attributeValues.map(
                                                value => ({
                                                  id: value,
                                                  text: value
                                                })
                                              )}
                                              delimiters={[]}
                                              handleDelete={() => {}}
                                              handleAddition={() => {}}
                                              handleDrag={this.handleDragAttributeValues(
                                                reorderVariantAttributesFormBag.setFieldValue,
                                                index,
                                                reorderVariantAttributesFormBag
                                                  .values.attributes
                                              )}
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                        </UikWidgetContent>
                      </div>
                      <UikWidgetContent>
                        <UikFormInputGroup>
                          <UikButton
                            success
                            onClick={this.submitForm(
                              reorderVariantAttributesFormBag.values
                            )}
                          >
                            Save Changes
                          </UikButton>
                        </UikFormInputGroup>
                      </UikWidgetContent>
                    </UikWidget>
                  )}
                />
              </Modal>
            )
          );
        }}
      </NamespacesConsumer>
    );
  }
}

export default ReorderVariantAttributesModal;
