import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { Field, ErrorMessage } from "formik";

const {
  UikFormInputGroup,
  UikButton,
  UikDivider
} = require("../../../../../../../../../@uik");

import { createProductFormFields } from "../../../../../../../../../constants/formFields";
import { AttributeValueTag } from "../NewVariations";
import { getSkuPermutationsFromAttributeValues } from "../../../../../../../../../utils/catalog";
import NewVariantTable from "./NewAttributeManager/NewVariantTable";
import { SkuCreationNode } from "../../../../../../../../../typeDefinitions/catalog";
import { attributeValueDelimiters } from "../../../../../../../../../constants/catalog";
import { CreateProductFormBag } from "../../../../../../../../../typeDefinitions/catalog/forms";
import { AttributesInputObject } from "../../../../../../../../../typeDefinitions/__generated__/components";

interface Props {
  createProductFormBag: CreateProductFormBag;
  temporaryAttribute: null | AttributesInputObject;
  handleAddAnotheroption: () => void;
  setTemporaryAttribute: (a: null | AttributesInputObject) => void;
}

// TODO: localization
class NewAttributeManager extends React.Component<Props> {
  handleDelete = (attributeIndex: number) => (i: number) => {
    const { createProductFormBag } = this.props;

    if (createProductFormBag.values.attributes) {
      const attributesCopy = [...createProductFormBag.values.attributes];

      attributesCopy[attributeIndex].attributeValues.splice(i, 1);

      createProductFormBag.setFieldValue(
        createProductFormFields.attributes,
        attributesCopy
      );

      const newSkus = getSkuPermutationsFromAttributeValues(
        attributesCopy,
        createProductFormBag.values
      );
      createProductFormBag.setFieldValue(createProductFormFields.skus, newSkus);
    }
  };

  handleAddition = (attributeIndex: number, isTemporary?: boolean) => (
    attributeValue: AttributeValueTag
  ) => {
    const {
      createProductFormBag,
      temporaryAttribute,
      setTemporaryAttribute
    } = this.props;

    if (isTemporary) {
      const attributes = createProductFormBag.values.attributes || [];
      const newAttribute = temporaryAttribute
        ? { ...temporaryAttribute, attributeValues: [attributeValue.text] }
        : { attributeKey: "", attributeValues: [] };
      const newAttributes = [...attributes, newAttribute];
      const newSkus = getSkuPermutationsFromAttributeValues(
        newAttributes,
        createProductFormBag.values
      );

      setTemporaryAttribute(null);
      createProductFormBag.setFieldValue(
        createProductFormFields.attributes,
        newAttributes
      );
      createProductFormBag.setFieldValue(createProductFormFields.skus, newSkus);
      return;
    }

    if (createProductFormBag.values.attributes) {
      const attributesCopy = [...createProductFormBag.values.attributes];

      attributesCopy[attributeIndex].attributeValues.push(attributeValue.text);

      createProductFormBag.setFieldValue(
        createProductFormFields.attributes,
        attributesCopy
      );

      const newSkus = getSkuPermutationsFromAttributeValues(
        attributesCopy,
        createProductFormBag.values
      );
      createProductFormBag.setFieldValue(createProductFormFields.skus, newSkus);
    }
  };

  handleDrag = (attributeIndex: number) => (
    attributeValue: AttributeValueTag,
    currPos: number,
    newPos: number
  ) => {
    const { createProductFormBag } = this.props;

    if (createProductFormBag.values.attributes) {
      const attributesCopy = [...createProductFormBag.values.attributes];

      attributesCopy[attributeIndex].attributeValues.splice(currPos, 1);
      attributesCopy[attributeIndex].attributeValues.splice(
        newPos,
        0,
        attributeValue.text
      );

      createProductFormBag.setFieldValue(
        createProductFormFields.attributes,
        attributesCopy
      );

      const newSkus = getSkuPermutationsFromAttributeValues(
        createProductFormBag.values.attributes,
        createProductFormBag.values
      );
      createProductFormBag.setFieldValue(createProductFormFields.skus, newSkus);
    }
  };

  handleAttributeChange = (
    attribute: AttributesInputObject,
    attributeIndex: number,
    isTemporary?: boolean
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTemporary) {
      this.props.setTemporaryAttribute({
        attributeKey: e.currentTarget.value,
        attributeValues: []
      });
      return;
    }

    const { createProductFormBag } = this.props;

