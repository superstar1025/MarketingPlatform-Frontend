import React, { PureComponent } from "react";
import { NamespacesConsumer } from "react-i18next";
import values from "lodash/fp/values";

import Thumbnail from "../../../../../../../../Helpers/Thumbnail";
import localeNamespaceKeys from "../../../../../../../../../../constants/localization";
import EditVariantModal from "./EditVariantModal";
import { getDisplayPrice } from "../../../../../../../../../../utils/catalog";
import { SkuCreationNode } from "../../../../../../../../../../typeDefinitions/catalog";
import { AttributesInputObject } from "../../../../../../../../../../typeDefinitions/__generated__/components";

const {
  UikButton,
  UikWidgetTable
} = require("../../../../../../../../../../@uik");

interface IProps {
  attributes: AttributesInputObject[];
  skus: SkuCreationNode[];
  handleEditedVariant: (newSku: SkuCreationNode) => void;
}

interface IState {
  isModalOpen: boolean;
  sku: SkuCreationNode | null;
}

// TODO: localization
class NewVariantTable extends PureComponent<IProps, IState> {
  state: IState = {
    isModalOpen: false,
    sku: null
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false, sku: null });
  };

  handleOpenModal = (sku: SkuCreationNode) => () => {
    this.setState({ isModalOpen: true, sku });
  };

  render() {
    const { attributes, skus, handleEditedVariant } = this.props;
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
              <div className="variant-table">
                <UikWidgetTable>
                  <thead>
                    <tr>
                      <th />
                      {attributes.map((attribute, index) => {
                        return (
                          <th key={`${attribute}-${index}`}>
                            {attribute.attributeKey}
                          </th>
                        );
                      })}
                      <th>SKU</th>
                      <th>PRICE</th>
                      <th>INVENTORY</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {skus.map(sku => {
                      return (
                        <tr key={sku.tempId} className="sku-row">
                          <td>
                            <Thumbnail file={sku.image} />
                          </td>
                          {!!sku &&
                            values(sku.attributes).map(
                              (skuAttributeValue, index) => (
                                <td
                                  key={`${skuAttributeValue}-${index}`}
                                  className="sku-attribute-value"
                                >
                                  {skuAttributeValue}
                                </td>
                              )
                            )}
                          <td>{sku.sku}</td>
                          <td>
                            {getDisplayPrice(sku.basePrice, sku.salePrice)}
                          </td>
                          <td>{sku.quantity}</td>
                          <td>
                            <UikButton onClick={this.handleOpenModal(sku)}>
                              Edit
                            </UikButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </UikWidgetTable>
                {this.state.isModalOpen && this.state.sku ? (
                  <EditVariantModal
                    sku={this.state.sku}
                    isModalOpen={this.state.isModalOpen}
                    handleCloseModal={this.handleCloseModal}
                    handleEditedVariant={handleEditedVariant}
                  />
                ) : null}
              </div>
            )
          );
        }}
      </NamespacesConsumer>
    );
  }
}

export default NewVariantTable;
