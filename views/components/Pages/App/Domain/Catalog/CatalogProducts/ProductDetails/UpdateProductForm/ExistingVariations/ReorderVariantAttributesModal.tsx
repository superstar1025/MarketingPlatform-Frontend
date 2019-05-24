import React from "react";
import { NamespacesConsumer } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { WithContext as ReactTags } from "react-tag-input";
import { MutationResult } from "react-apollo";
import { FieldArray } from "formik";
import isEmpty from "lodash/fp/isEmpty";

const {
  UikButton,
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikFormInputGroup
} = require("../../../../../../../../../../@uik");

import localeNamespaceKeys from "../../../../../../../../../../constants/localization";
import Modal from "../../../../../../../../Helpers/Modal";
import { UpdateProductReorderVariationsFormBag } from "../../../../../../../../../../typeDefinitions/catalog/forms";
import { SkuNode } from "../../../../../../../../../../typeDefinitions/catalog";
import GraphQLErrors from "../../../../../../../../Helpers/GraphQLErrors";
import {
  AttributesInputObject,
  UpdateProductAttributesMutation
} from "../../../../../../../../../../typeDefinitions/__generated__/components";

interface Props {
  reorderVariantAttributesFormBag: UpdateProductReorderVariationsFormBag;
  submitForm: () => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  skus?: SkuNode[];
  updateProductAttributesResult: MutationResult<
    UpdateProductAttributesMutation
  >;
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
const ReorderVariantAttributesModal = ({
  submitForm,
  isModalOpen,
  handleCloseModal,
  reorderVariantAttributesFormBag,
  updateProductAttributesResult
}: Props) => {
  const { attributes } = reorderVariantAttributesFormBag.values;
  const buttonDisabled =
    !isEmpty(reorderVariantAttributesFormBag.errors) ||
    !reorderVariantAttributesFormBag.dirty ||
    reorderVariantAttributesFormBag.isSubmitting ||
    updateProductAttributesResult.loading;

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
                <UikWidgetContent>
                  <div className="reorder-variants-modal">
                    <FieldArray
                      name="attributes"
                      render={ah => (
                        <DragDropContext
                          onDragEnd={result => {
                            if (!result.destination) {
                              return;
                            }
                            ah.move(
                              result.source.index,
                              result.destination.index
                            );
                          }}
                        >
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                <React.Fragment>
                                  {attributes
                                    ? attributes.map(
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
                                              draggableId={
                                                attribute.attributeKey
                                              }
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
                                              <FieldArray
                                                name={`attributes.${index}.attributeValues`}
                                                render={arrayHelpers => (
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
                                                    handleDrag={(
                                                      val,
                                                      currentPosition,
                                                      newPosition
                                                    ) => {
                                                      arrayHelpers.move(
                                                        currentPosition,
                                                        newPosition
                                                      );
                                                    }}
                                                  />
                                                )}
                                              />
                                            </div>
                                          </div>
                                        )
                                      )
                                    : null}
                                </React.Fragment>
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      )}
                    />
                  </div>
                </UikWidgetContent>
                {updateProductAttributesResult.error && (
                  <UikWidgetContent>
                    <GraphQLErrors
                      mutationResult={updateProductAttributesResult}
                    />
                  </UikWidgetContent>
                )}
                <UikWidgetContent>
                  <UikFormInputGroup>
                    <UikButton
                      success
                      onClick={() => submitForm()}
                      disabled={buttonDisabled}
                      isLoading={
                        updateProductAttributesResult.loading ||
                        reorderVariantAttributesFormBag.isSubmitting
                      }
                    >
                      Save Changes
                    </UikButton>
                  </UikFormInputGroup>
                </UikWidgetContent>
              </UikWidget>
            </Modal>
          )
        );
      }}
    </NamespacesConsumer>
  );
};

export default ReorderVariantAttributesModal;