    if (createProductFormBag.values.attributes) {
      const newAttributes = [...createProductFormBag.values.attributes];
      newAttributes.splice(attributeIndex, 1, {
        attributeKey: e.currentTarget.value,
        attributeValues: attribute.attributeValues
      });

      createProductFormBag.setFieldValue(
        createProductFormFields.attributes,
        newAttributes
      );

      const newSkus = getSkuPermutationsFromAttributeValues(
        newAttributes,
        createProductFormBag.values
      );

      createProductFormBag.setFieldValue(createProductFormFields.skus, newSkus);
    }
  };

  handleDeleteRow = (attributeIndex: number, isTemporary?: boolean) => () => {
    const { createProductFormBag } = this.props;
    if (isTemporary) {
      this.setState({ temporaryAttribute: null });
      return;
    }

    if (createProductFormBag.values.attributes) {
      const attributesCopy = [...createProductFormBag.values.attributes];

      attributesCopy.splice(attributeIndex, 1);

      createProductFormBag.setFieldValue(
        createProductFormFields.attributes,
        attributesCopy
      );

      const newSkus = getSkuPermutationsFromAttributeValues(
        attributesCopy,
        createProductFormBag.values
      );

      createProductFormBag.setFieldValue(createProductFormFields.skus, newSkus);
    }
  };

  handleEditedVariant = (newSku: SkuCreationNode) => {
    const { createProductFormBag } = this.props;

    if (createProductFormBag.values.skus) {
      const newSkus = [...createProductFormBag.values.skus];
      const skuIndex = createProductFormBag.values.skus.findIndex(
        (element: SkuCreationNode) => element.tempId === newSku.tempId
      );

      if (skuIndex >= 0) {
        newSkus.splice(skuIndex, 1, newSku);
        createProductFormBag.setFieldValue(
          createProductFormFields.skus,
          newSkus
        );
      }
    }
  };

  render() {
    const {
      createProductFormBag,
      temporaryAttribute,
      handleAddAnotheroption
    } = this.props;
    const attributes =
      (createProductFormBag.values && createProductFormBag.values.attributes) ||
      [];
    const temporaryAttributePosition =
      attributes.length - 1 > 0 ? attributes.length - 1 : 0;
    const hideAddAnotherButton =
      (createProductFormBag.values.attributes &&
        createProductFormBag.values.attributes.length >= 3) ||
      (createProductFormBag.values.attributes &&
        createProductFormBag.values.attributes.length >= 2 &&
        temporaryAttribute);

    return (
      <div>
        <UikDivider margin />
        <div>
          {attributes.map(
            (attribute: AttributesInputObject, attributeIndex: number) => {
              const tags = attribute.attributeValues.map(
                (attributeValue: string) => ({
                  id: attributeValue,
                  text: attributeValue
                })
              );

              return (
                <UikFormInputGroup
                  key={attributeIndex}
                  className="attribute-manager-row"
                >
                  <div className="attribute">
                    <Field
                      name={`${
                        createProductFormFields.attributes
                      }[${attributeIndex}].attributeKey`}
                      onChange={this.handleAttributeChange(
                        attribute,
                        attributeIndex
                      )}
                      type="text"
                      className="form-input"
                      value={
                        (createProductFormBag.values.attributes &&
                          createProductFormBag.values.attributes[
                            attributeIndex
                          ] &&
                          createProductFormBag.values.attributes[attributeIndex]
                            .attributeKey) ||
                        ""
                      }
                    />
                  </div>
                  <div className="attribute-values">
                    <ReactTags
                      tags={tags}
                      placeholder={
                        attribute.attributeValues.length
                          ? ""
                          : "Add new attributes"
                      }
                      delimiters={attributeValueDelimiters}
                      handleDelete={this.handleDelete(attributeIndex)}
                      handleAddition={this.handleAddition(attributeIndex)}
                      handleDrag={this.handleDrag(attributeIndex)}
                    />
                  </div>
                  {attributes.length > 1 && (
                    <div className="delete-attribute">
                      <UikButton
                        primary
                        onClick={this.handleDeleteRow(attributeIndex)}
                      >
                        <i className="icofont-trash" />
                      </UikButton>
                    </div>
                  )}
                </UikFormInputGroup>
              );
            }
          )}

          {temporaryAttribute && (
            <UikFormInputGroup className="attribute-manager-row">
              <div className="attribute">
                <Field
                  onChange={this.handleAttributeChange(
                    temporaryAttribute,
                    temporaryAttributePosition,
                    true
                  )}
                  type="text"
                  className="form-input"
                  value={temporaryAttribute.attributeKey}
                />
              </div>
              <div className="attribute-values">
                <ReactTags
                  tags={temporaryAttribute.attributeValues.map(av => ({
                    id: av,
                    text: av
                  }))}
                  placeholder={
                    temporaryAttribute.attributeValues.length
                      ? ""
                      : "Add new attributes"
                  }
                  delimiters={attributeValueDelimiters}
                  handleDelete={() => {}}
                  handleAddition={this.handleAddition(
                    temporaryAttributePosition,
                    true
                  )}
                  handleDrag={() => {}}
                />
              </div>

              {attributes.length > 1 && (
                <div className="delete-attribute">
                  <UikButton
                    primary
                    onClick={this.handleDeleteRow(
                      temporaryAttributePosition,
                      true
                    )}
                  >
                    <i className="icofont-trash" />
                  </UikButton>
                </div>
              )}
            </UikFormInputGroup>
          )}
        </div>

        <ErrorMessage name={createProductFormFields.attributes}>
          {() => (
            <div className="error-message">
              {createProductFormBag.errors[createProductFormFields.attributes]}
            </div>
          )}
        </ErrorMessage>

        {!hideAddAnotherButton ? (
          <UikButton
            className="add-attribute-button"
            onClick={handleAddAnotheroption}
          >
            Add another option
          </UikButton>
        ) : null}

        {!!createProductFormBag.values.skus &&
          !!createProductFormBag.values.skus.length && (
            <NewVariantTable
              attributes={attributes}
              skus={createProductFormBag.values.skus}
              handleEditedVariant={this.handleEditedVariant}
            />
          )}
      </div>
    );
  }
}

export default NewAttributeManager;
