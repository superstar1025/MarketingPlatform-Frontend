import React, { PureComponent } from "react";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../../../../constants/localization";
import { createProductFormFields } from "../../../../../../../../constants/formFields";
import { SkuCreationNode } from "../../../../../../../../typeDefinitions/catalog";
import ReorderVariantAttributesModal from "./NewVariations/ReorderVariantAttributesModal";
import NewAttributeManager from "./NewVariations/NewAttributeManager";
import { CreateProductFormBag } from "../../../../../../../../typeDefinitions/catalog/forms";
import { getNewDefaultAttribute } from "../../../../../../../../utils/catalog";
import { AttributesInputObject } from "../../../../../../../../typeDefinitions/__generated__/components";

const {
  UikButton,
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent
} = require("../../../../../../../../@uik");

export type AttributeValueTag = { id: string; text: string };
export type AttributeValueTags = AttributeValueTag[];

export interface IVariationsFormValues {
  [key: string]: any;
  skus?: SkuCreationNode[];
  attributes?: string[] | [];
  attributeValues?: string[][] | [];
}

interface Props {
  formBag: CreateProductFormBag;
}

interface State {
  isAttributeManagerShowing: boolean;
  isReorderModalOpen: boolean;
  temporaryAttribute: null | AttributesInputObject;
}

//TODO: localization
class NewVariations extends PureComponent<Props, State> {
  state: State = {
    isAttributeManagerShowing: false,
    isReorderModalOpen: false,
    temporaryAttribute: null
  };

  setTemporaryAttribute = (attribute: null | AttributesInputObject) => {
    this.setState({ temporaryAttribute: attribute });
  };
  handleAddAnotheroption = () => {
    const { formBag } = this.props;

    if (formBag.values.attributes && formBag.values.attributes.length < 3) {
      const newAttribute = getNewDefaultAttribute(formBag.values.attributes);
      this.setState({ temporaryAttribute: newAttribute });
    }
  };
  handleAddOptionClick = () => {
    this.setState({
      isAttributeManagerShowing: !this.state.isAttributeManagerShowing
    });
  };

  handleReorderModalAccessibility = () => {
    this.setState({
      isReorderModalOpen: !this.state.isReorderModalOpen
    });
  };
  render() {
    const { formBag } = this.props;

    return (
      <NamespacesConsumer
        ns={[
          localeNamespaceKeys.catalog._name,
          localeNamespaceKeys.formValidation._name
        ]}
      >
        {(t, { ready }) => {
          const attributeCount =
            formBag.values.attributes && formBag.values.attributes.length;
          return (
            ready && (
              <UikWidget>
                <UikWidgetHeader
                  className="variations-widget-header"
                  rightEl={
                    <div className="widget-header-buttons">
                      {attributeCount && attributeCount > 1 ? (
                        <UikButton
                          onClick={this.handleReorderModalAccessibility}
                        >
                          Reorder Options
                        </UikButton>
                      ) : null}
                      <UikButton
                        primary
                        onClick={() => {
                          if (this.state.isAttributeManagerShowing) {
                            formBag.setFieldValue(
                              createProductFormFields.skus,
                              formBag.initialValues.skus
                            );
                            formBag.setFieldValue(
                              createProductFormFields.attributes,
                              formBag.initialValues.attributes
                            );
                          }
                          this.handleAddOptionClick();
                          this.handleAddAnotheroption();
                        }}
                      >
                        {this.state.isAttributeManagerShowing ? (
                          <i className="icofont-close" />
                        ) : (
                          t(
                            `${
                              localeNamespaceKeys.catalog.product.formLabels
                                .variations._keyPath
                            }.${
                              localeNamespaceKeys.catalog.product.formLabels
                                .variations.buttonTextAddOption
                            }`
                          )
                        )}
                      </UikButton>
                    </div>
                  }
                >
                  {t(
                    `${
                      localeNamespaceKeys.catalog.product.formLabels.variations
                        ._keyPath
                    }.${
                      localeNamespaceKeys.catalog.product.formLabels.variations
                        .sectionHeader
                    }`
                  )}
                </UikWidgetHeader>
                <UikWidgetContent>
                  <p>
                    Add options if this product comes in multiple variations,
                    like different sizes or colors.
                  </p>

                  {this.state.isAttributeManagerShowing ? (
                    <NewAttributeManager
                      createProductFormBag={formBag}
                      temporaryAttribute={this.state.temporaryAttribute}
                      handleAddAnotheroption={this.handleAddAnotheroption}
                      setTemporaryAttribute={this.setTemporaryAttribute}
                    />
                  ) : null}
                </UikWidgetContent>

                {this.state.isReorderModalOpen ? (
                  <ReorderVariantAttributesModal
                    createProductFormBag={formBag}
                    isModalOpen={this.state.isReorderModalOpen}
                    handleCloseModal={this.handleReorderModalAccessibility}
                  />
                ) : null}
              </UikWidget>
            )
          );
        }}
      </NamespacesConsumer>
    );
  }
}

export default NewVariations;
