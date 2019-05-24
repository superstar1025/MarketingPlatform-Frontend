import React from "react";
import isEmpty from "lodash/fp/isEmpty";
import { WithContext as ReactTags } from "react-tag-input";
import { FieldArray } from "formik";

import { attributeValueDelimiters } from "../../../../../../../../../../../../constants/catalog";
import { AttributeValueTag } from "../../../../../../CreateProduct/CreateProductForm/NewVariations";
import { ModalContext } from "../../../../../../../../../../Contexts/Modals";
import { MODAL_TYPES } from "../../../../../../../../../../../../constants/modals";
import {
  AttributesInputObject,
  ProductNode
} from "../../../../../../../../../../../../typeDefinitions/__generated__/components";
import { DeleteAttributeValueModalPassedProps } from "../../../../../../../../../../Helpers/ModalSwitch/DeleteAttributeValueModal";
import { withRouter, RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<{ domainId: string }> {
  attribute: AttributesInputObject;
  index: number;
  handleAddition?: (v: AttributeValueTag) => void;
  product: ProductNode;
  refetchProduct: () => void;
  handleCloseModal: () => void;
}
const AttributeValueManager = ({
  match,
  handleAddition = () => {},
  attribute,
  index,
  product,
  refetchProduct,
  handleCloseModal
}: IProps) => {
  const { toggleModalType } = React.useContext(ModalContext);

  if (isEmpty(attribute.attributeValues)) {
    return (
      <ReactTags
        tags={[]}
        placeholder={"Add a new attributes"}
        delimiters={attributeValueDelimiters}
        handleAddition={handleAddition}
        handleDelete={() => {}}
      />
    );
  }

  return (
    <FieldArray
      name={`attributes.${index}.attributeValues`}
      render={() => (
        <React.Fragment>
          {attribute.attributeValues.map(
            (attributeValue: string, i: number) => {
              const attributeValuePair = {
                attributeKey: attribute.attributeKey,
                attributeValue
              };
              const { domainId } = match.params;
              const modalProps: DeleteAttributeValueModalPassedProps = {
                attribute: attributeValuePair,
                productId: product.id,
                refetchProduct,
                domainId
              };
              return (
                <span className="tag-wrapper" key={attributeValue}>
                  <span>{attributeValue}</span>{" "}
                  {attribute.attributeValues.length > 1 && (
                    <i
                      onClick={() => {
                        if (i > 0) {
                          handleCloseModal();
                          toggleModalType(
                            MODAL_TYPES.DELETE_ATTRIBUTE,
                            modalProps
                          );
                        }
                      }}
                      className="icofont-close"
                    />
                  )}
                </span>
              );
            }
          )}
        </React.Fragment>
      )}
    />
  );
};

export default withRouter(AttributeValueManager);
