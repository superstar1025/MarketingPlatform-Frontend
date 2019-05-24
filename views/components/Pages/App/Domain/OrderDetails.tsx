import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { NamespacesConsumer } from "react-i18next";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import ReactToPrint from "react-to-print";
import isEmpty from "lodash/fp/isEmpty";

import BackLink from "../../../Helpers/TopBar/BackLink";
import GraphQLErrors from "../../../Helpers/GraphQLErrors";
import Layout from "../../../Helpers/Layout";
import Loading from "../../../Helpers/Loading";
import StatusBadge from "../../../Helpers/StatusBadge";
import localeNamespaceKeys from "../../../../../constants/localization";
import routePaths from "../../../../../constants/routePaths";
import { OrderComponent } from "../../../../../typeDefinitions/__generated__/components";
import {
  getStripeFee,
  getTaxPercent,
  getItemTotalDisplayPrice
} from "../../../../../utils/price";
import ErrorBoundary from "../../../Helpers/ErrorBoundary";
import { displayUTCTimestamp, getGenderByNumber } from "../../../../../utils";
import { getCampaignLabel } from "../../../../../utils/campaigns";
import { getDisplayPrice } from "../../../../../utils/catalog";
import Thumbnail from "../../../Helpers/Thumbnail";
import OrderStatusFilters from "../../../../../constants/orderStatusFilters";

const {
  UikDivider,
  UikHeadline,
  UikHeadlineDesc,
  UikWidget,
  UikWidgetContent,
  UikWidgetHeader,
  UikDropdown,
  UikDropdownItem
} = require("../../../../../@uik");

export const orderDetailsTestIds = {
  orderDetails: "orderDetails"
};

interface Props
  extends RouteComponentProps<{ domainId: string; orderId: string }> {}

