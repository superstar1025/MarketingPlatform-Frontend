import React from "react";
import { QueryResult } from "react-apollo";
import isEmpty from "lodash/fp/isEmpty";

import {
  DeleteAttributeValueComponent,
  SkuCountComponent,
  AttributeInputObject
} from "../../../../typeDefinitions/__generated__/components";
import { UserActionTopBarDropdownContext } from "../../Contexts/UserActionTopBarDropdown";
import GraphQLErrors from "../GraphQLErrors";
import Loading from "../Loading";
import Modal from "../Modal";
import {
  DROP_DOWN_TYPES,
  DROP_DOWN_TITLES
} from "../../../../constants/dropDowns";

const {
  UikButton,
  UikWidgetContent,
  UikWidgetHeader,
  UikWidget,
  UikFormInputGroup
} = require("../../../../@uik");

export interface DeleteAttributeValueModalPassedProps {
  productId: string;
  attribute: AttributeInputObject;
  refetchProduct: () => void;
  domainId: string;
}

export interface DeleteAttributeValueModalProps
  extends DeleteAttributeValueModalPassedProps {
  handleCloseModal: () => void;
  isOpen: boolean;
}

// TODO: localization
const DeleteAttributeValueModal = ({
  isOpen,
  domainId,
  attribute,
  productId,
  handleCloseModal,
  refetchProduct
}: DeleteAttributeValueModalProps) => {
  const { showDropDown } = React.useContext(UserActionTopBarDropdownContext);
  const [isSubmitting, setSubmitting] = React.useState(false);
  return (
    <Modal isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <SkuCountComponent variables={{ productId, ...attribute }}>
        {skuCountResult => {
          const skuCount =
            skuCountResult.data &&
            skuCountResult.data.node &&
            skuCountResult.data.node.skuCount;
          if (skuCountResult.loading) {
            return <Loading />;
          }
          return (
            <DeleteAttributeValueComponent>
              {(deleteAttribute, result) => {
                const onClick = async () => {
                  try {
                    setSubmitting(true);
                    await deleteAttribute({
                      variables: {
                        domainId,
                        productId,
                        attribute
                      }
                    });
                    await refetchProduct();
                    setSubmitting(false);
                    handleCloseModal();
                    showDropDown(DROP_DOWN_TYPES.DROP_DOWN_SUCCESS, {
                      title: DROP_DOWN_TITLES.DROP_DOWN_SUCCESS
                    });
                  } catch (error) {
                    setSubmitting(false);
                  }
                };

                if (result.error || skuCountResult.error) {
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
                        Delete {attribute.attributeKey} -{" "}
                        {attribute.attributeValue}?
                      </UikWidgetHeader>

                      <UikWidgetContent>
                        <GraphQLErrors mutationResult={result} />
                        <GraphQLErrors
                          queryResult={
                            (skuCountResult as unknown) as QueryResult
                          }
                        />
                      </UikWidgetContent>
                      <UikWidgetContent>
                        <UikFormInputGroup>
                          <UikButton
                            error
                            onClick={onClick}
                            disabled={result.loading}
                          >
                            Try Again
                          </UikButton>
                        </UikFormInputGroup>
                      </UikWidgetContent>
                    </UikWidget>
                  );
                }
                const success =
                  result.data &&
                  result.data.deleteAttributeValue &&
                  !isEmpty(result.data.deleteAttributeValue.product);

                if (success) {
                  return null;
                }

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
                      Delete {attribute.attributeKey} -{" "}
                      {attribute.attributeValue}?
                    </UikWidgetHeader>
                    <UikWidgetContent>
                      You're about to delete all{" "}
                      <strong>{skuCount} variants</strong> with a{" "}
                      <strong>{attribute.attributeKey}</strong> of{" "}
                      <strong>{attribute.attributeValue}</strong>. This action
                      can't be undone.
                    </UikWidgetContent>
                    <UikWidgetContent>
                      <UikFormInputGroup>
                        <UikButton
                          error
                          isLoading={result.loading || isSubmitting}
                          onClick={onClick}
                          disabled={result.loading || isSubmitting}
                        >
                          Confrim Delete
                        </UikButton>
                      </UikFormInputGroup>
                    </UikWidgetContent>
                  </UikWidget>
                );
              }}
            </DeleteAttributeValueComponent>
          );
        }}
      </SkuCountComponent>
    </Modal>
  );
};

export default DeleteAttributeValueModal;
