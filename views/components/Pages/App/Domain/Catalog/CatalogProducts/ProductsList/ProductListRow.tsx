import React from "react";

import { ProductNodeEdge } from "../../../../../../../../typeDefinitions/__generated__/components";
import Thumbnail from "../../../../../../Helpers/Thumbnail";
import StockBadge from "../../../../../../Helpers/StockBadge";
import routePaths from "../../../../../../../../constants/routePaths";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ domainId: string }> {
  content: ProductNodeEdge;
  style: { [key: string]: any };
}

const ProductListRow = ({ content, style, match }: Props) => {
  const product = content && content.node;
  const productImageLink =
    (content &&
      content.node &&
      content.node.images &&
      content.node.images.edges &&
      content.node.images.edges[0] &&
      content.node.images.edges[0].node &&
      content.node.images.edges[0].node.image) ||
    "";
  const { domainId } = match.params;

  return (
    <div style={style} className="product-row table-row">
      <div className="table-row-item">
        <Thumbnail url={productImageLink} />
      </div>
      <div className="product-row-name table-row-item">
        {product && (
          <Link to={routePaths.catalog.getProductPath(domainId, product.id)}>
            {product.name}
          </Link>
        )}
      </div>
      <div className="product-row-availability table-row-item">
        {product && product.activeCampaignCount}
      </div>
      <div className="product-row-price table-row-item">
        {product && (
          <StockBadge
            variantCount={product.variantCount}
            quantity={product.quantity}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(ProductListRow);
