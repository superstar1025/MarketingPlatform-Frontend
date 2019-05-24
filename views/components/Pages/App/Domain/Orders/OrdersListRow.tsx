import React from "react";

import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { OrderNodeEdge } from "../../../../../../typeDefinitions/__generated__/components";
import routePaths from "../../../../../../constants/routePaths";
import StatusBadge from "../../../../Helpers/StatusBadge";
import { getDisplayPrice } from "../../../../../../utils/catalog";

interface Props extends RouteComponentProps<{ domainId: string }> {
  content: OrderNodeEdge;
  style: { [key: string]: any };
}

const ProductListRow = ({ content, style, match }: Props) => {
  const order = content && content.node;
  const { domainId } = match.params;

  if (order) {
    return (
      <div style={style} className="order-row table-row">
        <div className="order-row-item table-row-item">
          <Link to={routePaths.orders.getOrderPath(domainId, order.id)}>
            <span className="break-word">{order.stripeId}</span>
          </Link>
        </div>
        <div className="order-row-item table-row-item">
          {order.customerName}
        </div>
        <div className="order-row-item table-row-item">Campaign Name</div>
        <div className="order-row-item table-row-item">
          <StatusBadge status={order.orderStatus} />
        </div>
        <div className="order-row-item table-row-item">
          {getDisplayPrice(order.orderTotal)}
        </div>
      </div>
    );
  }
  return null;
};

export default withRouter(ProductListRow);