class OrderDetails extends PureComponent<Props> {
  private componentToPrintRef: (element: HTMLDivElement) => void;
  private componentToPrint: HTMLDivElement | null;
  constructor(props: Props) {
    super(props);
    this.componentToPrint = null;
    this.componentToPrintRef = (element: HTMLDivElement) => {
      this.componentToPrint = element;
    };
  }
  render() {
    const { match } = this.props;
    const { domainId, orderId } = match.params;

    return (
      <NamespacesConsumer ns={[localeNamespaceKeys.orders._name]}>
        {(t, { ready }) =>
          ready && (
            <Layout
              title={
                <BackLink
                  text={t(
                    `${localeNamespaceKeys.orders.order._name}.${
                      localeNamespaceKeys.orders.order.backToOrders
                    }`
                  )}
                  route={routePaths.orders.getBasePath(domainId)}
                />
              }
            >
              <ErrorBoundary>
                <OrderComponent
                  variables={{
                    orderId
                  }}
                >
                  {result => {
                    if (result.loading) {
                      return <Loading />;
                    }
                    if (result.error) {
                      return <GraphQLErrors queryResult={result} />;
                    }
                    const order = result.data && result.data.node;

                    const orderTotal = (order && order.orderTotal) || 0;
                    const shippingCost = (order && order.shippingCost) || 0;
                    const tax = (order && order.tax) || 0;
                    const vendorTotal = (order && order.vendorTotal) || 0;
                    const stripeFee = getStripeFee(
                      orderTotal,
                      tax,
                      shippingCost,
                      vendorTotal
                    );
                    const customerPhoneNumber =
                      (order && order.customerPhoneNumber) || null;
                    const phoneNumber = parsePhoneNumberFromString(
                      customerPhoneNumber || ""
                    );
                    const shippingLabelUrl = order && order.shippingLabelUrl;
                    const packingSlipUrl = order && order.packingSlipUrl;
                    const paymentMethod = order && order.paymentMethod;
                    const shippingMethod = order && order.shippingMethod;
                    const shippingTrackingNumber =
                      (order && order.shippingTrackingNumber) || null;
                    const shippingTrackingUrl =
                      order && order.shippingTrackingUrl;
                    const campaign =
                      order &&
                      order.campaigns &&
                      order.campaigns.edges &&
                      order.campaigns.edges[0] &&
                      order.campaigns.edges[0].node &&
                      order.campaigns.edges[0].node;
                    const campaignName = (campaign && campaign.name) || null;
                    const campaignType = (campaign && campaign.type) || null;
                    const taxPercent = getTaxPercent(
                      orderTotal,
                      shippingCost,
                      tax
                    );
                    const orderStatus = (order && order.orderStatus) || "";
                    const orderTimestamp =
                      order &&
                      order.createdOn &&
                      displayUTCTimestamp(order.createdOn);
                    const customerName = order && order.customerName;
                    const customerEmail = order && order.customerEmail;
                    const internationalPhoneNumber =
                      phoneNumber && phoneNumber.formatInternational();
                    const shippingAddress1 = order && order.shippingAddress1;
                    const shippingAddress2 = order && order.shippingAddress2;
                    const shippingCity = order && order.shippingCity;
                    const shippingState = order && order.shippingState;
                    const shippingZipCode = order && order.shippingZipCode;
                    const shippingCountry = order && order.shippingCountry;
                    const campaignLabel = getCampaignLabel(campaignType);
                    const orderTotalDisplayPrice = getDisplayPrice(orderTotal);
                    const shippingCostDisplayPrice = getDisplayPrice(
                      shippingCost
                    );
                    const taxDisplayPrice = getDisplayPrice(tax);
                    const stripeFeeDisplayPrice = getDisplayPrice(stripeFee);
                    const vendorTotalDisplayPrice = getDisplayPrice(
                      vendorTotal
                    );
                    const orderItems = (order && order.items) || [];

                    return (
                      <div>
                        <UikHeadline className="headline">
                          <span>{order && order.stripeId}</span>
                          {orderStatus && <StatusBadge status={orderStatus} />}
                        </UikHeadline>
                        <UikHeadlineDesc
                          Component="div"
                          className="order-details-headline-desc"
                        >
                          {orderTimestamp && (
                            <span>
                              <i className="icofont-ui-calendar" />
                              <span>{orderTimestamp}</span>
                            </span>
                          )}
                          <span>
                            <ReactToPrint
                              bodyClass="print"
                              trigger={() => (
                                <a href="#">
                                  <i className="icofont-download" />
                                  <span>
                                    {t(
                                      `${
                                        localeNamespaceKeys.orders.order._name
                                      }.${
                                        localeNamespaceKeys.orders.order
                                          .downloadInvoice
                                      }`
                                    )}
                                  </span>
                                </a>
                              )}
                              content={() => this.componentToPrint}
                            />
                          </span>
                          <UikDropdown
                            Component="span"
                            className="drop-down"
                            DisplayComponent={({
                              onClick
                            }: {
                              onClick: () => void;
                            }) => (
                              <span onClick={onClick}>
                                <i className="icofont-page" />
                                <span>
                                  {t(
                                    `${
                                      localeNamespaceKeys.orders.order._name
                                    }.${
                                      localeNamespaceKeys.orders.order
                                        .shippingLabels
                                    }`
                                  )}
                                </span>
                                <i className="icofont-caret-down" />
                              </span>
                            )}
                          >
                            {packingSlipUrl && (
                              <UikDropdownItem
                                Component="a"
                                href={packingSlipUrl}
                                target={"_blank"}
                                rel="noopener noreferrer"
                              >
                                Packing Slips
                              </UikDropdownItem>
                            )}
                            {shippingLabelUrl && (
                              <UikDropdownItem
                                Component="a"
                                href={shippingLabelUrl}
                                target={"_blank"}
                                rel="noopener noreferrer"
                              >
                                Shipping Labels
                              </UikDropdownItem>
                            )}
                          </UikDropdown>
                        </UikHeadlineDesc>
                        <div className="widget-row">
                          <div className="widget-column">
                            <UikWidget>
                              <UikWidgetHeader>
                                {t(
                                  `${localeNamespaceKeys.orders.order._name}.${
                                    localeNamespaceKeys.orders.order
                                      .customerDetails
                                  }`
                                )}
                              </UikWidgetHeader>
                              <UikWidgetContent>
                                <div className="kv-table">
                                  {customerName && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .customerName
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {customerName}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {customerEmail && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .customerEmail
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {customerEmail}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {internationalPhoneNumber && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .customerPhone
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {internationalPhoneNumber}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </UikWidgetContent>
                              <UikDivider />
                              <UikWidgetHeader>
                                {t(
                                  `${localeNamespaceKeys.orders.order._name}.${
                                    localeNamespaceKeys.orders.order
                                      .shippingDetails
                                  }`
                                )}
                              </UikWidgetHeader>
                              <UikWidgetContent>
                                <div className="kv-table">
                                  {shippingAddress1 && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .shippingAddress1
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {shippingAddress1}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {shippingAddress2 && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .shippingAddress2
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {shippingAddress2}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {(shippingCity || shippingState) && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .shippingCity
                                            }`
                                          )}
                                          ,{" "}
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .shippingState
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {shippingCity}
                                          {shippingCity &&
                                            shippingState &&
                                            ", "}
                                          {shippingState}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {shippingZipCode && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .shippingZipCode
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {order && order.shippingZipCode}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {shippingCountry && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          Country
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {shippingCountry}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </UikWidgetContent>
                              <UikDivider />
                              <UikWidgetHeader>
                                {t(
                                  `${localeNamespaceKeys.orders.order._name}.${
                                    localeNamespaceKeys.orders.order
                                      .campaignDetails
                                  }`
                                )}
                              </UikWidgetHeader>
                              <UikWidgetContent>
                                <div className="kv-table">
                                  {campaignLabel && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .campaignType
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {campaignLabel}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {campaignName && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-center-aligned">
                                        <div className="kv-key-center-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .campaign
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-center-aligned">
                                        <div className="kv-value-center-aligned">
                                          {campaignName}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </UikWidgetContent>
                            </UikWidget>
                          </div>
                          <div className="widget-column">
                            <UikWidget>
                              <UikWidgetHeader>
                                {t(
                                  `${localeNamespaceKeys.orders.order._name}.${
                                    localeNamespaceKeys.orders.order
                                      .orderDetails
                                  }`
                                )}
                              </UikWidgetHeader>
                              {!isEmpty(orderItems) && (
                                <UikWidgetContent>
                                  <div className="order-sku-list">
                                    <div className="table">
                                      {orderItems.map(item => {
                                        const skuImage = item.sku.image;
                                        const productName =
                                          item.sku.product.name;
                                        const gender = item.sku.product.gender;
                                        const skuAttributes =
                                          item.sku.attributes;
                                        const quantity = item.quantity;
                                        const basePrice = item.sku.basePrice;
                                        const salePrice = item.sku.salePrice;
                                        const productDisplayPrice = getItemTotalDisplayPrice(
                                          quantity,
                                          basePrice,
                                          salePrice
                                        );
                                        return (
                                          <div
                                            key={item.id}
                                            className="table-row"
                                          >
                                            <div className="table-row-item">
                                              <Thumbnail url={skuImage} />
                                            </div>
                                            <div className="table-row-item order-product-info">
                                              <div>{productName}</div>
                                              {(gender || skuAttributes) && (
                                                <div className="subtext sku-attributes">
                                                  {gender && (
                                                    <span>
                                                      {getGenderByNumber(
                                                        gender
                                                      )}
                                                    </span>
                                                  )}
                                                  {Object.keys(
                                                    skuAttributes || {}
                                                  ).map(attribute => (
                                                    <span key={attribute}>
                                                      {" "}
                                                      | {attribute}:{" "}
                                                      {skuAttributes
                                                        ? skuAttributes[
                                                            attribute
                                                          ]
                                                        : null}{" "}
                                                    </span>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                            {quantity && (
                                              <div className="table-row-item">
                                                <span className="in-stock">
                                                  {quantity}
                                                </span>
                                              </div>
                                            )}
                                            {productDisplayPrice && (
                                              <div className="table-row-item">
                                                {productDisplayPrice}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </UikWidgetContent>
                              )}
                              <UikWidgetContent className="order-info">
                                {paymentMethod && (
                                  <div className="order-info-child">
                                    <div className="label">Payment Method</div>
                                    <div>{paymentMethod}</div>
                                  </div>
                                )}
                                {shippingMethod && (
                                  <div className="order-info-child">
                                    <div className="label">Shipping Method</div>
                                    <div>{shippingMethod}</div>
                                  </div>
                                )}
                              </UikWidgetContent>
                              {shippingTrackingNumber && (
                                <UikWidgetContent>
                                  <div className="kv-table">
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-edge-aligned">
                                        <div className="kv-key-edge-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .orderTracking
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-edge-aligned">
                                        <div className="kv-value-edge-aligned">
                                          {shippingTrackingUrl ? (
                                            <a
                                              className="break-word"
                                              href={shippingTrackingUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              {shippingTrackingNumber}
                                            </a>
                                          ) : (
                                            shippingTrackingNumber
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </UikWidgetContent>
                              )}
                              <UikWidgetContent>
                                <div className="kv-table">
                                  {orderTotalDisplayPrice && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-edge-aligned">
                                        <div className="kv-key-edge-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .orderTotal
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-edge-aligned">
                                        <div className="kv-value-edge-aligned">
                                          {orderTotalDisplayPrice}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {shippingCostDisplayPrice && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-edge-aligned">
                                        <div className="kv-key-edge-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .orderShippingCost
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-edge-aligned">
                                        <div className="kv-value-edge-aligned">
                                          ({shippingCostDisplayPrice})
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {taxDisplayPrice && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-edge-aligned">
                                        <div className="kv-key-edge-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .orderTax
                                            }`
                                          )}{" "}
                                          {taxPercent && (
                                            <span>({taxPercent})</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-edge-aligned">
                                        <div className="kv-value-edge-aligned">
                                          ({taxDisplayPrice})
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {stripeFeeDisplayPrice && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-edge-aligned">
                                        <div className="kv-key-edge-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .orderStripe
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-edge-aligned">
                                        <div className="kv-value-edge-aligned">
                                          ({stripeFeeDisplayPrice})
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {vendorTotalDisplayPrice && (
                                    <div className="kv-table-row">
                                      <div className="kv-key-column-edge-aligned">
                                        <div className="kv-key-edge-aligned">
                                          {t(
                                            `${
                                              localeNamespaceKeys.orders.order
                                                ._name
                                            }.${
                                              localeNamespaceKeys.orders.order
                                                .orderTotalPayout
                                            }`
                                          )}
                                        </div>
                                      </div>
                                      <div className="kv-value-column-edge-aligned">
                                        <div className="kv-value-edge-aligned green-text total">
                                          {vendorTotalDisplayPrice}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </UikWidgetContent>
                            </UikWidget>
                          </div>
                        </div>

                        {/* BEGINNING OF PRINT INVOICE */}

                        <div
                          className="print-table"
                          ref={this.componentToPrintRef}
                        >
                          <UikHeadline className="headline headline-print">
                            <span>{order && order.stripeId}</span>
                            <StatusBadge
                              status={
                                (order && order.orderStatus) ||
                                OrderStatusFilters.PENDING
                              }
                            />
                          </UikHeadline>
                          <UikHeadlineDesc
                            Component="div"
                            className="order-details-headline-desc"
                          >
                            {orderTimestamp && <span>{orderTimestamp}</span>}
                          </UikHeadlineDesc>
                          <div className="print-section">
                            <div className="kv-table">
                              {customerName && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .customerName
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {customerName}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {customerEmail && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .customerEmail
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {customerEmail}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {internationalPhoneNumber && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .customerPhone
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {internationalPhoneNumber}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="kv-table">
                              {shippingAddress1 && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .shippingAddress1
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {shippingAddress1}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {shippingAddress2 && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .shippingAddress2
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {shippingAddress2}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {(shippingCity || shippingState) && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .shippingCity
                                        }`
                                      )}
                                      ,{" "}
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .shippingState
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {`${shippingCity}, ${shippingState}`}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {shippingZipCode && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .shippingZipCode
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {shippingZipCode}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {shippingCountry && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      Country
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {shippingCountry}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="kv-table">
                              {campaignLabel && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .campaignType
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {campaignLabel}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {campaignName && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .campaign
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {campaignName}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {!isEmpty(orderItems) && (
                              <div className="kv-table">
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      Products Sold
                                    </div>
                                  </div>
                                </div>
                                {orderItems.map(item => {
                                  const productName = item.sku.product.name;
                                  const gender = item.sku.product.gender;
                                  const skuAttributes = item.sku.attributes;
                                  const quantity = item.quantity;
                                  const basePrice = item.sku.basePrice;
                                  const salePrice = item.sku.salePrice;
                                  const productDisplayPrice = getItemTotalDisplayPrice(
                                    quantity,
                                    basePrice,
                                    salePrice
                                  );
                                  return (
                                    <React.Fragment key={item.id}>
                                      <div className="kv-table-row">
                                        <div className="kv-key-column-edge-aligned">
                                          <div className="kv-key-edge-aligned" />
                                        </div>
                                        <div className="kv-value-column-edge-aligned">
                                          <div className="kv-value-edge-aligned">
                                            <div className="order-product-info">
                                              <div>{productName}</div>
                                              {(gender || skuAttributes) && (
                                                <div className="subtext sku-attributes">
                                                  {gender && (
                                                    <span>
                                                      {getGenderByNumber(
                                                        gender
                                                      )}
                                                    </span>
                                                  )}
                                                  {Object.keys(
                                                    skuAttributes || {}
                                                  ).map(attribute => (
                                                    <span key={attribute}>
                                                      {" "}
                                                      | {attribute}:{" "}
                                                      {skuAttributes
                                                        ? skuAttributes[
                                                            attribute
                                                          ]
                                                        : null}{" "}
                                                    </span>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {quantity && (
                                        <div className="kv-table-row">
                                          <div className="kv-key-column-edge-aligned">
                                            <div className="kv-key-edge-aligned">
                                              Quantity
                                            </div>
                                          </div>
                                          <div className="kv-value-column-edge-aligned">
                                            <div className="kv-value-edge-aligned">
                                              <span className="in-stock">
                                                {quantity}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      {productDisplayPrice && (
                                        <div className="kv-table-row">
                                          <div className="kv-key-column-edge-aligned">
                                            <div className="kv-key-edge-aligned">
                                              Price
                                            </div>
                                          </div>
                                          <div className="kv-value-column-edge-aligned">
                                            <div className="kv-value-edge-aligned">
                                              {productDisplayPrice}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </div>
                            )}
                            <div className="kv-table">
                              {paymentMethod && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      Payment Method
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {paymentMethod}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {shippingMethod && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      Shipping Method
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {shippingMethod}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {shippingTrackingNumber && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .orderTracking
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {shippingTrackingUrl ? (
                                        <a
                                          className="break-word"
                                          href={shippingTrackingUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {shippingTrackingNumber}
                                        </a>
                                      ) : (
                                        shippingTrackingNumber
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="kv-table">
                              {orderTotalDisplayPrice && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .orderTotal
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      {orderTotalDisplayPrice}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {shippingCostDisplayPrice && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .orderShippingCost
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      ({shippingCostDisplayPrice})
                                    </div>
                                  </div>
                                </div>
                              )}
                              {taxDisplayPrice && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .orderTax
                                        }`
                                      )}{" "}
                                      {taxPercent && (
                                        <span>({taxPercent})</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      ({taxDisplayPrice})
                                    </div>
                                  </div>
                                </div>
                              )}
                              {stripeFeeDisplayPrice && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .orderStripe
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned">
                                      ({stripeFeeDisplayPrice})
                                    </div>
                                  </div>
                                </div>
                              )}
                              {vendorTotalDisplayPrice && (
                                <div className="kv-table-row">
                                  <div className="kv-key-column-edge-aligned">
                                    <div className="kv-key-edge-aligned">
                                      {t(
                                        `${
                                          localeNamespaceKeys.orders.order._name
                                        }.${
                                          localeNamespaceKeys.orders.order
                                            .orderTotalPayout
                                        }`
                                      )}
                                    </div>
                                  </div>
                                  <div className="kv-value-column-edge-aligned">
                                    <div className="kv-value-edge-aligned green-text total">
                                      {vendorTotalDisplayPrice}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </OrderComponent>
              </ErrorBoundary>
            </Layout>
          )
        }
      </NamespacesConsumer>
    );
  }
}

export default OrderDetails;
