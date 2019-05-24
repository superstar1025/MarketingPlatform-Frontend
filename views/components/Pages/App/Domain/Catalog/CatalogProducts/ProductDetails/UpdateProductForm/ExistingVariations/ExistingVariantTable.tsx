import React, { PureComponent } from "react";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";

import Thumbnail from "../../../../../../../../Helpers/Thumbnail";
import localeNamespaceKeys from "../../../../../../../../../../constants/localization";
import { getDisplayPrice } from "../../../../../../../../../../utils/catalog";
import { SkuNode } from "../../../../../../../../../../typeDefinitions/catalog";
import { AttributesInputObject } from "../../../../../../../../../../typeDefinitions/__generated__/components";

const {
  UikButton,
  UikWidgetTable
} = require("../../../../../../../../../../@uik");

interface IProps {
  attributes: AttributesInputObject[];
  skus: SkuNode[];
  handleEditVariantModalAccessibility: (newSku: SkuNode) => void;
}

interface IState {
  isModalOpen: boolean;
}

// TODO: localization
class ExistingVariantTable extends PureComponent<IProps, IState> {
  state: IState = {
    isModalOpen: false
  };

  render() {
    const {
      attributes,
      skus,
      handleEditVariantModalAccessibility
    } = this.props;
    return (
      <NamespacesConsumer
        ns={[
          localeNamespaceKeys.catalog._name,
          localeNamespaceKeys.formValidation._name
        ]}
      >
        {(t, { ready }) => {
          return !isEmpty(skus) && ready ? (
            <div className="variant-table existing-variants">
              <UikWidgetTable>
                <thead>
                  <tr>
                    <th />
                    {attributes.map((attribute, index) => {
                      return (
                        <th key={`${attribute.attributeKey}-${index}`}>
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
                      <tr key={sku.id} className="sku-row">
                        <td>
                          <Thumbnail url={sku.image} />
                        </td>
                        {!!sku &&
                          attributes.map(attribute => (
                            <td
                              key={`${attribute.attributeKey}`}
                              className="sku-attribute-value"
                            >
                              {sku.attributes &&
                                sku.attributes[attribute.attributeKey]}
                            </td>
                          ))}
                        <td>{sku.sku}</td>
                        <td>{getDisplayPrice(sku.basePrice, sku.salePrice)}</td>
                        <td>{sku.quantity}</td>
                        <td>
                          <UikButton
                            onClick={() =>
                              handleEditVariantModalAccessibility(sku)
                            }
                          >
                            Edit
                          </UikButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </UikWidgetTable>
            </div>
          ) : null;
        }}
      </NamespacesConsumer>
    );
  }
}

export default ExistingVariantTable;
