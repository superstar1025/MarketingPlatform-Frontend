export type Maybe<T> = T | null;

export interface ConnectStripeAccountInput {
  domainId: string;

  authorizationCode: string;

  clientMutationId?: Maybe<string>;
}

export interface CreateDomainInput {
  label: string;

  freeShippingThreshold?: Maybe<number>;

  company?: Maybe<CreateCompanyInputObject>;

  payoutType?: Maybe<number>;

  paypalPayoutEmail?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface CreateCompanyInputObject {
  address?: Maybe<CreateCompanyAddressInputObject>;

  currency?: Maybe<string>;

  timeZone?: Maybe<string>;
}

export interface CreateCompanyAddressInputObject {
  address1: string;

  address2?: Maybe<string>;

  city: string;

  state?: Maybe<string>;

  zipCode: string;

  country: string;
}

export interface UpdateDomainInput {
  id: string;

  label?: Maybe<string>;

  freeShippingThreshold?: Maybe<number>;

  payoutType?: Maybe<number>;

  paypalPayoutEmail?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface RemoveFreeShippingThresholdInput {
  domainId: string;

  clientMutationId?: Maybe<string>;
}

export interface TransferDomainOwnershipInput {
  domainId: string;

  newOwnerId: string;

  clientMutationId?: Maybe<string>;
}

export interface UpdateCompanyInput {
  domainId: string;

  name?: Maybe<string>;

  email?: Maybe<string>;

  customerSupportNumber?: Maybe<string>;

  returnPolicy?: Maybe<string>;

  sizeGuide?: Maybe<string>;

  currency?: Maybe<string>;

  timeZone?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface UploadCompanyAvatarInput {
  domainId: string;

  image: Upload;

  clientMutationId?: Maybe<string>;
}

export interface CreateShippingLocationInput {
  domainId: string;

  shippingLocations: CreateShippingLocationInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface CreateShippingLocationInputObject {
  name: string;

  address1: string;

  address2?: Maybe<string>;

  city: string;

  state: string;

  zipCode: string;

  country: string;

  email?: Maybe<string>;

  phoneNumber?: Maybe<string>;
}

export interface UpdateShippingLocationInput {
  domainId: string;

  shippingLocations: UpdateShippingLocationInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface UpdateShippingLocationInputObject {
  id: string;

  name?: Maybe<string>;

  address1?: Maybe<string>;

  address2?: Maybe<string>;

  city?: Maybe<string>;

  state?: Maybe<string>;

  zipCode?: Maybe<string>;

  country?: Maybe<string>;

  email?: Maybe<string>;

  phoneNumber?: Maybe<string>;
}

export interface DeleteShippingLocationInput {
  domainId: string;

  shippingLocationIds: string[];

  clientMutationId?: Maybe<string>;
}

export interface CreateFlatRateShippingOptionInput {
  domainId: string;

  flatRateShippingOptions: CreateFlatRateInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface CreateFlatRateInputObject {
  label: string;

  value: number;
}

export interface UpdateFlatRateShippingOptionInput {
  domainId: string;

  flatRateShippingOptions: UpdateFlatRateInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface UpdateFlatRateInputObject {
  id: string;

  label?: Maybe<string>;

  value?: Maybe<number>;
}

export interface DeleteFlatRateShippingOptionInput {
  domainId: string;

  flatRateIds: string[];

  clientMutationId?: Maybe<string>;
}

export interface CreatePromotionInput {
  domainId: string;

  promotions: CreatePromotionInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface CreatePromotionInputObject {
  label: string;

  startDatetime: DateTimeScalar;

  endDatetime: DateTimeScalar;

  discountValue: number;

  discountType: number;
}

export interface DeletePromotionInput {
  domainId: string;

  promotionIds: string[];

  clientMutationId?: Maybe<string>;
}

export interface CreateCampaignInput {
  domainId: string;

  productId: string;

  type: number;

  name: string;

  shippingPreference: number;

  feedPlatform?: Maybe<number>;

  campaignTrackingPixelIds?: Maybe<string[]>;

  shipFromLocationId?: Maybe<string>;

  promotionId?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface CreateCampaignTrackingPixelInput {
  domainId: string;

  platform: number;

  pixel: string;

  clientMutationId?: Maybe<string>;
}

export interface AddCreditsInput {
  domainId: string;

  credits: number;

  clientMutationId?: Maybe<string>;
}

export interface CreateAddOnsInput {
  domainId: string;

  addOnPlanIds: string[];

  clientMutationId?: Maybe<string>;
}

export interface DeleteAddOnsInput {
  domainId: string;

  subscriptionIds: string[];

  clientMutationId?: Maybe<string>;
}

export interface AddPaymentCardsInput {
  domainId: string;

  sourceTokens: string[];

  defaultSourceToken?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface DeletePaymentCardsInput {
  domainId: string;

  cardIds: string[];

  clientMutationId?: Maybe<string>;
}

export interface SetDefaultPaymentCardInput {
  domainId: string;

  cardId: string;

  clientMutationId?: Maybe<string>;
}

export interface CreateOrderInput {
  domainId: string;

  stripeId: string;

  campaignIds: string[];

  tax?: Maybe<number>;

  shippingCost?: Maybe<number>;

  orderTotal: number;

  vendorTotal: number;

  currency?: Maybe<string>;

  paymentProcessor: string;

  paymentMethod?: Maybe<string>;

  customerName: string;

  customerEmail: string;

  customerPhoneNumber: string;

  shippingAddress1: string;

  shippingAddress2?: Maybe<string>;

  shippingCity: string;

  shippingState: string;

  shippingZipCode: string;

  shippingCountry?: Maybe<string>;

  shippingLabelUrl?: Maybe<string>;

  shippingTrackingNumber?: Maybe<string>;

  shippingTrackingUrl?: Maybe<string>;

  shippingEta?: Maybe<string>;

  shippingMethod?: Maybe<string>;

  packingSlipUrl?: Maybe<string>;

  skus: SkuInput[];

  clientMutationId?: Maybe<string>;
}

export interface SkuInput {
  stripeId: string;

  quantity: number;
}

export interface SendOrdersExportEmailInput {
  domainId: string;

  clientMutationId?: Maybe<string>;
}

export interface CreateProductInput {
  domainId: string;

  name: string;

  description?: Maybe<string>;

  gender?: Maybe<number>;

  attributes?: Maybe<AttributesInputObject[]>;

  htsCode?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface AttributesInputObject {
  attributeKey: string;

  attributeValues: string[];
}

export interface UpdateProductInput {
  domainId: string;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  name?: Maybe<string>;

  description?: Maybe<string>;

  gender?: Maybe<number>;

  htsCode?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateAttributesInput {
  domainId: string;

  productId?: Maybe<string>;

  stripeProductId?: Maybe<string>;

  renames?: Maybe<RenameAttributeKeyInput[]>;

  additions?: Maybe<AddAttributeInput[]>;

  clientMutationId?: Maybe<string>;
}

export interface RenameAttributeKeyInput {
  oldName: string;

  newName: string;
}

export interface AddAttributeInput {
  attributeKey: string;

  attributeValue?: Maybe<string>;
}

export interface UpdateProductAttributesInput {
  domainId: string;

  productId?: Maybe<string>;

  stripeProductId?: Maybe<string>;

  attributes: AttributesInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface DeleteAttributeInput {
  domainId: string;

  productId?: Maybe<string>;

  stripeProductId?: Maybe<string>;

  attributeKey: string;

  clientMutationId?: Maybe<string>;
}

export interface DeleteAttributeValueInput {
  domainId: string;

  productId?: Maybe<string>;

  stripeProductId?: Maybe<string>;

  attribute: AttributeInputObject;

  clientMutationId?: Maybe<string>;
}

export interface AttributeInputObject {
  attributeKey: string;

  attributeValue: string;
}

export interface UploadProductImageInput {
  domainId: string;

  productId: string;

  images: ProductImageInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface ProductImageInputObject {
  id?: Maybe<string>;

  image?: Maybe<Upload>;
}

export interface DeleteProductImageInput {
  domainId: string;

  productId: string;

  imageIds: string[];

  clientMutationId?: Maybe<string>;
}

export interface UploadSkuImageInput {
  domainId: string;

  skuId: string;

  image: Upload;

  clientMutationId?: Maybe<string>;
}

export interface CreateSkuInput {
  domainId: string;

  productId?: Maybe<string>;

  stripeProductId?: Maybe<string>;

  skus: CreateSkuInputObject[];

  clientMutationId?: Maybe<string>;
}

export interface CreateSkuInputObject {
  sku?: Maybe<string>;

  attributes?: Maybe<GenericScalar>;

  basePrice: number;

  salePrice?: Maybe<number>;

  quantity: number;

  unitOfWeight: number;

  weight: Decimal;

  unitOfDimensions: number;

  height: Decimal;

  width: Decimal;

  length: Decimal;
}

export interface CreateOrUpdateSkusInput {
  domainId: string;

  productId?: Maybe<string>;

  stripeProductId?: Maybe<string>;

  skus?: Maybe<CreateOrUpdateSkusInputObject[]>;

  clientMutationId?: Maybe<string>;
}

export interface CreateOrUpdateSkusInputObject {
  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  sku: string;

  attributes?: Maybe<GenericScalar>;

  basePrice: number;

  salePrice?: Maybe<number>;

  quantity: number;

  unitOfWeight: number;

  weight: Decimal;

  unitOfDimensions: number;

  height: Decimal;

  width: Decimal;

  length: Decimal;
}

export interface DeleteSkuInput {
  domainId: string;

  skus?: Maybe<RemoveSkuInputObject[]>;

  clientMutationId?: Maybe<string>;
}

export interface RemoveSkuInputObject {
  id?: Maybe<string>;

  stripeId?: Maybe<string>;
}

export interface ImportProductsInput {
  domainId: string;

  csvFile?: Maybe<Upload>;

  clientMutationId?: Maybe<string>;
}

export interface RegisterInput {
  user: RegisterUserInputObject;

  domain: RegisterDomainInputObject;

  clientMutationId?: Maybe<string>;
}

export interface RegisterUserInputObject {
  email: string;

  password: string;

  firstName: string;

  lastName: string;
}

export interface RegisterDomainInputObject {
  label: string;

  company?: Maybe<RegisterDomainCompanyInputObject>;
}

export interface RegisterDomainCompanyInputObject {
  address?: Maybe<RegisterDomainCompanyAddressInputObject>;

  currency?: Maybe<string>;
}

export interface RegisterDomainCompanyAddressInputObject {
  address1: string;

  address2?: Maybe<string>;

  city: string;

  state?: Maybe<string>;

  zipCode: string;

  country: string;
}

export interface RegisterFromInviteInput {
  user: RegisterUserInputObject;

  invitationToken: string;

  clientMutationId?: Maybe<string>;
}

export interface ResetPasswordInput {
  email: string;

  clientMutationId?: Maybe<string>;
}

export interface ResetPasswordConfirmInput {
  passwordResetToken: string;

  password: string;

  clientMutationId?: Maybe<string>;
}

export interface AddUserInput {
  domainId: string;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email: string;

  clientMutationId?: Maybe<string>;
}

export interface UpdateUserInput {
  domainId: string;

  id: string;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  clientMutationId?: Maybe<string>;
}

export interface RemoveUserFromDomainInput {
  domainId: string;

  id: string;

  clientMutationId?: Maybe<string>;
}

/** The `DateTime` scalar type represents a DateTime value as specified by [iso8601](https://en.wikipedia.org/wiki/ISO_8601). */
export type DateTime = any;

/** The `GenericScalar` scalar type represents a generic GraphQL scalar value that could be: String, Boolean, Int, Float, List or Object. */
export type GenericScalar = any;

export type DateTimeScalar = any;

/** Create scalar that ignores normal serialization/deserialization, since that will be handled by the multipart request spec */
export type Upload = any;

/** This Decimal Scalar Type represents a Python Decimal. */
export type Decimal = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface ElliotNode {
  /** The ID of the object. */
  id: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  /** The ID of the object */
  node?: Maybe<ElliotNode>;

  user?: Maybe<UserNode>;

  domains?: Maybe<DomainNodeConnection>;

  addOns?: Maybe<AddOnNodeConnection>;
}

export interface UserNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  password: string;

  lastLogin?: Maybe<DateTime>;
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: boolean;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;
  /** Designates whether this user should be treated as deactivated */
  deactivated?: Maybe<DateTime>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email: string;
  /** Designates whether the user can log into Django admin site */
  isStaff: boolean;

  passwordResetToken?: Maybe<string>;

  invitationToken?: Maybe<string>;

  domains?: Maybe<DomainNodeConnection>;

  ownedDomains?: Maybe<DomainNodeConnection>;
}

export interface DomainNodeConnection {
  pageInfo: PageInfo;

  edges: DomainNodeEdge[];
}

export interface PageInfo {
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean;
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<string>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<string>;
}

export interface DomainNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<DomainNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface DomainNode extends ElliotNode {
  createdOn: DateTime;

  modifiedOn: DateTime;
  /** The ID of the object. */
  id: string;
  /** Label for domain, used for bookkeeping purposes */
  label: string;

  freeShippingThreshold?: Maybe<number>;

  stripeCustomerId?: Maybe<string>;

  stripeLinksSiId?: Maybe<string>;
  /** User Id for connected Stripe account */
  stripeConnectUserId?: Maybe<string>;

  stripeCustomerEmail?: Maybe<string>;

  users?: Maybe<UserNodeConnection>;

  addOns?: Maybe<AddOn[]>;
  /** Token for enterprise domain */
  enterpriseToken?: Maybe<string>;

  payoutType?: Maybe<number>;

  paypalPayoutEmail?: Maybe<string>;

  owner: UserNode;

  company?: Maybe<CompanyNode>;

  shippingLocations?: Maybe<ShippingLocationNodeConnection>;

  flatRateShippingOptions?: Maybe<FlatRateShippingOptionNodeConnection>;

  promotions?: Maybe<PromotionNodeConnection>;

  orders?: Maybe<OrderNodeConnection>;

  orderSkus?: Maybe<OrderSkuNodeConnection>;

  products?: Maybe<ProductNodeConnection>;

  skus?: Maybe<SkuNodeConnection>;

  productImages?: Maybe<ProductImageNodeConnection>;

  campaigns?: Maybe<CampaignNodeConnection>;

  campaignTrackingPixels?: Maybe<CampaignTrackingPixelNodeConnection>;

  isEnterprise?: Maybe<boolean>;

  credits?: Maybe<number>;

  paymentCardCount?: Maybe<number>;

  defaultPaymentCard?: Maybe<PaymentCard>;

  paymentCards?: Maybe<PaymentCard[]>;

  invoices?: Maybe<Invoice[]>;

  addOnPlans?: Maybe<AddOnPlan[]>;

  ordersMetricsOneWeek?: Maybe<OrdersMetrics>;

  ordersMetricsOneMonth?: Maybe<OrdersMetrics>;

  ordersMetricsOneYear?: Maybe<OrdersMetrics>;
}

export interface UserNodeConnection {
  pageInfo: PageInfo;

  edges: UserNodeEdge[];
}

export interface UserNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface AddOn {
  subscriptionId?: Maybe<string>;

  planId?: Maybe<string>;

  name?: Maybe<string>;
}

export interface CompanyNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  timeZone?: Maybe<string>;

  name: string;

  email: string;
  /** Address of Company */
  address?: Maybe<ShippingLocationNode>;

  customerSupportNumber?: Maybe<string>;

  currency: string;

  returnPolicy?: Maybe<string>;

  sizeGuide?: Maybe<string>;
  /** URL of the image */
  avatar?: Maybe<string>;
}

export interface ShippingLocationNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  name: string;

  address1?: Maybe<string>;

  address2?: Maybe<string>;

  city?: Maybe<string>;

  state?: Maybe<string>;

  zipCode?: Maybe<string>;

  country?: Maybe<string>;

  email?: Maybe<string>;

  phoneNumber?: Maybe<string>;
  /** Domain that this shipping location belongs to */
  domain: DomainNode;

  companies?: Maybe<CompanyNodeConnection>;

  campaigns?: Maybe<CampaignNodeConnection>;
}

export interface CompanyNodeConnection {
  pageInfo: PageInfo;

  edges: CompanyNodeEdge[];
}

export interface CompanyNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<CompanyNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface CampaignNodeConnection {
  pageInfo: PageInfo;

  edges: CampaignNodeEdge[];
}

export interface CampaignNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<CampaignNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface CampaignNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;
  /** Designates whether this campaign should be treated as deactivated */
  deactivated?: Maybe<DateTime>;
  /** Type of campaign (buy now link or QR code) */
  type: number;

  name: string;

  shippingPreference: number;
  /** Location from which the product from this campaign will ship from */
  shipFromLocation?: Maybe<ShippingLocationNode>;
  /** Promotion that belongs to this campaign */
  promotion?: Maybe<PromotionNode>;
  /** Product that this campaign is associated with */
  product: ProductNode;
  /** Domain that this campaign belongs to */
  domain: DomainNode;

  feedPlatform?: Maybe<number>;

  campaignTrackingPixels?: Maybe<CampaignTrackingPixelNodeConnection>;

  orders?: Maybe<OrderNodeConnection>;
}

export interface PromotionNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  label: string;

  stripeCouponCode: string;

  startDatetime: DateTime;

  endDatetime: DateTime;

  discountValue: number;

  discountType: number;
  /** Domain that this promotion belongs to */
  domain: DomainNode;

  campaigns?: Maybe<CampaignNodeConnection>;
}

export interface ProductNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;
  /** Stripe ID for product */
  stripeId: string;
  /** Name of product */
  name: string;

  description?: Maybe<string>;

  gender?: Maybe<number>;
  /** Designates whether this product is taxable */
  isTaxable: boolean;

  htsCode?: Maybe<string>;
  /** Domain that this product belongs to */
  domain: DomainNode;

  skus?: Maybe<SkuNodeConnection>;

  images?: Maybe<ProductImageNodeConnection>;

  campaigns?: Maybe<CampaignNodeConnection>;

  attributes?: Maybe<GenericScalar>;

  quantity?: Maybe<number>;

  activeCampaignCount?: Maybe<number>;

  variantCount?: Maybe<number>;

  skuCount?: Maybe<number>;
}

export interface SkuNodeConnection {
  pageInfo: PageInfo;

  edges: SkuNodeEdge[];
}

export interface SkuNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<SkuNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface SkuNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;
  /** Stripe ID for SKU */
  stripeId: string;
  /** Designates whether this SKU should be treated as deactivated */
  deactivated?: Maybe<DateTime>;
  /** SKU value */
  sku?: Maybe<string>;

  quantity?: Maybe<number>;
  /** Base price of SKU in smallest currency unit */
  basePrice: number;
  /** Sale Price of SKU in smallest currency unit */
  salePrice?: Maybe<number>;
  /** Currency of base price or sale price of SKU */
  currency: string;
  /** Unit of weight for SKU */
  unitOfWeight?: Maybe<number>;
  /** Weight of SKU */
  weight?: Maybe<number>;
  /** Unit of dimensions for SKU */
  unitOfDimensions?: Maybe<number>;
  /** Height of SKU */
  height?: Maybe<number>;
  /** Width of SKU */
  width?: Maybe<number>;
  /** Length of SKU */
  length?: Maybe<number>;
  /** Product that this SKU belongs to */
  product: ProductNode;
  /** Domain that this SKU belongs to */
  domain: DomainNode;
  /** URL of the image */
  image?: Maybe<string>;

  orders?: Maybe<OrderNodeConnection>;

  orderSkus?: Maybe<OrderSkuNodeConnection>;

  attributes?: Maybe<GenericScalar>;
}

export interface OrderNodeConnection {
  pageInfo: PageInfo;

  edges: OrderNodeEdge[];
}

export interface OrderNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<OrderNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface OrderNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;
  /** Stripe ID for order */
  stripeId: string;

  orderStatus: number;
  /** Tax for order */
  tax: number;
  /** Shipping cost for order */
  shippingCost: number;
  /** Total order amount */
  orderTotal: number;
  /** Total amount that vendor receives */
  vendorTotal: number;
  /** Currency of order total */
  currency: string;

  paymentProcessor: string;

  paymentMethod?: Maybe<string>;
  /** Designates whether the order has been refunded */
  refundStatus: boolean;

  customerName: string;

  customerEmail: string;

  customerPhoneNumber: string;

  shippingAddress1: string;

  shippingAddress2?: Maybe<string>;

  shippingCity: string;

  shippingState: string;

  shippingZipCode: string;

  shippingCountry: string;

  shippingLabelUrl?: Maybe<string>;

  shippingTrackingNumber?: Maybe<string>;

  shippingTrackingUrl?: Maybe<string>;

  shippingEta?: Maybe<string>;

  shippingMethod?: Maybe<string>;

  packingSlipUrl?: Maybe<string>;

  skus?: Maybe<SkuNodeConnection>;

  campaigns?: Maybe<CampaignNodeConnection>;

  domain: DomainNode;

  orderSkus?: Maybe<OrderSkuNodeConnection>;

  items?: Maybe<OrderSkuNode[]>;
}

export interface OrderSkuNodeConnection {
  pageInfo: PageInfo;

  edges: OrderSkuNodeEdge[];
}

export interface OrderSkuNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<OrderSkuNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface OrderSkuNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  order: OrderNode;

  sku: SkuNode;

  quantity: number;

  domain: DomainNode;
}

export interface ProductImageNodeConnection {
  pageInfo: PageInfo;

  edges: ProductImageNodeEdge[];
}

export interface ProductImageNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<ProductImageNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface ProductImageNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;
  /** URL of the image */
  image: string;
  /** Position of ordering for this image */
  orderingPosition?: Maybe<number>;
  /** Product this image is associated with */
  product: ProductNode;
  /** Domain that this product belongs to */
  domain: DomainNode;
}

export interface CampaignTrackingPixelNodeConnection {
  pageInfo: PageInfo;

  edges: CampaignTrackingPixelNodeEdge[];
}

export interface CampaignTrackingPixelNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<CampaignTrackingPixelNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface CampaignTrackingPixelNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;
  /** Type of campaign (buy now link or QR code) */
  platform: number;

  pixel: string;
  /** Domain that this tracking pixel belongs to */
  domain: DomainNode;

  campaigns?: Maybe<CampaignNodeConnection>;
}

export interface ShippingLocationNodeConnection {
  pageInfo: PageInfo;

  edges: ShippingLocationNodeEdge[];
}

export interface ShippingLocationNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<ShippingLocationNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface FlatRateShippingOptionNodeConnection {
  pageInfo: PageInfo;

  edges: FlatRateShippingOptionNodeEdge[];
}

export interface FlatRateShippingOptionNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<FlatRateShippingOptionNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface FlatRateShippingOptionNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  label: string;

  value: number;
  /** Domain that this flat rate shipping option belongs to */
  domain: DomainNode;
}

export interface PromotionNodeConnection {
  pageInfo: PageInfo;

  edges: PromotionNodeEdge[];
}

export interface PromotionNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<PromotionNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface ProductNodeConnection {
  pageInfo: PageInfo;

  edges: ProductNodeEdge[];
}

export interface ProductNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<ProductNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface PaymentCard {
  id?: Maybe<string>;

  brand?: Maybe<string>;

  last4?: Maybe<string>;
}

export interface Invoice {
  id?: Maybe<string>;

  startDatetime?: Maybe<DateTimeScalar>;

  endDatetime?: Maybe<DateTimeScalar>;

  url?: Maybe<string>;
}

export interface AddOnPlan {
  id?: Maybe<string>;

  name?: Maybe<string>;

  amount?: Maybe<number>;
}

export interface OrdersMetrics {
  previousMetrics?: Maybe<Metrics>;

  currentMetrics?: Maybe<Metrics>;
}

export interface Metrics {
  ordersRevenue?: Maybe<number>;

  averageOrderValue?: Maybe<number>;

  numOrders?: Maybe<number>;

  timeToPurchase?: Maybe<number>;

  graphMetrics?: Maybe<number[]>;
}

export interface AddOnNodeConnection {
  pageInfo: PageInfo;

  edges: AddOnNodeEdge[];
}

export interface AddOnNodeEdge {
  /** The item at the end of the edge */
  node?: Maybe<AddOnNode>;
  /** A cursor for use in pagination */
  cursor: string;
}

export interface AddOnNode extends ElliotNode {
  /** The ID of the object. */
  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  name: string;

  stripePlanId: string;

  domains?: Maybe<DomainNodeConnection>;
}

export interface Mutation {
  tokenAuth?: Maybe<ObtainJsonWebToken>;

  verifyToken?: Maybe<Verify>;

  refreshToken?: Maybe<Refresh>;

  connectStripeAccount?: Maybe<ConnectStripeAccountPayload>;

  createDomain?: Maybe<CreateDomainPayload>;

  updateDomain?: Maybe<UpdateDomainPayload>;

  removeFreeShippingThreshold?: Maybe<RemoveFreeShippingThresholdPayload>;

  transferDomainOwnership?: Maybe<TransferDomainOwnershipPayload>;

  updateCompany?: Maybe<UpdateCompanyPayload>;

  uploadCompanyAvatar?: Maybe<UploadCompanyAvatarPayload>;

  createShippingLocation?: Maybe<CreateShippingLocationPayload>;

  updateShippingLocation?: Maybe<UpdateShippingLocationPayload>;

  deleteShippingLocation?: Maybe<DeleteShippingLocationPayload>;

  createFlatRateShippingOption?: Maybe<CreateFlatRateShippingOptionPayload>;

  updateFlatRateShippingOption?: Maybe<UpdateFlatRateShippingOptionPayload>;

  deleteFlatRateShippingOption?: Maybe<DeleteFlatRateShippingOptionPayload>;

  createPromotion?: Maybe<CreatePromotionPayload>;

  deletePromotion?: Maybe<DeletePromotionPayload>;

  createCampaign?: Maybe<CreateCampaignPayload>;

  createCampaignTrackingPixel?: Maybe<CreateCampaignTrackingPixelPayload>;

  addCredits?: Maybe<AddCreditsPayload>;

  createAddOns?: Maybe<CreateAddOnsPayload>;

  deleteAddOns?: Maybe<DeleteAddOnsPayload>;

  addPaymentCards?: Maybe<AddPaymentCardsPayload>;

  deletePaymentCards?: Maybe<DeletePaymentCardsPayload>;

  setDefaultPaymentCard?: Maybe<SetDefaultPaymentCardPayload>;

  createOrder?: Maybe<CreateOrderPayload>;

  sendOrdersExportEmail?: Maybe<SendOrdersExportEmailPayload>;

  createProduct?: Maybe<CreateProductPayload>;

  updateProduct?: Maybe<UpdateProductPayload>;

  updateAttributes?: Maybe<UpdateAttributesPayload>;

  updateProductAttributes?: Maybe<UpdateProductAttributesPayload>;

  deleteAttribute?: Maybe<DeleteAttributePayload>;

  deleteAttributeValue?: Maybe<DeleteAttributeValuePayload>;

  uploadProductImage?: Maybe<UploadProductImagePayload>;

  deleteProductImage?: Maybe<DeleteProductImagePayload>;

  uploadSkuImage?: Maybe<UploadSkuImagePayload>;

  createSku?: Maybe<CreateSkuPayload>;

  createOrUpdateSkus?: Maybe<CreateOrUpdateSkusPayload>;

  deleteSku?: Maybe<DeleteSkuPayload>;

  importProducts?: Maybe<ImportProductsPayload>;

  register?: Maybe<RegisterPayload>;

  registerFromInvite?: Maybe<RegisterFromInvitePayload>;

  resetPassword?: Maybe<ResetPasswordPayload>;

  resetPasswordConfirm?: Maybe<ResetPasswordConfirmPayload>;

  addUser?: Maybe<AddUserPayload>;

  updateUser?: Maybe<UpdateUserPayload>;

  removeUserFromDomain?: Maybe<RemoveUserFromDomainPayload>;
}

/** Obtain JSON Web Token mutation */
export interface ObtainJsonWebToken {
  token?: Maybe<string>;
}

export interface Verify {
  payload?: Maybe<GenericScalar>;
}

export interface Refresh {
  token?: Maybe<string>;

  payload?: Maybe<GenericScalar>;
}

export interface ConnectStripeAccountPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface CreateDomainPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateDomainPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface RemoveFreeShippingThresholdPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface TransferDomainOwnershipPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateCompanyPayload {
  company?: Maybe<CompanyNode>;

  clientMutationId?: Maybe<string>;
}

export interface UploadCompanyAvatarPayload {
  company?: Maybe<CompanyNode>;

  clientMutationId?: Maybe<string>;
}

export interface CreateShippingLocationPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateShippingLocationPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface DeleteShippingLocationPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface CreateFlatRateShippingOptionPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateFlatRateShippingOptionPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface DeleteFlatRateShippingOptionPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface CreatePromotionPayload {
  promotions?: Maybe<PromotionNode[]>;

  clientMutationId?: Maybe<string>;
}

export interface DeletePromotionPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface CreateCampaignPayload {
  campaign?: Maybe<CampaignNode>;

  clientMutationId?: Maybe<string>;
}

export interface CreateCampaignTrackingPixelPayload {
  campaignTrackingPixel?: Maybe<CampaignTrackingPixelNode>;

  clientMutationId?: Maybe<string>;
}

export interface AddCreditsPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface CreateAddOnsPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface DeleteAddOnsPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface AddPaymentCardsPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface DeletePaymentCardsPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface SetDefaultPaymentCardPayload {
  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface CreateOrderPayload {
  order?: Maybe<OrderNode>;

  clientMutationId?: Maybe<string>;
}

export interface SendOrdersExportEmailPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface CreateProductPayload {
  product?: Maybe<ProductNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateProductPayload {
  product?: Maybe<ProductNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateAttributesPayload {
  product?: Maybe<ProductNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateProductAttributesPayload {
  product?: Maybe<ProductNode>;

  clientMutationId?: Maybe<string>;
}

export interface DeleteAttributePayload {
  product?: Maybe<ProductNode>;

  clientMutationId?: Maybe<string>;
}

export interface DeleteAttributeValuePayload {
  product?: Maybe<ProductNode>;

  clientMutationId?: Maybe<string>;
}

export interface UploadProductImagePayload {
  product?: Maybe<ProductNode>;

  clientMutationId?: Maybe<string>;
}

export interface DeleteProductImagePayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface UploadSkuImagePayload {
  sku?: Maybe<SkuNode>;

  clientMutationId?: Maybe<string>;
}

export interface CreateSkuPayload {
  skus?: Maybe<SkuNode[]>;

  clientMutationId?: Maybe<string>;
}

export interface CreateOrUpdateSkusPayload {
  skus?: Maybe<SkuNode[]>;

  clientMutationId?: Maybe<string>;
}

export interface DeleteSkuPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface ImportProductsPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

export interface RegisterPayload {
  user?: Maybe<UserNode>;

  domain?: Maybe<DomainNode>;

  clientMutationId?: Maybe<string>;
}

export interface RegisterFromInvitePayload {
  user?: Maybe<UserNode>;

  clientMutationId?: Maybe<string>;
}

export interface ResetPasswordPayload {
  user?: Maybe<UserNode>;

  clientMutationId?: Maybe<string>;
}

export interface ResetPasswordConfirmPayload {
  user?: Maybe<UserNode>;

  clientMutationId?: Maybe<string>;
}

export interface AddUserPayload {
  user?: Maybe<UserNode>;

  clientMutationId?: Maybe<string>;
}

export interface UpdateUserPayload {
  user?: Maybe<UserNode>;

  clientMutationId?: Maybe<string>;
}

export interface RemoveUserFromDomainPayload {
  success?: Maybe<boolean>;

  clientMutationId?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface NodeQueryArgs {
  id: string;
}
export interface DomainsQueryArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  id?: Maybe<string>;

  label?: Maybe<string>;

  label_Icontains?: Maybe<string>;

  freeShippingThreshold?: Maybe<number>;

  freeShippingThreshold_Gte?: Maybe<number>;

  freeShippingThreshold_Lte?: Maybe<number>;

  stripeCustomerId?: Maybe<string>;

  stripeCustomerId_Icontains?: Maybe<string>;

  stripeLinksSiId?: Maybe<string>;

  stripeLinksSiId_Icontains?: Maybe<string>;

  stripeConnectUserId?: Maybe<string>;

  stripeConnectUserId_Icontains?: Maybe<string>;

  stripeCustomerEmail?: Maybe<string>;

  stripeCustomerEmail_Icontains?: Maybe<string>;

  payoutType?: Maybe<number>;

  paypalPayoutEmail?: Maybe<string>;

  paypalPayoutEmail_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface AddOnsQueryArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  name?: Maybe<string>;

  name_Icontains?: Maybe<string>;

  stripePlanId?: Maybe<string>;

  stripePlanId_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface DomainsUserNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  id?: Maybe<string>;

  label?: Maybe<string>;

  label_Icontains?: Maybe<string>;

  freeShippingThreshold?: Maybe<number>;

  freeShippingThreshold_Gte?: Maybe<number>;

  freeShippingThreshold_Lte?: Maybe<number>;

  stripeCustomerId?: Maybe<string>;

  stripeCustomerId_Icontains?: Maybe<string>;

  stripeLinksSiId?: Maybe<string>;

  stripeLinksSiId_Icontains?: Maybe<string>;

  stripeConnectUserId?: Maybe<string>;

  stripeConnectUserId_Icontains?: Maybe<string>;

  stripeCustomerEmail?: Maybe<string>;

  stripeCustomerEmail_Icontains?: Maybe<string>;

  payoutType?: Maybe<number>;

  paypalPayoutEmail?: Maybe<string>;

  paypalPayoutEmail_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface OwnedDomainsUserNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface UsersDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  email?: Maybe<string>;

  email_Icontains?: Maybe<string>;

  firstName?: Maybe<string>;

  firstName_Icontains?: Maybe<string>;

  lastName?: Maybe<string>;

  lastName_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface ShippingLocationsDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  id?: Maybe<string>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  name?: Maybe<string>;

  name_Icontains?: Maybe<string>;

  address1?: Maybe<string>;

  address1_Icontains?: Maybe<string>;

  address2?: Maybe<string>;

  address2_Icontains?: Maybe<string>;

  city?: Maybe<string>;

  city_Icontains?: Maybe<string>;

  state?: Maybe<string>;

  zipCode?: Maybe<string>;

  country?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface FlatRateShippingOptionsDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  id?: Maybe<string>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  label?: Maybe<string>;

  label_Icontains?: Maybe<string>;

  value?: Maybe<number>;

  value_Icontains?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface PromotionsDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  id?: Maybe<string>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  startDatetime?: Maybe<DateTime>;

  endDatetime?: Maybe<DateTime>;

  discountValue?: Maybe<number>;

  discountValue_Lte?: Maybe<number>;

  discountValue_Gte?: Maybe<number>;

  discountType?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface OrdersDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  stripeId_Icontains?: Maybe<string>;

  orderStatus?: Maybe<number>;

  tax?: Maybe<number>;

  tax_Lte?: Maybe<number>;

  tax_Gte?: Maybe<number>;

  shippingCost?: Maybe<number>;

  shippingCost_Lte?: Maybe<number>;

  shippingCost_Gte?: Maybe<number>;

  orderTotal?: Maybe<number>;

  orderTotal_Lte?: Maybe<number>;

  orderTotal_Gte?: Maybe<number>;

  paymentProcessor?: Maybe<string>;

  paymentProcessor_Icontains?: Maybe<string>;

  paymentMethod?: Maybe<string>;

  paymentMethod_Icontains?: Maybe<string>;

  refundStatus?: Maybe<boolean>;

  customerName?: Maybe<string>;

  customerName_Icontains?: Maybe<string>;

  customerEmail?: Maybe<string>;

  customerEmail_Icontains?: Maybe<string>;

  customerPhoneNumber?: Maybe<string>;

  customerPhoneNumber_Icontains?: Maybe<string>;

  shippingAddress1?: Maybe<string>;

  shippingAddress1_Icontains?: Maybe<string>;

  shippingAddress2?: Maybe<string>;

  shippingAddress2_Icontains?: Maybe<string>;

  shippingCity?: Maybe<string>;

  shippingCity_Icontains?: Maybe<string>;

  shippingState?: Maybe<string>;

  shippingState_Icontains?: Maybe<string>;

  shippingZipCode?: Maybe<string>;

  shippingZipCode_Icontains?: Maybe<string>;

  shippingCountry?: Maybe<string>;

  shippingCountry_Icontains?: Maybe<string>;

  shippingLabelUrl?: Maybe<string>;

  shippingLabelUrl_Icontains?: Maybe<string>;

  shippingTrackingNumber?: Maybe<string>;

  shippingTrackingNumber_Icontains?: Maybe<string>;

  shippingTrackingUrl?: Maybe<string>;

  shippingTrackingUrl_Icontains?: Maybe<string>;

  shippingEta?: Maybe<string>;

  shippingEta_Icontains?: Maybe<string>;

  shippingMethod?: Maybe<string>;

  shippingMethod_Icontains?: Maybe<string>;

  packingSlipUrl?: Maybe<string>;

  packingSlipUrl_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface OrderSkusDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface ProductsDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  stripeId_Icontains?: Maybe<string>;

  name?: Maybe<string>;

  name_Icontains?: Maybe<string>;

  description?: Maybe<string>;

  description_Icontains?: Maybe<string>;

  gender?: Maybe<number>;

  htsCode?: Maybe<string>;

  htsCode_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface SkusDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  stripeId_Icontains?: Maybe<string>;

  deactivated?: Maybe<DateTime>;

  deactivated_Icontains?: Maybe<DateTime>;

  sku?: Maybe<string>;

  sku_Icontains?: Maybe<string>;

  quantity?: Maybe<number>;

  quantity_Lte?: Maybe<number>;

  quantity_Gte?: Maybe<number>;

  basePrice?: Maybe<number>;

  basePrice_Lte?: Maybe<number>;

  basePrice_Gte?: Maybe<number>;

  salePrice?: Maybe<number>;

  salePrice_Lte?: Maybe<number>;

  salePrice_Gte?: Maybe<number>;

  unitOfWeight?: Maybe<number>;

  unitOfWeight_Icontains?: Maybe<number>;

  weight?: Maybe<number>;

  weight_Lte?: Maybe<number>;

  weight_Gte?: Maybe<number>;

  unitOfDimensions?: Maybe<number>;

  unitOfDimensions_Icontains?: Maybe<number>;

  height?: Maybe<number>;

  height_Lte?: Maybe<number>;

  height_Gte?: Maybe<number>;

  width?: Maybe<number>;

  width_Lte?: Maybe<number>;

  width_Gte?: Maybe<number>;

  length?: Maybe<number>;

  length_Lte?: Maybe<number>;

  length_Gte?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface ProductImagesDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  orderingPosition?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface CampaignsDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  deactivated?: Maybe<DateTime>;

  type?: Maybe<number>;

  name?: Maybe<string>;

  name_Icontains?: Maybe<string>;

  shippingPreference?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface CampaignTrackingPixelsDomainNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  platform?: Maybe<number>;

  pixel?: Maybe<string>;
}
export interface CompaniesShippingLocationNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface CampaignsShippingLocationNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface CampaignTrackingPixelsCampaignNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  platform?: Maybe<number>;

  pixel?: Maybe<string>;
}
export interface OrdersCampaignNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  stripeId_Icontains?: Maybe<string>;

  orderStatus?: Maybe<number>;

  tax?: Maybe<number>;

  tax_Lte?: Maybe<number>;

  tax_Gte?: Maybe<number>;

  shippingCost?: Maybe<number>;

  shippingCost_Lte?: Maybe<number>;

  shippingCost_Gte?: Maybe<number>;

  orderTotal?: Maybe<number>;

  orderTotal_Lte?: Maybe<number>;

  orderTotal_Gte?: Maybe<number>;

  paymentProcessor?: Maybe<string>;

  paymentProcessor_Icontains?: Maybe<string>;

  paymentMethod?: Maybe<string>;

  paymentMethod_Icontains?: Maybe<string>;

  refundStatus?: Maybe<boolean>;

  customerName?: Maybe<string>;

  customerName_Icontains?: Maybe<string>;

  customerEmail?: Maybe<string>;

  customerEmail_Icontains?: Maybe<string>;

  customerPhoneNumber?: Maybe<string>;

  customerPhoneNumber_Icontains?: Maybe<string>;

  shippingAddress1?: Maybe<string>;

  shippingAddress1_Icontains?: Maybe<string>;

  shippingAddress2?: Maybe<string>;

  shippingAddress2_Icontains?: Maybe<string>;

  shippingCity?: Maybe<string>;

  shippingCity_Icontains?: Maybe<string>;

  shippingState?: Maybe<string>;

  shippingState_Icontains?: Maybe<string>;

  shippingZipCode?: Maybe<string>;

  shippingZipCode_Icontains?: Maybe<string>;

  shippingCountry?: Maybe<string>;

  shippingCountry_Icontains?: Maybe<string>;

  shippingLabelUrl?: Maybe<string>;

  shippingLabelUrl_Icontains?: Maybe<string>;

  shippingTrackingNumber?: Maybe<string>;

  shippingTrackingNumber_Icontains?: Maybe<string>;

  shippingTrackingUrl?: Maybe<string>;

  shippingTrackingUrl_Icontains?: Maybe<string>;

  shippingEta?: Maybe<string>;

  shippingEta_Icontains?: Maybe<string>;

  shippingMethod?: Maybe<string>;

  shippingMethod_Icontains?: Maybe<string>;

  packingSlipUrl?: Maybe<string>;

  packingSlipUrl_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface CampaignsPromotionNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface SkusProductNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  stripeId_Icontains?: Maybe<string>;

  deactivated?: Maybe<DateTime>;

  deactivated_Icontains?: Maybe<DateTime>;

  sku?: Maybe<string>;

  sku_Icontains?: Maybe<string>;

  quantity?: Maybe<number>;

  quantity_Lte?: Maybe<number>;

  quantity_Gte?: Maybe<number>;

  basePrice?: Maybe<number>;

  basePrice_Lte?: Maybe<number>;

  basePrice_Gte?: Maybe<number>;

  salePrice?: Maybe<number>;

  salePrice_Lte?: Maybe<number>;

  salePrice_Gte?: Maybe<number>;

  unitOfWeight?: Maybe<number>;

  unitOfWeight_Icontains?: Maybe<number>;

  weight?: Maybe<number>;

  weight_Lte?: Maybe<number>;

  weight_Gte?: Maybe<number>;

  unitOfDimensions?: Maybe<number>;

  unitOfDimensions_Icontains?: Maybe<number>;

  height?: Maybe<number>;

  height_Lte?: Maybe<number>;

  height_Gte?: Maybe<number>;

  width?: Maybe<number>;

  width_Lte?: Maybe<number>;

  width_Gte?: Maybe<number>;

  length?: Maybe<number>;

  length_Lte?: Maybe<number>;

  length_Gte?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface ImagesProductNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  orderingPosition?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface CampaignsProductNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  deactivated?: Maybe<DateTime>;

  type?: Maybe<number>;

  name?: Maybe<string>;

  name_Icontains?: Maybe<string>;

  shippingPreference?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface SkuCountProductNodeArgs {
  attributeKey?: Maybe<string>;

  attributeValue?: Maybe<string>;
}
export interface OrdersSkuNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  stripeId_Icontains?: Maybe<string>;

  orderStatus?: Maybe<number>;

  tax?: Maybe<number>;

  tax_Lte?: Maybe<number>;

  tax_Gte?: Maybe<number>;

  shippingCost?: Maybe<number>;

  shippingCost_Lte?: Maybe<number>;

  shippingCost_Gte?: Maybe<number>;

  orderTotal?: Maybe<number>;

  orderTotal_Lte?: Maybe<number>;

  orderTotal_Gte?: Maybe<number>;

  paymentProcessor?: Maybe<string>;

  paymentProcessor_Icontains?: Maybe<string>;

  paymentMethod?: Maybe<string>;

  paymentMethod_Icontains?: Maybe<string>;

  refundStatus?: Maybe<boolean>;

  customerName?: Maybe<string>;

  customerName_Icontains?: Maybe<string>;

  customerEmail?: Maybe<string>;

  customerEmail_Icontains?: Maybe<string>;

  customerPhoneNumber?: Maybe<string>;

  customerPhoneNumber_Icontains?: Maybe<string>;

  shippingAddress1?: Maybe<string>;

  shippingAddress1_Icontains?: Maybe<string>;

  shippingAddress2?: Maybe<string>;

  shippingAddress2_Icontains?: Maybe<string>;

  shippingCity?: Maybe<string>;

  shippingCity_Icontains?: Maybe<string>;

  shippingState?: Maybe<string>;

  shippingState_Icontains?: Maybe<string>;

  shippingZipCode?: Maybe<string>;

  shippingZipCode_Icontains?: Maybe<string>;

  shippingCountry?: Maybe<string>;

  shippingCountry_Icontains?: Maybe<string>;

  shippingLabelUrl?: Maybe<string>;

  shippingLabelUrl_Icontains?: Maybe<string>;

  shippingTrackingNumber?: Maybe<string>;

  shippingTrackingNumber_Icontains?: Maybe<string>;

  shippingTrackingUrl?: Maybe<string>;

  shippingTrackingUrl_Icontains?: Maybe<string>;

  shippingEta?: Maybe<string>;

  shippingEta_Icontains?: Maybe<string>;

  shippingMethod?: Maybe<string>;

  shippingMethod_Icontains?: Maybe<string>;

  packingSlipUrl?: Maybe<string>;

  packingSlipUrl_Icontains?: Maybe<string>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface OrderSkusSkuNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface SkusOrderNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  stripeId?: Maybe<string>;

  stripeId_Icontains?: Maybe<string>;

  deactivated?: Maybe<DateTime>;

  deactivated_Icontains?: Maybe<DateTime>;

  sku?: Maybe<string>;

  sku_Icontains?: Maybe<string>;

  quantity?: Maybe<number>;

  quantity_Lte?: Maybe<number>;

  quantity_Gte?: Maybe<number>;

  basePrice?: Maybe<number>;

  basePrice_Lte?: Maybe<number>;

  basePrice_Gte?: Maybe<number>;

  salePrice?: Maybe<number>;

  salePrice_Lte?: Maybe<number>;

  salePrice_Gte?: Maybe<number>;

  unitOfWeight?: Maybe<number>;

  unitOfWeight_Icontains?: Maybe<number>;

  weight?: Maybe<number>;

  weight_Lte?: Maybe<number>;

  weight_Gte?: Maybe<number>;

  unitOfDimensions?: Maybe<number>;

  unitOfDimensions_Icontains?: Maybe<number>;

  height?: Maybe<number>;

  height_Lte?: Maybe<number>;

  height_Gte?: Maybe<number>;

  width?: Maybe<number>;

  width_Lte?: Maybe<number>;

  width_Gte?: Maybe<number>;

  length?: Maybe<number>;

  length_Lte?: Maybe<number>;

  length_Gte?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface CampaignsOrderNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  deactivated?: Maybe<DateTime>;

  type?: Maybe<number>;

  name?: Maybe<string>;

  name_Icontains?: Maybe<string>;

  shippingPreference?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface OrderSkusOrderNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface CampaignsCampaignTrackingPixelNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;

  createdOn?: Maybe<DateTime>;

  createdOn_Lte?: Maybe<DateTime>;

  createdOn_Gte?: Maybe<DateTime>;

  modifiedOn?: Maybe<DateTime>;

  modifiedOn_Lte?: Maybe<DateTime>;

  modifiedOn_Gte?: Maybe<DateTime>;

  id?: Maybe<string>;

  deactivated?: Maybe<DateTime>;

  type?: Maybe<number>;

  name?: Maybe<string>;

  name_Icontains?: Maybe<string>;

  shippingPreference?: Maybe<number>;
  /** Ordering */
  orderBy?: Maybe<string>;
}
export interface DomainsAddOnNodeArgs {
  before?: Maybe<string>;

  after?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface TokenAuthMutationArgs {
  email: string;

  password: string;
}
export interface VerifyTokenMutationArgs {
  token: string;
}
export interface RefreshTokenMutationArgs {
  token: string;
}
export interface ConnectStripeAccountMutationArgs {
  input: ConnectStripeAccountInput;
}
export interface CreateDomainMutationArgs {
  input: CreateDomainInput;
}
export interface UpdateDomainMutationArgs {
  input: UpdateDomainInput;
}
export interface RemoveFreeShippingThresholdMutationArgs {
  input: RemoveFreeShippingThresholdInput;
}
export interface TransferDomainOwnershipMutationArgs {
  input: TransferDomainOwnershipInput;
}
export interface UpdateCompanyMutationArgs {
  input: UpdateCompanyInput;
}
export interface UploadCompanyAvatarMutationArgs {
  input: UploadCompanyAvatarInput;
}
export interface CreateShippingLocationMutationArgs {
  input: CreateShippingLocationInput;
}
export interface UpdateShippingLocationMutationArgs {
  input: UpdateShippingLocationInput;
}
export interface DeleteShippingLocationMutationArgs {
  input: DeleteShippingLocationInput;
}
export interface CreateFlatRateShippingOptionMutationArgs {
  input: CreateFlatRateShippingOptionInput;
}
export interface UpdateFlatRateShippingOptionMutationArgs {
  input: UpdateFlatRateShippingOptionInput;
}
export interface DeleteFlatRateShippingOptionMutationArgs {
  input: DeleteFlatRateShippingOptionInput;
}
export interface CreatePromotionMutationArgs {
  input: CreatePromotionInput;
}
export interface DeletePromotionMutationArgs {
  input: DeletePromotionInput;
}
export interface CreateCampaignMutationArgs {
  input: CreateCampaignInput;
}
export interface CreateCampaignTrackingPixelMutationArgs {
  input: CreateCampaignTrackingPixelInput;
}
export interface AddCreditsMutationArgs {
  input: AddCreditsInput;
}
export interface CreateAddOnsMutationArgs {
  input: CreateAddOnsInput;
}
export interface DeleteAddOnsMutationArgs {
  input: DeleteAddOnsInput;
}
export interface AddPaymentCardsMutationArgs {
  input: AddPaymentCardsInput;
}
export interface DeletePaymentCardsMutationArgs {
  input: DeletePaymentCardsInput;
}
export interface SetDefaultPaymentCardMutationArgs {
  input: SetDefaultPaymentCardInput;
}
export interface CreateOrderMutationArgs {
  input: CreateOrderInput;
}
export interface SendOrdersExportEmailMutationArgs {
  input: SendOrdersExportEmailInput;
}
export interface CreateProductMutationArgs {
  input: CreateProductInput;
}
export interface UpdateProductMutationArgs {
  input: UpdateProductInput;
}
export interface UpdateAttributesMutationArgs {
  input: UpdateAttributesInput;
}
export interface UpdateProductAttributesMutationArgs {
  input: UpdateProductAttributesInput;
}
export interface DeleteAttributeMutationArgs {
  input: DeleteAttributeInput;
}
export interface DeleteAttributeValueMutationArgs {
  input: DeleteAttributeValueInput;
}
export interface UploadProductImageMutationArgs {
  input: UploadProductImageInput;
}
export interface DeleteProductImageMutationArgs {
  input: DeleteProductImageInput;
}
export interface UploadSkuImageMutationArgs {
  input: UploadSkuImageInput;
}
export interface CreateSkuMutationArgs {
  input: CreateSkuInput;
}
export interface CreateOrUpdateSkusMutationArgs {
  input: CreateOrUpdateSkusInput;
}
export interface DeleteSkuMutationArgs {
  input: DeleteSkuInput;
}
export interface ImportProductsMutationArgs {
  input: ImportProductsInput;
}
export interface RegisterMutationArgs {
  input: RegisterInput;
}
export interface RegisterFromInviteMutationArgs {
  input: RegisterFromInviteInput;
}
export interface ResetPasswordMutationArgs {
  input: ResetPasswordInput;
}
export interface ResetPasswordConfirmMutationArgs {
  input: ResetPasswordConfirmInput;
}
export interface AddUserMutationArgs {
  input: AddUserInput;
}
export interface UpdateUserMutationArgs {
  input: UpdateUserInput;
}
export interface RemoveUserFromDomainMutationArgs {
  input: RemoveUserFromDomainInput;
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const TokenAuthDocument = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;
export class TokenAuthComponent extends React.Component<
  Partial<ReactApollo.MutationProps<TokenAuthMutation, TokenAuthVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<TokenAuthMutation, TokenAuthVariables>
        mutation={TokenAuthDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type TokenAuthProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<TokenAuthMutation, TokenAuthVariables>
> &
  TChildProps;
export type TokenAuthMutationFn = ReactApollo.MutationFn<
  TokenAuthMutation,
  TokenAuthVariables
>;
export function TokenAuthHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TokenAuthMutation,
        TokenAuthVariables,
        TokenAuthProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    TokenAuthMutation,
    TokenAuthVariables,
    TokenAuthProps<TChildProps>
  >(TokenAuthDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $domainLabel: String!
  ) {
    register(
      input: {
        user: {
          email: $email
          firstName: $firstName
          lastName: $lastName
          password: $password
        }
        domain: { label: $domainLabel }
      }
    ) {
      user {
        id
        email
        firstName
        lastName
      }
      domain {
        id
      }
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const ResetPasswordDocument = gql`
  mutation resetPassword($email: String!) {
    resetPassword(input: { email: $email }) {
      user {
        email
      }
    }
  }
`;
export class ResetPasswordComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<ResetPasswordMutation, ResetPasswordVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<ResetPasswordMutation, ResetPasswordVariables>
        mutation={ResetPasswordDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ResetPasswordProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ResetPasswordMutation, ResetPasswordVariables>
> &
  TChildProps;
export type ResetPasswordMutationFn = ReactApollo.MutationFn<
  ResetPasswordMutation,
  ResetPasswordVariables
>;
export function ResetPasswordHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ResetPasswordMutation,
        ResetPasswordVariables,
        ResetPasswordProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ResetPasswordMutation,
    ResetPasswordVariables,
    ResetPasswordProps<TChildProps>
  >(ResetPasswordDocument, operationOptions);
}
export const ResetPasswordConfirmDocument = gql`
  mutation resetPasswordConfirm(
    $password: String!
    $passwordResetToken: String!
  ) {
    resetPasswordConfirm(
      input: { password: $password, passwordResetToken: $passwordResetToken }
    ) {
      user {
        email
      }
    }
  }
`;
export class ResetPasswordConfirmComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      ResetPasswordConfirmMutation,
      ResetPasswordConfirmVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        ResetPasswordConfirmMutation,
        ResetPasswordConfirmVariables
      >
        mutation={ResetPasswordConfirmDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ResetPasswordConfirmProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    ResetPasswordConfirmMutation,
    ResetPasswordConfirmVariables
  >
> &
  TChildProps;
export type ResetPasswordConfirmMutationFn = ReactApollo.MutationFn<
  ResetPasswordConfirmMutation,
  ResetPasswordConfirmVariables
>;
export function ResetPasswordConfirmHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ResetPasswordConfirmMutation,
        ResetPasswordConfirmVariables,
        ResetPasswordConfirmProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ResetPasswordConfirmMutation,
    ResetPasswordConfirmVariables,
    ResetPasswordConfirmProps<TChildProps>
  >(ResetPasswordConfirmDocument, operationOptions);
}
export const DomainsDocument = gql`
  query domains {
    domains {
      edges {
        node {
          id
          label
          company {
            name
          }
          credits
          paymentCardCount
        }
      }
    }
  }
`;
export class DomainsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<DomainsQuery, DomainsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<DomainsQuery, DomainsVariables>
        query={DomainsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DomainsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<DomainsQuery, DomainsVariables>
> &
  TChildProps;
export function DomainsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DomainsQuery,
        DomainsVariables,
        DomainsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DomainsQuery,
    DomainsVariables,
    DomainsProps<TChildProps>
  >(DomainsDocument, operationOptions);
}
export const UserDocument = gql`
  query user {
    user {
      firstName
    }
  }
`;
export class UserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<UserQuery, UserVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<UserQuery, UserVariables>
        query={UserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<UserQuery, UserVariables>
> &
  TChildProps;
export function UserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UserQuery,
        UserVariables,
        UserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UserQuery,
    UserVariables,
    UserProps<TChildProps>
  >(UserDocument, operationOptions);
}
export const WalletDocument = gql`
  query wallet($id: String!) {
    domains(id: $id) {
      edges {
        node {
          id
          defaultPaymentCard {
            id
            brand
            last4
          }
          paymentCards {
            id
            brand
            last4
          }
          addOnPlans {
            id
            name
            amount
          }
          addOns {
            subscriptionId
            planId
            name
          }
          invoices {
            id
            startDatetime
            endDatetime
            url
          }
        }
      }
    }
  }
`;
export class WalletComponent extends React.Component<
  Partial<ReactApollo.QueryProps<WalletQuery, WalletVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<WalletQuery, WalletVariables>
        query={WalletDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type WalletProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<WalletQuery, WalletVariables>
> &
  TChildProps;
export function WalletHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        WalletQuery,
        WalletVariables,
        WalletProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    WalletQuery,
    WalletVariables,
    WalletProps<TChildProps>
  >(WalletDocument, operationOptions);
}
export const CreateDomainDocument = gql`
  mutation createDomain($label: String!) {
    createDomain(input: { label: $label }) {
      domain {
        id
      }
    }
  }
`;
export class CreateDomainComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateDomainMutation, CreateDomainVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateDomainMutation, CreateDomainVariables>
        mutation={CreateDomainDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateDomainProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateDomainMutation, CreateDomainVariables>
> &
  TChildProps;
export type CreateDomainMutationFn = ReactApollo.MutationFn<
  CreateDomainMutation,
  CreateDomainVariables
>;
export function CreateDomainHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateDomainMutation,
        CreateDomainVariables,
        CreateDomainProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateDomainMutation,
    CreateDomainVariables,
    CreateDomainProps<TChildProps>
  >(CreateDomainDocument, operationOptions);
}
export const AddPaymentCardsDocument = gql`
  mutation addPaymentCards(
    $domainId: String!
    $sourceTokens: [String]!
    $defaultSourceToken: String
    $clientMutationId: String
  ) {
    addPaymentCards(
      input: {
        domainId: $domainId
        sourceTokens: $sourceTokens
        defaultSourceToken: $defaultSourceToken
        clientMutationId: $clientMutationId
      }
    ) {
      domain {
        id
        paymentCardCount
        defaultPaymentCard {
          id
          brand
          last4
        }
        paymentCards {
          id
          brand
          last4
        }
      }
    }
  }
`;
export class AddPaymentCardsComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<AddPaymentCardsMutation, AddPaymentCardsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<AddPaymentCardsMutation, AddPaymentCardsVariables>
        mutation={AddPaymentCardsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddPaymentCardsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddPaymentCardsMutation, AddPaymentCardsVariables>
> &
  TChildProps;
export type AddPaymentCardsMutationFn = ReactApollo.MutationFn<
  AddPaymentCardsMutation,
  AddPaymentCardsVariables
>;
export function AddPaymentCardsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddPaymentCardsMutation,
        AddPaymentCardsVariables,
        AddPaymentCardsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddPaymentCardsMutation,
    AddPaymentCardsVariables,
    AddPaymentCardsProps<TChildProps>
  >(AddPaymentCardsDocument, operationOptions);
}
export const AddCreditsDocument = gql`
  mutation addCredits($domainId: String!, $credits: Int!) {
    addCredits(input: { domainId: $domainId, credits: $credits }) {
      domain {
        id
        credits
      }
    }
  }
`;
export class AddCreditsComponent extends React.Component<
  Partial<ReactApollo.MutationProps<AddCreditsMutation, AddCreditsVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<AddCreditsMutation, AddCreditsVariables>
        mutation={AddCreditsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddCreditsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddCreditsMutation, AddCreditsVariables>
> &
  TChildProps;
export type AddCreditsMutationFn = ReactApollo.MutationFn<
  AddCreditsMutation,
  AddCreditsVariables
>;
export function AddCreditsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddCreditsMutation,
        AddCreditsVariables,
        AddCreditsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddCreditsMutation,
    AddCreditsVariables,
    AddCreditsProps<TChildProps>
  >(AddCreditsDocument, operationOptions);
}
export const SetDefaultPaymentCardDocument = gql`
  mutation setDefaultPaymentCard($domainId: String!, $cardId: String!) {
    setDefaultPaymentCard(input: { domainId: $domainId, cardId: $cardId }) {
      domain {
        id
        defaultPaymentCard {
          id
          brand
          last4
        }
      }
    }
  }
`;
export class SetDefaultPaymentCardComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SetDefaultPaymentCardMutation,
      SetDefaultPaymentCardVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        SetDefaultPaymentCardMutation,
        SetDefaultPaymentCardVariables
      >
        mutation={SetDefaultPaymentCardDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SetDefaultPaymentCardProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    SetDefaultPaymentCardMutation,
    SetDefaultPaymentCardVariables
  >
> &
  TChildProps;
export type SetDefaultPaymentCardMutationFn = ReactApollo.MutationFn<
  SetDefaultPaymentCardMutation,
  SetDefaultPaymentCardVariables
>;
export function SetDefaultPaymentCardHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SetDefaultPaymentCardMutation,
        SetDefaultPaymentCardVariables,
        SetDefaultPaymentCardProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SetDefaultPaymentCardMutation,
    SetDefaultPaymentCardVariables,
    SetDefaultPaymentCardProps<TChildProps>
  >(SetDefaultPaymentCardDocument, operationOptions);
}
export const DeletePaymentCardsDocument = gql`
  mutation deletePaymentCards($domainId: String!, $cardIds: [String]!) {
    deletePaymentCards(input: { domainId: $domainId, cardIds: $cardIds }) {
      domain {
        id
        paymentCardCount
        paymentCards {
          id
          brand
          last4
        }
        defaultPaymentCard {
          id
          brand
          last4
        }
      }
    }
  }
`;
export class DeletePaymentCardsComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      DeletePaymentCardsMutation,
      DeletePaymentCardsVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        DeletePaymentCardsMutation,
        DeletePaymentCardsVariables
      >
        mutation={DeletePaymentCardsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeletePaymentCardsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    DeletePaymentCardsMutation,
    DeletePaymentCardsVariables
  >
> &
  TChildProps;
export type DeletePaymentCardsMutationFn = ReactApollo.MutationFn<
  DeletePaymentCardsMutation,
  DeletePaymentCardsVariables
>;
export function DeletePaymentCardsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeletePaymentCardsMutation,
        DeletePaymentCardsVariables,
        DeletePaymentCardsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeletePaymentCardsMutation,
    DeletePaymentCardsVariables,
    DeletePaymentCardsProps<TChildProps>
  >(DeletePaymentCardsDocument, operationOptions);
}
export const CreateAddOnsDocument = gql`
  mutation createAddOns(
    $domainId: String!
    $addOnPlanIds: [String]!
    $clientMutationId: String
  ) {
    createAddOns(
      input: {
        domainId: $domainId
        addOnPlanIds: $addOnPlanIds
        clientMutationId: $clientMutationId
      }
    ) {
      domain {
        id
        credits
        addOnPlans {
          id
          name
          amount
        }
        addOns {
          subscriptionId
          planId
          name
        }
      }
    }
  }
`;
export class CreateAddOnsComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateAddOnsMutation, CreateAddOnsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateAddOnsMutation, CreateAddOnsVariables>
        mutation={CreateAddOnsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateAddOnsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateAddOnsMutation, CreateAddOnsVariables>
> &
  TChildProps;
export type CreateAddOnsMutationFn = ReactApollo.MutationFn<
  CreateAddOnsMutation,
  CreateAddOnsVariables
>;
export function CreateAddOnsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateAddOnsMutation,
        CreateAddOnsVariables,
        CreateAddOnsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateAddOnsMutation,
    CreateAddOnsVariables,
    CreateAddOnsProps<TChildProps>
  >(CreateAddOnsDocument, operationOptions);
}
export const DeleteAddOnsDocument = gql`
  mutation deleteAddOns(
    $domainId: String!
    $subscriptionIds: [String]!
    $clientMutationId: String
  ) {
    deleteAddOns(
      input: {
        domainId: $domainId
        subscriptionIds: $subscriptionIds
        clientMutationId: $clientMutationId
      }
    ) {
      domain {
        id
        credits
        addOns {
          subscriptionId
          planId
          name
        }
      }
    }
  }
`;
export class DeleteAddOnsComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteAddOnsMutation, DeleteAddOnsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteAddOnsMutation, DeleteAddOnsVariables>
        mutation={DeleteAddOnsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteAddOnsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteAddOnsMutation, DeleteAddOnsVariables>
> &
  TChildProps;
export type DeleteAddOnsMutationFn = ReactApollo.MutationFn<
  DeleteAddOnsMutation,
  DeleteAddOnsVariables
>;
export function DeleteAddOnsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteAddOnsMutation,
        DeleteAddOnsVariables,
        DeleteAddOnsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteAddOnsMutation,
    DeleteAddOnsVariables,
    DeleteAddOnsProps<TChildProps>
  >(DeleteAddOnsDocument, operationOptions);
}
export const ProductsDocument = gql`
  query products(
    $domainId: ID!
    $first: Int!
    $cursor: String
    $searchFilter: String
    $orderBy: String
  ) {
    node(id: $domainId) {
      ... on DomainNode {
        products(
          orderBy: $orderBy
          first: $first
          after: $cursor
          name_Icontains: $searchFilter
        ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            node {
              name
              id
              description
              gender
              variantCount
              quantity
              activeCampaignCount
              images(orderBy: "orderingPosition", first: 1) {
                edges {
                  node {
                    id
                    image
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export class ProductsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ProductsQuery, ProductsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ProductsQuery, ProductsVariables>
        query={ProductsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ProductsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ProductsQuery, ProductsVariables>
> &
  TChildProps;
export function ProductsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ProductsQuery,
        ProductsVariables,
        ProductsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ProductsQuery,
    ProductsVariables,
    ProductsProps<TChildProps>
  >(ProductsDocument, operationOptions);
}
export const ProductDocument = gql`
  query product($productId: ID!) {
    node(id: $productId) {
      ... on ProductNode {
        id
        name
        description
        gender
        htsCode
        attributes
        stripeId
        domain {
          id
        }
        skus {
          edges {
            node {
              id
              stripeId
              sku
              attributes
              basePrice
              salePrice
              quantity
              unitOfWeight
              weight
              unitOfDimensions
              height
              width
              length
              image
            }
          }
        }
        images(orderBy: "orderingPosition") {
          edges {
            node {
              id
              image
            }
          }
        }
      }
    }
  }
`;
export class ProductComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ProductQuery, ProductVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ProductQuery, ProductVariables>
        query={ProductDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ProductProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ProductQuery, ProductVariables>
> &
  TChildProps;
export function ProductHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ProductQuery,
        ProductVariables,
        ProductProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ProductQuery,
    ProductVariables,
    ProductProps<TChildProps>
  >(ProductDocument, operationOptions);
}
export const CreateProductDocument = gql`
  mutation createProduct(
    $domainId: String!
    $name: String!
    $description: String
    $gender: Int
    $htsCode: String
    $attributes: [AttributesInputObject]
  ) {
    createProduct(
      input: {
        domainId: $domainId
        name: $name
        description: $description
        gender: $gender
        htsCode: $htsCode
        attributes: $attributes
      }
    ) {
      product {
        id
        stripeId
      }
    }
  }
`;
export class CreateProductComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateProductMutation, CreateProductVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateProductMutation, CreateProductVariables>
        mutation={CreateProductDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateProductProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateProductMutation, CreateProductVariables>
> &
  TChildProps;
export type CreateProductMutationFn = ReactApollo.MutationFn<
  CreateProductMutation,
  CreateProductVariables
>;
export function CreateProductHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateProductMutation,
        CreateProductVariables,
        CreateProductProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateProductMutation,
    CreateProductVariables,
    CreateProductProps<TChildProps>
  >(CreateProductDocument, operationOptions);
}
export const CreateSkuDocument = gql`
  mutation createSku(
    $domainId: String!
    $productId: String
    $stripeProductId: String
    $skus: [CreateSkuInputObject]!
  ) {
    createSku(
      input: {
        domainId: $domainId
        productId: $productId
        stripeProductId: $stripeProductId
        skus: $skus
      }
    ) {
      skus {
        id
      }
    }
  }
`;
export class CreateSkuComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateSkuMutation, CreateSkuVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateSkuMutation, CreateSkuVariables>
        mutation={CreateSkuDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateSkuProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateSkuMutation, CreateSkuVariables>
> &
  TChildProps;
export type CreateSkuMutationFn = ReactApollo.MutationFn<
  CreateSkuMutation,
  CreateSkuVariables
>;
export function CreateSkuHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateSkuMutation,
        CreateSkuVariables,
        CreateSkuProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateSkuMutation,
    CreateSkuVariables,
    CreateSkuProps<TChildProps>
  >(CreateSkuDocument, operationOptions);
}
export const CreateOrUpdateSkusDocument = gql`
  mutation createOrUpdateSkus(
    $domainId: String!
    $productId: String
    $stripeProductId: String
    $skus: [CreateOrUpdateSkusInputObject]
  ) {
    createOrUpdateSkus(
      input: {
        domainId: $domainId
        productId: $productId
        stripeProductId: $stripeProductId
        skus: $skus
      }
    ) {
      skus {
        id
      }
    }
  }
`;
export class CreateOrUpdateSkusComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateOrUpdateSkusMutation,
      CreateOrUpdateSkusVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateOrUpdateSkusMutation,
        CreateOrUpdateSkusVariables
      >
        mutation={CreateOrUpdateSkusDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateOrUpdateSkusProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateOrUpdateSkusMutation,
    CreateOrUpdateSkusVariables
  >
> &
  TChildProps;
export type CreateOrUpdateSkusMutationFn = ReactApollo.MutationFn<
  CreateOrUpdateSkusMutation,
  CreateOrUpdateSkusVariables
>;
export function CreateOrUpdateSkusHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateOrUpdateSkusMutation,
        CreateOrUpdateSkusVariables,
        CreateOrUpdateSkusProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateOrUpdateSkusMutation,
    CreateOrUpdateSkusVariables,
    CreateOrUpdateSkusProps<TChildProps>
  >(CreateOrUpdateSkusDocument, operationOptions);
}
export const UploadProductImageDocument = gql`
  mutation uploadProductImage(
    $domainId: String!
    $productId: String!
    $images: [ProductImageInputObject]!
  ) {
    uploadProductImage(
      input: { domainId: $domainId, productId: $productId, images: $images }
    ) {
      product {
        images(orderBy: "orderingPosition") {
          edges {
            node {
              id
              image
              orderingPosition
            }
          }
        }
      }
    }
  }
`;
export class UploadProductImageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UploadProductImageMutation,
      UploadProductImageVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UploadProductImageMutation,
        UploadProductImageVariables
      >
        mutation={UploadProductImageDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UploadProductImageProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UploadProductImageMutation,
    UploadProductImageVariables
  >
> &
  TChildProps;
export type UploadProductImageMutationFn = ReactApollo.MutationFn<
  UploadProductImageMutation,
  UploadProductImageVariables
>;
export function UploadProductImageHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UploadProductImageMutation,
        UploadProductImageVariables,
        UploadProductImageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UploadProductImageMutation,
    UploadProductImageVariables,
    UploadProductImageProps<TChildProps>
  >(UploadProductImageDocument, operationOptions);
}
export const UploadSkuImageDocument = gql`
  mutation uploadSkuImage(
    $domainId: String!
    $skuId: String!
    $image: Upload!
  ) {
    uploadSkuImage(
      input: { domainId: $domainId, skuId: $skuId, image: $image }
    ) {
      sku {
        id
      }
    }
  }
`;
export class UploadSkuImageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UploadSkuImageMutation, UploadSkuImageVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UploadSkuImageMutation, UploadSkuImageVariables>
        mutation={UploadSkuImageDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UploadSkuImageProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UploadSkuImageMutation, UploadSkuImageVariables>
> &
  TChildProps;
export type UploadSkuImageMutationFn = ReactApollo.MutationFn<
  UploadSkuImageMutation,
  UploadSkuImageVariables
>;
export function UploadSkuImageHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UploadSkuImageMutation,
        UploadSkuImageVariables,
        UploadSkuImageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UploadSkuImageMutation,
    UploadSkuImageVariables,
    UploadSkuImageProps<TChildProps>
  >(UploadSkuImageDocument, operationOptions);
}
export const DeleteSkuDocument = gql`
  mutation deleteSku($domainId: String!, $skus: [RemoveSkuInputObject]) {
    deleteSku(input: { domainId: $domainId, skus: $skus }) {
      success
    }
  }
`;
export class DeleteSkuComponent extends React.Component<
  Partial<ReactApollo.MutationProps<DeleteSkuMutation, DeleteSkuVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteSkuMutation, DeleteSkuVariables>
        mutation={DeleteSkuDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteSkuProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteSkuMutation, DeleteSkuVariables>
> &
  TChildProps;
export type DeleteSkuMutationFn = ReactApollo.MutationFn<
  DeleteSkuMutation,
  DeleteSkuVariables
>;
export function DeleteSkuHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteSkuMutation,
        DeleteSkuVariables,
        DeleteSkuProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteSkuMutation,
    DeleteSkuVariables,
    DeleteSkuProps<TChildProps>
  >(DeleteSkuDocument, operationOptions);
}
export const UpdateProductDocument = gql`
  mutation updateProduct(
    $domainId: String!
    $id: String
    $stripeId: String
    $name: String
    $description: String
    $gender: Int
    $htsCode: String
  ) {
    updateProduct(
      input: {
        domainId: $domainId
        id: $id
        stripeId: $stripeId
        name: $name
        description: $description
        htsCode: $htsCode
        gender: $gender
      }
    ) {
      product {
        id
        stripeId
      }
    }
  }
`;
export class UpdateProductComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateProductMutation, UpdateProductVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateProductMutation, UpdateProductVariables>
        mutation={UpdateProductDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateProductProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateProductMutation, UpdateProductVariables>
> &
  TChildProps;
export type UpdateProductMutationFn = ReactApollo.MutationFn<
  UpdateProductMutation,
  UpdateProductVariables
>;
export function UpdateProductHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateProductMutation,
        UpdateProductVariables,
        UpdateProductProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateProductMutation,
    UpdateProductVariables,
    UpdateProductProps<TChildProps>
  >(UpdateProductDocument, operationOptions);
}
export const UpdateProductAttributesDocument = gql`
  mutation updateProductAttributes(
    $domainId: String!
    $productId: String
    $stripeProductId: String
    $attributes: [AttributesInputObject]!
  ) {
    updateProductAttributes(
      input: {
        domainId: $domainId
        productId: $productId
        stripeProductId: $stripeProductId
        attributes: $attributes
      }
    ) {
      product {
        id
        stripeId
      }
    }
  }
`;
export class UpdateProductAttributesComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateProductAttributesMutation,
      UpdateProductAttributesVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateProductAttributesMutation,
        UpdateProductAttributesVariables
      >
        mutation={UpdateProductAttributesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateProductAttributesProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UpdateProductAttributesMutation,
    UpdateProductAttributesVariables
  >
> &
  TChildProps;
export type UpdateProductAttributesMutationFn = ReactApollo.MutationFn<
  UpdateProductAttributesMutation,
  UpdateProductAttributesVariables
>;
export function UpdateProductAttributesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateProductAttributesMutation,
        UpdateProductAttributesVariables,
        UpdateProductAttributesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateProductAttributesMutation,
    UpdateProductAttributesVariables,
    UpdateProductAttributesProps<TChildProps>
  >(UpdateProductAttributesDocument, operationOptions);
}
export const DeleteAttributeDocument = gql`
  mutation deleteAttribute(
    $domainId: String!
    $productId: String
    $stripeProductId: String
    $attributeKey: String!
  ) {
    deleteAttribute(
      input: {
        domainId: $domainId
        productId: $productId
        stripeProductId: $stripeProductId
        attributeKey: $attributeKey
      }
    ) {
      product {
        attributes
      }
    }
  }
`;
export class DeleteAttributeComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteAttributeMutation, DeleteAttributeVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteAttributeMutation, DeleteAttributeVariables>
        mutation={DeleteAttributeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteAttributeProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteAttributeMutation, DeleteAttributeVariables>
> &
  TChildProps;
export type DeleteAttributeMutationFn = ReactApollo.MutationFn<
  DeleteAttributeMutation,
  DeleteAttributeVariables
>;
export function DeleteAttributeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteAttributeMutation,
        DeleteAttributeVariables,
        DeleteAttributeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteAttributeMutation,
    DeleteAttributeVariables,
    DeleteAttributeProps<TChildProps>
  >(DeleteAttributeDocument, operationOptions);
}
export const DeleteAttributeValueDocument = gql`
  mutation deleteAttributeValue(
    $domainId: String!
    $productId: String
    $stripeProductId: String
    $attribute: AttributeInputObject!
  ) {
    deleteAttributeValue(
      input: {
        domainId: $domainId
        productId: $productId
        stripeProductId: $stripeProductId
        attribute: $attribute
      }
    ) {
      product {
        attributes
      }
    }
  }
`;
export class DeleteAttributeValueComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      DeleteAttributeValueMutation,
      DeleteAttributeValueVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        DeleteAttributeValueMutation,
        DeleteAttributeValueVariables
      >
        mutation={DeleteAttributeValueDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteAttributeValueProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    DeleteAttributeValueMutation,
    DeleteAttributeValueVariables
  >
> &
  TChildProps;
export type DeleteAttributeValueMutationFn = ReactApollo.MutationFn<
  DeleteAttributeValueMutation,
  DeleteAttributeValueVariables
>;
export function DeleteAttributeValueHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteAttributeValueMutation,
        DeleteAttributeValueVariables,
        DeleteAttributeValueProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteAttributeValueMutation,
    DeleteAttributeValueVariables,
    DeleteAttributeValueProps<TChildProps>
  >(DeleteAttributeValueDocument, operationOptions);
}
export const SkuCountDocument = gql`
  query skuCount(
    $productId: ID!
    $attributeKey: String
    $attributeValue: String
  ) {
    node(id: $productId) {
      ... on ProductNode {
        id
        skuCount(attributeKey: $attributeKey, attributeValue: $attributeValue)
      }
    }
  }
`;
export class SkuCountComponent extends React.Component<
  Partial<ReactApollo.QueryProps<SkuCountQuery, SkuCountVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<SkuCountQuery, SkuCountVariables>
        query={SkuCountDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SkuCountProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<SkuCountQuery, SkuCountVariables>
> &
  TChildProps;
export function SkuCountHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SkuCountQuery,
        SkuCountVariables,
        SkuCountProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SkuCountQuery,
    SkuCountVariables,
    SkuCountProps<TChildProps>
  >(SkuCountDocument, operationOptions);
}
export const UpdateAttributesDocument = gql`
  mutation updateAttributes(
    $domainId: String!
    $productId: String
    $stripeProductId: String
    $renames: [RenameAttributeKeyInput]
    $additions: [AddAttributeInput]
  ) {
    updateAttributes(
      input: {
        domainId: $domainId
        productId: $productId
        stripeProductId: $stripeProductId
        renames: $renames
        additions: $additions
      }
    ) {
      product {
        id
      }
    }
  }
`;
export class UpdateAttributesComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateAttributesMutation,
      UpdateAttributesVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateAttributesMutation, UpdateAttributesVariables>
        mutation={UpdateAttributesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateAttributesProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateAttributesMutation, UpdateAttributesVariables>
> &
  TChildProps;
export type UpdateAttributesMutationFn = ReactApollo.MutationFn<
  UpdateAttributesMutation,
  UpdateAttributesVariables
>;
export function UpdateAttributesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateAttributesMutation,
        UpdateAttributesVariables,
        UpdateAttributesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateAttributesMutation,
    UpdateAttributesVariables,
    UpdateAttributesProps<TChildProps>
  >(UpdateAttributesDocument, operationOptions);
}
export const OrderDocument = gql`
  query order($orderId: ID!) {
    node(id: $orderId) {
      ... on OrderNode {
        id
        createdOn
        stripeId
        customerName
        customerEmail
        customerPhoneNumber
        shippingAddress1
        shippingAddress2
        shippingCity
        shippingState
        shippingZipCode
        shippingCountry
        shippingLabelUrl
        packingSlipUrl
        paymentMethod
        shippingMethod
        shippingTrackingNumber
        shippingTrackingUrl
        orderStatus
        orderTotal
        tax
        shippingCost
        vendorTotal
        items {
          id
          sku {
            basePrice
            salePrice
            attributes
            image
            product {
              name
              gender
            }
          }
          quantity
        }
        campaigns(first: 1) {
          edges {
            node {
              type
              name
            }
          }
        }
      }
    }
  }
`;
export class OrderComponent extends React.Component<
  Partial<ReactApollo.QueryProps<OrderQuery, OrderVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<OrderQuery, OrderVariables>
        query={OrderDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type OrderProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<OrderQuery, OrderVariables>
> &
  TChildProps;
export function OrderHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        OrderQuery,
        OrderVariables,
        OrderProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    OrderQuery,
    OrderVariables,
    OrderProps<TChildProps>
  >(OrderDocument, operationOptions);
}
export const OrdersDocument = gql`
  query orders(
    $first: Int
    $cursor: String
    $orderStatusFilter: Float
    $searchFilter: String
    $orderBy: String
    $domainId: ID!
  ) {
    node(id: $domainId) {
      ... on DomainNode {
        orders(
          orderBy: $orderBy
          first: $first
          after: $cursor
          orderStatus: $orderStatusFilter
          stripeId_Icontains: $searchFilter
        ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            node {
              id
              stripeId
              customerName
              orderStatus
              orderTotal
            }
          }
        }
      }
    }
  }
`;
export class OrdersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<OrdersQuery, OrdersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<OrdersQuery, OrdersVariables>
        query={OrdersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type OrdersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<OrdersQuery, OrdersVariables>
> &
  TChildProps;
export function OrdersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        OrdersQuery,
        OrdersVariables,
        OrdersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    OrdersQuery,
    OrdersVariables,
    OrdersProps<TChildProps>
  >(OrdersDocument, operationOptions);
}
export const LatestOrdersDocument = gql`
  query latestOrders($last: Int, $domainId: ID!) {
    node(id: $domainId) {
      ... on DomainNode {
        orders(last: $last) {
          edges {
            node {
              id
              stripeId
              customerName
              orderStatus
              orderTotal
            }
          }
        }
      }
    }
  }
`;
export class LatestOrdersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<LatestOrdersQuery, LatestOrdersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<LatestOrdersQuery, LatestOrdersVariables>
        query={LatestOrdersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LatestOrdersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<LatestOrdersQuery, LatestOrdersVariables>
> &
  TChildProps;
export function LatestOrdersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LatestOrdersQuery,
        LatestOrdersVariables,
        LatestOrdersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LatestOrdersQuery,
    LatestOrdersVariables,
    LatestOrdersProps<TChildProps>
  >(LatestOrdersDocument, operationOptions);
}
export const CompanyNodeDocument = gql`
  query CompanyNode($id: String!) {
    domains(id: $id) {
      edges {
        node {
          id
          freeShippingThreshold
          company {
            id
            createdOn
            modifiedOn
            name
            email
            address {
              id
              createdOn
              modifiedOn
              name
              address1
              address2
              city
              state
              zipCode
              country
            }
            customerSupportNumber
            currency
            returnPolicy
            sizeGuide
            avatar
          }
          promotions {
            edges {
              node {
                id
                createdOn
                modifiedOn
                label
                startDatetime
                endDatetime
                discountValue
                discountType
                stripeCouponCode
              }
            }
          }
          campaignTrackingPixels(last: 2) {
            edges {
              node {
                platform
                pixel
                modifiedOn
                createdOn
              }
            }
          }
        }
      }
    }
  }
`;
export class CompanyNodeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<CompanyNodeQuery, CompanyNodeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<CompanyNodeQuery, CompanyNodeVariables>
        query={CompanyNodeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CompanyNodeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CompanyNodeQuery, CompanyNodeVariables>
> &
  TChildProps;
export function CompanyNodeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CompanyNodeQuery,
        CompanyNodeVariables,
        CompanyNodeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CompanyNodeQuery,
    CompanyNodeVariables,
    CompanyNodeProps<TChildProps>
  >(CompanyNodeDocument, operationOptions);
}
export const ShippingLocationsDocument = gql`
  query shippingLocations($id: String!) {
    domains(id: $id) {
      edges {
        node {
          id
          shippingLocations {
            edges {
              node {
                id
                name
                address1
                address2
                city
                state
                zipCode
                country
                email
                phoneNumber
              }
            }
          }
        }
      }
    }
  }
`;
export class ShippingLocationsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<ShippingLocationsQuery, ShippingLocationsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<ShippingLocationsQuery, ShippingLocationsVariables>
        query={ShippingLocationsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ShippingLocationsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ShippingLocationsQuery, ShippingLocationsVariables>
> &
  TChildProps;
export function ShippingLocationsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ShippingLocationsQuery,
        ShippingLocationsVariables,
        ShippingLocationsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ShippingLocationsQuery,
    ShippingLocationsVariables,
    ShippingLocationsProps<TChildProps>
  >(ShippingLocationsDocument, operationOptions);
}
export const UsersDocument = gql`
  query Users($domainId: String!) {
    domains(id: $domainId) {
      edges {
        node {
          id
          users {
            edges {
              node {
                id
                isSuperuser
                firstName
                lastName
                email
                invitationToken
              }
            }
          }
        }
      }
    }
  }
`;
export class UsersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<UsersQuery, UsersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<UsersQuery, UsersVariables>
        query={UsersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UsersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<UsersQuery, UsersVariables>
> &
  TChildProps;
export function UsersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UsersQuery,
        UsersVariables,
        UsersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UsersQuery,
    UsersVariables,
    UsersProps<TChildProps>
  >(UsersDocument, operationOptions);
}
export const UploadCompanyAvatarDocument = gql`
  mutation uploadCompanyAvatar($domainId: String!, $image: Upload!) {
    uploadCompanyAvatar(input: { domainId: $domainId, image: $image }) {
      company {
        avatar
      }
    }
  }
`;
export class UploadCompanyAvatarComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UploadCompanyAvatarMutation,
      UploadCompanyAvatarVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UploadCompanyAvatarMutation,
        UploadCompanyAvatarVariables
      >
        mutation={UploadCompanyAvatarDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UploadCompanyAvatarProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UploadCompanyAvatarMutation,
    UploadCompanyAvatarVariables
  >
> &
  TChildProps;
export type UploadCompanyAvatarMutationFn = ReactApollo.MutationFn<
  UploadCompanyAvatarMutation,
  UploadCompanyAvatarVariables
>;
export function UploadCompanyAvatarHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UploadCompanyAvatarMutation,
        UploadCompanyAvatarVariables,
        UploadCompanyAvatarProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UploadCompanyAvatarMutation,
    UploadCompanyAvatarVariables,
    UploadCompanyAvatarProps<TChildProps>
  >(UploadCompanyAvatarDocument, operationOptions);
}
export const CreateCampaignTrackingPixelDocument = gql`
  mutation createCampaignTrackingPixel(
    $domainId: String!
    $platform: Int!
    $pixel: String!
  ) {
    createCampaignTrackingPixel(
      input: { domainId: $domainId, platform: $platform, pixel: $pixel }
    ) {
      campaignTrackingPixel {
        id
        platform
        pixel
      }
    }
  }
`;
export class CreateCampaignTrackingPixelComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateCampaignTrackingPixelMutation,
      CreateCampaignTrackingPixelVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateCampaignTrackingPixelMutation,
        CreateCampaignTrackingPixelVariables
      >
        mutation={CreateCampaignTrackingPixelDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCampaignTrackingPixelProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateCampaignTrackingPixelMutation,
    CreateCampaignTrackingPixelVariables
  >
> &
  TChildProps;
export type CreateCampaignTrackingPixelMutationFn = ReactApollo.MutationFn<
  CreateCampaignTrackingPixelMutation,
  CreateCampaignTrackingPixelVariables
>;
export function CreateCampaignTrackingPixelHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCampaignTrackingPixelMutation,
        CreateCampaignTrackingPixelVariables,
        CreateCampaignTrackingPixelProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateCampaignTrackingPixelMutation,
    CreateCampaignTrackingPixelVariables,
    CreateCampaignTrackingPixelProps<TChildProps>
  >(CreateCampaignTrackingPixelDocument, operationOptions);
}
export const UpdateCompanyDocument = gql`
  mutation updateCompany(
    $domainId: String!
    $name: String
    $email: String
    $customerSupportNumber: String
    $returnPolicy: String
    $sizeGuide: String
    $currency: String
  ) {
    updateCompany(
      input: {
        domainId: $domainId
        name: $name
        email: $email
        customerSupportNumber: $customerSupportNumber
        returnPolicy: $returnPolicy
        sizeGuide: $sizeGuide
        currency: $currency
      }
    ) {
      company {
        id
        name
        email
        customerSupportNumber
        currency
        address {
          id
          address1
          address2
          zipCode
          city
          country
          state
        }
        returnPolicy
        sizeGuide
      }
    }
  }
`;
export class UpdateCompanyComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateCompanyMutation, UpdateCompanyVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateCompanyMutation, UpdateCompanyVariables>
        mutation={UpdateCompanyDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateCompanyProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateCompanyMutation, UpdateCompanyVariables>
> &
  TChildProps;
export type UpdateCompanyMutationFn = ReactApollo.MutationFn<
  UpdateCompanyMutation,
  UpdateCompanyVariables
>;
export function UpdateCompanyHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateCompanyMutation,
        UpdateCompanyVariables,
        UpdateCompanyProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateCompanyMutation,
    UpdateCompanyVariables,
    UpdateCompanyProps<TChildProps>
  >(UpdateCompanyDocument, operationOptions);
}
export const CreateShippingLocationDocument = gql`
  mutation createShippingLocation(
    $domainId: String!
    $shippingLocations: [CreateShippingLocationInputObject]!
  ) {
    createShippingLocation(
      input: { domainId: $domainId, shippingLocations: $shippingLocations }
    ) {
      domain {
        id
        label
      }
    }
  }
`;
export class CreateShippingLocationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateShippingLocationMutation,
      CreateShippingLocationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateShippingLocationMutation,
        CreateShippingLocationVariables
      >
        mutation={CreateShippingLocationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateShippingLocationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateShippingLocationMutation,
    CreateShippingLocationVariables
  >
> &
  TChildProps;
export type CreateShippingLocationMutationFn = ReactApollo.MutationFn<
  CreateShippingLocationMutation,
  CreateShippingLocationVariables
>;
export function CreateShippingLocationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateShippingLocationMutation,
        CreateShippingLocationVariables,
        CreateShippingLocationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateShippingLocationMutation,
    CreateShippingLocationVariables,
    CreateShippingLocationProps<TChildProps>
  >(CreateShippingLocationDocument, operationOptions);
}
export const UpdateShippingLocationDocument = gql`
  mutation updateShippingLocation(
    $domainId: String!
    $shippingLocations: [UpdateShippingLocationInputObject]!
  ) {
    updateShippingLocation(
      input: { domainId: $domainId, shippingLocations: $shippingLocations }
    ) {
      domain {
        id
        label
      }
    }
  }
`;
export class UpdateShippingLocationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateShippingLocationMutation,
      UpdateShippingLocationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateShippingLocationMutation,
        UpdateShippingLocationVariables
      >
        mutation={UpdateShippingLocationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateShippingLocationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UpdateShippingLocationMutation,
    UpdateShippingLocationVariables
  >
> &
  TChildProps;
export type UpdateShippingLocationMutationFn = ReactApollo.MutationFn<
  UpdateShippingLocationMutation,
  UpdateShippingLocationVariables
>;
export function UpdateShippingLocationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateShippingLocationMutation,
        UpdateShippingLocationVariables,
        UpdateShippingLocationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateShippingLocationMutation,
    UpdateShippingLocationVariables,
    UpdateShippingLocationProps<TChildProps>
  >(UpdateShippingLocationDocument, operationOptions);
}
export const DeleteShippingLocationDocument = gql`
  mutation deleteShippingLocation(
    $domainId: String!
    $shippingLocationIds: [String]!
  ) {
    deleteShippingLocation(
      input: { domainId: $domainId, shippingLocationIds: $shippingLocationIds }
    ) {
      success
    }
  }
`;
export class DeleteShippingLocationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      DeleteShippingLocationMutation,
      DeleteShippingLocationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        DeleteShippingLocationMutation,
        DeleteShippingLocationVariables
      >
        mutation={DeleteShippingLocationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteShippingLocationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    DeleteShippingLocationMutation,
    DeleteShippingLocationVariables
  >
> &
  TChildProps;
export type DeleteShippingLocationMutationFn = ReactApollo.MutationFn<
  DeleteShippingLocationMutation,
  DeleteShippingLocationVariables
>;
export function DeleteShippingLocationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteShippingLocationMutation,
        DeleteShippingLocationVariables,
        DeleteShippingLocationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteShippingLocationMutation,
    DeleteShippingLocationVariables,
    DeleteShippingLocationProps<TChildProps>
  >(DeleteShippingLocationDocument, operationOptions);
}
export const AddUserDocument = gql`
  mutation addUser(
    $domainId: String!
    $firstName: String
    $lastName: String
    $email: String!
  ) {
    addUser(
      input: {
        domainId: $domainId
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      user {
        id
      }
    }
  }
`;
export class AddUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<AddUserMutation, AddUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<AddUserMutation, AddUserVariables>
        mutation={AddUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddUserMutation, AddUserVariables>
> &
  TChildProps;
export type AddUserMutationFn = ReactApollo.MutationFn<
  AddUserMutation,
  AddUserVariables
>;
export function AddUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddUserMutation,
        AddUserVariables,
        AddUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddUserMutation,
    AddUserVariables,
    AddUserProps<TChildProps>
  >(AddUserDocument, operationOptions);
}
export const UpdateUserDocument = gql`
  mutation updateUser(
    $domainId: String!
    $id: String!
    $firstName: String
    $lastName: String
  ) {
    updateUser(
      input: {
        domainId: $domainId
        id: $id
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      user {
        id
      }
    }
  }
`;
export class UpdateUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<UpdateUserMutation, UpdateUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateUserMutation, UpdateUserVariables>
        mutation={UpdateUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateUserMutation, UpdateUserVariables>
> &
  TChildProps;
export type UpdateUserMutationFn = ReactApollo.MutationFn<
  UpdateUserMutation,
  UpdateUserVariables
>;
export function UpdateUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateUserMutation,
        UpdateUserVariables,
        UpdateUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateUserMutation,
    UpdateUserVariables,
    UpdateUserProps<TChildProps>
  >(UpdateUserDocument, operationOptions);
}
export const RemoveUserFromDomainDocument = gql`
  mutation removeUserFromDomain($domainId: String!, $id: String!) {
    removeUserFromDomain(input: { domainId: $domainId, id: $id }) {
      success
    }
  }
`;
export class RemoveUserFromDomainComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RemoveUserFromDomainMutation,
      RemoveUserFromDomainVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RemoveUserFromDomainMutation,
        RemoveUserFromDomainVariables
      >
        mutation={RemoveUserFromDomainDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RemoveUserFromDomainProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    RemoveUserFromDomainMutation,
    RemoveUserFromDomainVariables
  >
> &
  TChildProps;
export type RemoveUserFromDomainMutationFn = ReactApollo.MutationFn<
  RemoveUserFromDomainMutation,
  RemoveUserFromDomainVariables
>;
export function RemoveUserFromDomainHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RemoveUserFromDomainMutation,
        RemoveUserFromDomainVariables,
        RemoveUserFromDomainProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RemoveUserFromDomainMutation,
    RemoveUserFromDomainVariables,
    RemoveUserFromDomainProps<TChildProps>
  >(RemoveUserFromDomainDocument, operationOptions);
}
export const UpdateDomainDocument = gql`
  mutation updateDomain($id: String!, $freeShippingThreshold: Int) {
    updateDomain(
      input: { id: $id, freeShippingThreshold: $freeShippingThreshold }
    ) {
      domain {
        label
        id
        freeShippingThreshold
      }
    }
  }
`;
export class UpdateDomainComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateDomainMutation, UpdateDomainVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateDomainMutation, UpdateDomainVariables>
        mutation={UpdateDomainDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateDomainProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateDomainMutation, UpdateDomainVariables>
> &
  TChildProps;
export type UpdateDomainMutationFn = ReactApollo.MutationFn<
  UpdateDomainMutation,
  UpdateDomainVariables
>;
export function UpdateDomainHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateDomainMutation,
        UpdateDomainVariables,
        UpdateDomainProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateDomainMutation,
    UpdateDomainVariables,
    UpdateDomainProps<TChildProps>
  >(UpdateDomainDocument, operationOptions);
}
export const RemoveFreeShippingThresholdDocument = gql`
  mutation removeFreeShippingThreshold($domainId: String!) {
    removeFreeShippingThreshold(input: { domainId: $domainId }) {
      success
    }
  }
`;
export class RemoveFreeShippingThresholdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RemoveFreeShippingThresholdMutation,
      RemoveFreeShippingThresholdVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RemoveFreeShippingThresholdMutation,
        RemoveFreeShippingThresholdVariables
      >
        mutation={RemoveFreeShippingThresholdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RemoveFreeShippingThresholdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    RemoveFreeShippingThresholdMutation,
    RemoveFreeShippingThresholdVariables
  >
> &
  TChildProps;
export type RemoveFreeShippingThresholdMutationFn = ReactApollo.MutationFn<
  RemoveFreeShippingThresholdMutation,
  RemoveFreeShippingThresholdVariables
>;
export function RemoveFreeShippingThresholdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RemoveFreeShippingThresholdMutation,
        RemoveFreeShippingThresholdVariables,
        RemoveFreeShippingThresholdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RemoveFreeShippingThresholdMutation,
    RemoveFreeShippingThresholdVariables,
    RemoveFreeShippingThresholdProps<TChildProps>
  >(RemoveFreeShippingThresholdDocument, operationOptions);
}
export const CreatePromotionDocument = gql`
  mutation createPromotion(
    $domainId: String!
    $promotions: [CreatePromotionInputObject]!
  ) {
    createPromotion(input: { domainId: $domainId, promotions: $promotions }) {
      promotions {
        id
      }
    }
  }
`;
export class CreatePromotionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreatePromotionMutation, CreatePromotionVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreatePromotionMutation, CreatePromotionVariables>
        mutation={CreatePromotionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreatePromotionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreatePromotionMutation, CreatePromotionVariables>
> &
  TChildProps;
export type CreatePromotionMutationFn = ReactApollo.MutationFn<
  CreatePromotionMutation,
  CreatePromotionVariables
>;
export function CreatePromotionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreatePromotionMutation,
        CreatePromotionVariables,
        CreatePromotionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreatePromotionMutation,
    CreatePromotionVariables,
    CreatePromotionProps<TChildProps>
  >(CreatePromotionDocument, operationOptions);
}
export const DeletePromotionDocument = gql`
  mutation deletePromotion($domainId: String!, $promotionIds: [String]!) {
    deletePromotion(
      input: { domainId: $domainId, promotionIds: $promotionIds }
    ) {
      success
    }
  }
`;
export class DeletePromotionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeletePromotionMutation, DeletePromotionVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeletePromotionMutation, DeletePromotionVariables>
        mutation={DeletePromotionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeletePromotionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeletePromotionMutation, DeletePromotionVariables>
> &
  TChildProps;
export type DeletePromotionMutationFn = ReactApollo.MutationFn<
  DeletePromotionMutation,
  DeletePromotionVariables
>;
export function DeletePromotionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeletePromotionMutation,
        DeletePromotionVariables,
        DeletePromotionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeletePromotionMutation,
    DeletePromotionVariables,
    DeletePromotionProps<TChildProps>
  >(DeletePromotionDocument, operationOptions);
}

// ====================================================
// Documents
// ====================================================

export type TokenAuthVariables = {
  email: string;
  password: string;
};

export type TokenAuthMutation = {
  __typename?: "Mutation";

  tokenAuth: Maybe<TokenAuthTokenAuth>;
};

export type TokenAuthTokenAuth = {
  __typename?: "ObtainJSONWebToken";

  token: Maybe<string>;
};

export type RegisterVariables = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  domainLabel: string;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: Maybe<RegisterRegister>;
};

export type RegisterRegister = {
  __typename?: "RegisterPayload";

  user: Maybe<RegisterUser>;

  domain: Maybe<RegisterDomain>;
};

export type RegisterUser = {
  __typename?: "UserNode";

  id: string;

  email: string;

  firstName: Maybe<string>;

  lastName: Maybe<string>;
};

export type RegisterDomain = {
  __typename?: "DomainNode";

  id: string;
};

export type ResetPasswordVariables = {
  email: string;
};

export type ResetPasswordMutation = {
  __typename?: "Mutation";

  resetPassword: Maybe<ResetPasswordResetPassword>;
};

export type ResetPasswordResetPassword = {
  __typename?: "ResetPasswordPayload";

  user: Maybe<ResetPasswordUser>;
};

export type ResetPasswordUser = {
  __typename?: "UserNode";

  email: string;
};

export type ResetPasswordConfirmVariables = {
  password: string;
  passwordResetToken: string;
};

export type ResetPasswordConfirmMutation = {
  __typename?: "Mutation";

  resetPasswordConfirm: Maybe<ResetPasswordConfirmResetPasswordConfirm>;
};

export type ResetPasswordConfirmResetPasswordConfirm = {
  __typename?: "ResetPasswordConfirmPayload";

  user: Maybe<ResetPasswordConfirmUser>;
};

export type ResetPasswordConfirmUser = {
  __typename?: "UserNode";

  email: string;
};

export type DomainsVariables = {};

export type DomainsQuery = {
  __typename?: "Query";

  domains: Maybe<DomainsDomains>;
};

export type DomainsDomains = {
  __typename?: "DomainNodeConnection";

  edges: DomainsEdges[];
};

export type DomainsEdges = {
  __typename?: "DomainNodeEdge";

  node: Maybe<DomainsNode>;
};

export type DomainsNode = {
  __typename?: "DomainNode";

  id: string;

  label: string;

  company: Maybe<DomainsCompany>;

  credits: Maybe<number>;

  paymentCardCount: Maybe<number>;
};

export type DomainsCompany = {
  __typename?: "CompanyNode";

  name: string;
};

export type UserVariables = {};

export type UserQuery = {
  __typename?: "Query";

  user: Maybe<UserUser>;
};

export type UserUser = {
  __typename?: "UserNode";

  firstName: Maybe<string>;
};

export type WalletVariables = {
  id: string;
};

export type WalletQuery = {
  __typename?: "Query";

  domains: Maybe<WalletDomains>;
};

export type WalletDomains = {
  __typename?: "DomainNodeConnection";

  edges: WalletEdges[];
};

export type WalletEdges = {
  __typename?: "DomainNodeEdge";

  node: Maybe<WalletNode>;
};

export type WalletNode = {
  __typename?: "DomainNode";

  id: string;

  defaultPaymentCard: Maybe<WalletDefaultPaymentCard>;

  paymentCards: Maybe<WalletPaymentCards[]>;

  addOnPlans: Maybe<WalletAddOnPlans[]>;

  addOns: Maybe<WalletAddOns[]>;

  invoices: Maybe<WalletInvoices[]>;
};

export type WalletDefaultPaymentCard = {
  __typename?: "PaymentCard";

  id: Maybe<string>;

  brand: Maybe<string>;

  last4: Maybe<string>;
};

export type WalletPaymentCards = {
  __typename?: "PaymentCard";

  id: Maybe<string>;

  brand: Maybe<string>;

  last4: Maybe<string>;
};

export type WalletAddOnPlans = {
  __typename?: "AddOnPlan";

  id: Maybe<string>;

  name: Maybe<string>;

  amount: Maybe<number>;
};

export type WalletAddOns = {
  __typename?: "AddOn";

  subscriptionId: Maybe<string>;

  planId: Maybe<string>;

  name: Maybe<string>;
};

export type WalletInvoices = {
  __typename?: "Invoice";

  id: Maybe<string>;

  startDatetime: Maybe<DateTimeScalar>;

  endDatetime: Maybe<DateTimeScalar>;

  url: Maybe<string>;
};

export type CreateDomainVariables = {
  label: string;
};

export type CreateDomainMutation = {
  __typename?: "Mutation";

  createDomain: Maybe<CreateDomainCreateDomain>;
};

export type CreateDomainCreateDomain = {
  __typename?: "CreateDomainPayload";

  domain: Maybe<CreateDomainDomain>;
};

export type CreateDomainDomain = {
  __typename?: "DomainNode";

  id: string;
};

export type AddPaymentCardsVariables = {
  domainId: string;
  sourceTokens: string[];
  defaultSourceToken?: Maybe<string>;
  clientMutationId?: Maybe<string>;
};

export type AddPaymentCardsMutation = {
  __typename?: "Mutation";

  addPaymentCards: Maybe<AddPaymentCardsAddPaymentCards>;
};

export type AddPaymentCardsAddPaymentCards = {
  __typename?: "AddPaymentCardsPayload";

  domain: Maybe<AddPaymentCardsDomain>;
};

export type AddPaymentCardsDomain = {
  __typename?: "DomainNode";

  id: string;

  paymentCardCount: Maybe<number>;

  defaultPaymentCard: Maybe<AddPaymentCardsDefaultPaymentCard>;

  paymentCards: Maybe<AddPaymentCardsPaymentCards[]>;
};

export type AddPaymentCardsDefaultPaymentCard = {
  __typename?: "PaymentCard";

  id: Maybe<string>;

  brand: Maybe<string>;

  last4: Maybe<string>;
};

export type AddPaymentCardsPaymentCards = {
  __typename?: "PaymentCard";

  id: Maybe<string>;

  brand: Maybe<string>;

  last4: Maybe<string>;
};

export type AddCreditsVariables = {
  domainId: string;
  credits: number;
};

export type AddCreditsMutation = {
  __typename?: "Mutation";

  addCredits: Maybe<AddCreditsAddCredits>;
};

export type AddCreditsAddCredits = {
  __typename?: "AddCreditsPayload";

  domain: Maybe<AddCreditsDomain>;
};

export type AddCreditsDomain = {
  __typename?: "DomainNode";

  id: string;

  credits: Maybe<number>;
};

export type SetDefaultPaymentCardVariables = {
  domainId: string;
  cardId: string;
};

export type SetDefaultPaymentCardMutation = {
  __typename?: "Mutation";

  setDefaultPaymentCard: Maybe<SetDefaultPaymentCardSetDefaultPaymentCard>;
};

export type SetDefaultPaymentCardSetDefaultPaymentCard = {
  __typename?: "SetDefaultPaymentCardPayload";

  domain: Maybe<SetDefaultPaymentCardDomain>;
};

export type SetDefaultPaymentCardDomain = {
  __typename?: "DomainNode";

  id: string;

  defaultPaymentCard: Maybe<SetDefaultPaymentCardDefaultPaymentCard>;
};

export type SetDefaultPaymentCardDefaultPaymentCard = {
  __typename?: "PaymentCard";

  id: Maybe<string>;

  brand: Maybe<string>;

  last4: Maybe<string>;
};

export type DeletePaymentCardsVariables = {
  domainId: string;
  cardIds: string[];
};

export type DeletePaymentCardsMutation = {
  __typename?: "Mutation";

  deletePaymentCards: Maybe<DeletePaymentCardsDeletePaymentCards>;
};

export type DeletePaymentCardsDeletePaymentCards = {
  __typename?: "DeletePaymentCardsPayload";

  domain: Maybe<DeletePaymentCardsDomain>;
};

export type DeletePaymentCardsDomain = {
  __typename?: "DomainNode";

  id: string;

  paymentCardCount: Maybe<number>;

  paymentCards: Maybe<DeletePaymentCardsPaymentCards[]>;

  defaultPaymentCard: Maybe<DeletePaymentCardsDefaultPaymentCard>;
};

export type DeletePaymentCardsPaymentCards = {
  __typename?: "PaymentCard";

  id: Maybe<string>;

  brand: Maybe<string>;

  last4: Maybe<string>;
};

export type DeletePaymentCardsDefaultPaymentCard = {
  __typename?: "PaymentCard";

  id: Maybe<string>;

  brand: Maybe<string>;

  last4: Maybe<string>;
};

export type CreateAddOnsVariables = {
  domainId: string;
  addOnPlanIds: string[];
  clientMutationId?: Maybe<string>;
};

export type CreateAddOnsMutation = {
  __typename?: "Mutation";

  createAddOns: Maybe<CreateAddOnsCreateAddOns>;
};

export type CreateAddOnsCreateAddOns = {
  __typename?: "CreateAddOnsPayload";

  domain: Maybe<CreateAddOnsDomain>;
};

export type CreateAddOnsDomain = {
  __typename?: "DomainNode";

  id: string;

  credits: Maybe<number>;

  addOnPlans: Maybe<CreateAddOnsAddOnPlans[]>;

  addOns: Maybe<CreateAddOnsAddOns[]>;
};

export type CreateAddOnsAddOnPlans = {
  __typename?: "AddOnPlan";

  id: Maybe<string>;

  name: Maybe<string>;

  amount: Maybe<number>;
};

export type CreateAddOnsAddOns = {
  __typename?: "AddOn";

  subscriptionId: Maybe<string>;

  planId: Maybe<string>;

  name: Maybe<string>;
};

export type DeleteAddOnsVariables = {
  domainId: string;
  subscriptionIds: string[];
  clientMutationId?: Maybe<string>;
};

export type DeleteAddOnsMutation = {
  __typename?: "Mutation";

  deleteAddOns: Maybe<DeleteAddOnsDeleteAddOns>;
};

export type DeleteAddOnsDeleteAddOns = {
  __typename?: "DeleteAddOnsPayload";

  domain: Maybe<DeleteAddOnsDomain>;
};

export type DeleteAddOnsDomain = {
  __typename?: "DomainNode";

  id: string;

  credits: Maybe<number>;

  addOns: Maybe<DeleteAddOnsAddOns[]>;
};

export type DeleteAddOnsAddOns = {
  __typename?: "AddOn";

  subscriptionId: Maybe<string>;

  planId: Maybe<string>;

  name: Maybe<string>;
};

export type ProductsVariables = {
  domainId: string;
  first: number;
  cursor?: Maybe<string>;
  searchFilter?: Maybe<string>;
  orderBy?: Maybe<string>;
};

export type ProductsQuery = {
  __typename?: "Query";

  node: Maybe<ProductsNode>;
};

export type ProductsNode = ProductsDomainNodeInlineFragment;

export type ProductsDomainNodeInlineFragment = {
  __typename?: "DomainNode";

  products: Maybe<ProductsProducts>;
};

export type ProductsProducts = {
  __typename?: "ProductNodeConnection";

  pageInfo: ProductsPageInfo;

  edges: ProductsEdges[];
};

export type ProductsPageInfo = {
  __typename?: "PageInfo";

  startCursor: Maybe<string>;

  endCursor: Maybe<string>;

  hasNextPage: boolean;
};

export type ProductsEdges = {
  __typename?: "ProductNodeEdge";

  node: Maybe<Products_Node>;
};

export type Products_Node = {
  __typename?: "ProductNode";

  name: string;

  id: string;

  description: Maybe<string>;

  gender: Maybe<number>;

  variantCount: Maybe<number>;

  quantity: Maybe<number>;

  activeCampaignCount: Maybe<number>;

  images: Maybe<ProductsImages>;
};

export type ProductsImages = {
  __typename?: "ProductImageNodeConnection";

  edges: Products_Edges[];
};

export type Products_Edges = {
  __typename?: "ProductImageNodeEdge";

  node: Maybe<Products__Node>;
};

export type Products__Node = {
  __typename?: "ProductImageNode";

  id: string;

  image: string;
};

export type ProductVariables = {
  productId: string;
};

export type ProductQuery = {
  __typename?: "Query";

  node: Maybe<ProductNode>;
};

export type ProductProductNodeInlineFragment = {
  __typename?: "ProductNode";

  id: string;

  name: string;

  description: Maybe<string>;

  gender: Maybe<number>;

  htsCode: Maybe<string>;

  attributes: Maybe<GenericScalar>;

  stripeId: string;

  domain: ProductDomain;

  skus: Maybe<ProductSkus>;

  images: Maybe<ProductImages>;
};

export type ProductDomain = {
  __typename?: "DomainNode";

  id: string;
};

export type ProductSkus = {
  __typename?: "SkuNodeConnection";

  edges: ProductEdges[];
};

export type ProductEdges = {
  __typename?: "SkuNodeEdge";

  node: Maybe<Product_Node>;
};

export type Product_Node = {
  __typename?: "SkuNode";

  id: string;

  stripeId: string;

  sku: Maybe<string>;

  attributes: Maybe<GenericScalar>;

  basePrice: number;

  salePrice: Maybe<number>;

  quantity: Maybe<number>;

  unitOfWeight: Maybe<number>;

  weight: Maybe<number>;

  unitOfDimensions: Maybe<number>;

  height: Maybe<number>;

  width: Maybe<number>;

  length: Maybe<number>;

  image: Maybe<string>;
};

export type ProductImages = {
  __typename?: "ProductImageNodeConnection";

  edges: Product_Edges[];
};

export type Product_Edges = {
  __typename?: "ProductImageNodeEdge";

  node: Maybe<Product__Node>;
};

export type Product__Node = {
  __typename?: "ProductImageNode";

  id: string;

  image: string;
};

export type CreateProductVariables = {
  domainId: string;
  name: string;
  description?: Maybe<string>;
  gender?: Maybe<number>;
  htsCode?: Maybe<string>;
  attributes?: Maybe<AttributesInputObject[]>;
};

export type CreateProductMutation = {
  __typename?: "Mutation";

  createProduct: Maybe<CreateProductCreateProduct>;
};

export type CreateProductCreateProduct = {
  __typename?: "CreateProductPayload";

  product: Maybe<CreateProductProduct>;
};

export type CreateProductProduct = {
  __typename?: "ProductNode";

  id: string;

  stripeId: string;
};

export type CreateSkuVariables = {
  domainId: string;
  productId?: Maybe<string>;
  stripeProductId?: Maybe<string>;
  skus: CreateSkuInputObject[];
};

export type CreateSkuMutation = {
  __typename?: "Mutation";

  createSku: Maybe<CreateSkuCreateSku>;
};

export type CreateSkuCreateSku = {
  __typename?: "CreateSkuPayload";

  skus: Maybe<CreateSkuSkus[]>;
};

export type CreateSkuSkus = {
  __typename?: "SkuNode";

  id: string;
};

export type CreateOrUpdateSkusVariables = {
  domainId: string;
  productId?: Maybe<string>;
  stripeProductId?: Maybe<string>;
  skus?: Maybe<CreateOrUpdateSkusInputObject[]>;
};

export type CreateOrUpdateSkusMutation = {
  __typename?: "Mutation";

  createOrUpdateSkus: Maybe<CreateOrUpdateSkusCreateOrUpdateSkus>;
};

export type CreateOrUpdateSkusCreateOrUpdateSkus = {
  __typename?: "CreateOrUpdateSkusPayload";

  skus: Maybe<CreateOrUpdateSkusSkus[]>;
};

export type CreateOrUpdateSkusSkus = {
  __typename?: "SkuNode";

  id: string;
};

export type UploadProductImageVariables = {
  domainId: string;
  productId: string;
  images: ProductImageInputObject[];
};

export type UploadProductImageMutation = {
  __typename?: "Mutation";

  uploadProductImage: Maybe<UploadProductImageUploadProductImage>;
};

export type UploadProductImageUploadProductImage = {
  __typename?: "UploadProductImagePayload";

  product: Maybe<UploadProductImageProduct>;
};

export type UploadProductImageProduct = {
  __typename?: "ProductNode";

  images: Maybe<UploadProductImageImages>;
};

export type UploadProductImageImages = {
  __typename?: "ProductImageNodeConnection";

  edges: UploadProductImageEdges[];
};

export type UploadProductImageEdges = {
  __typename?: "ProductImageNodeEdge";

  node: Maybe<UploadProductImageNode>;
};

export type UploadProductImageNode = {
  __typename?: "ProductImageNode";

  id: string;

  image: string;

  orderingPosition: Maybe<number>;
};

export type UploadSkuImageVariables = {
  domainId: string;
  skuId: string;
  image: Upload;
};

export type UploadSkuImageMutation = {
  __typename?: "Mutation";

  uploadSkuImage: Maybe<UploadSkuImageUploadSkuImage>;
};

export type UploadSkuImageUploadSkuImage = {
  __typename?: "UploadSkuImagePayload";

  sku: Maybe<UploadSkuImageSku>;
};

export type UploadSkuImageSku = {
  __typename?: "SkuNode";

  id: string;
};

export type DeleteSkuVariables = {
  domainId: string;
  skus?: Maybe<RemoveSkuInputObject[]>;
};

export type DeleteSkuMutation = {
  __typename?: "Mutation";

  deleteSku: Maybe<DeleteSkuDeleteSku>;
};

export type DeleteSkuDeleteSku = {
  __typename?: "DeleteSkuPayload";

  success: Maybe<boolean>;
};

export type UpdateProductVariables = {
  domainId: string;
  id?: Maybe<string>;
  stripeId?: Maybe<string>;
  name?: Maybe<string>;
  description?: Maybe<string>;
  gender?: Maybe<number>;
  htsCode?: Maybe<string>;
};

export type UpdateProductMutation = {
  __typename?: "Mutation";

  updateProduct: Maybe<UpdateProductUpdateProduct>;
};

export type UpdateProductUpdateProduct = {
  __typename?: "UpdateProductPayload";

  product: Maybe<UpdateProductProduct>;
};

export type UpdateProductProduct = {
  __typename?: "ProductNode";

  id: string;

  stripeId: string;
};

export type UpdateProductAttributesVariables = {
  domainId: string;
  productId?: Maybe<string>;
  stripeProductId?: Maybe<string>;
  attributes: AttributesInputObject[];
};

export type UpdateProductAttributesMutation = {
  __typename?: "Mutation";

  updateProductAttributes: Maybe<
    UpdateProductAttributesUpdateProductAttributes
  >;
};

export type UpdateProductAttributesUpdateProductAttributes = {
  __typename?: "UpdateProductAttributesPayload";

  product: Maybe<UpdateProductAttributesProduct>;
};

export type UpdateProductAttributesProduct = {
  __typename?: "ProductNode";

  id: string;

  stripeId: string;
};

export type DeleteAttributeVariables = {
  domainId: string;
  productId?: Maybe<string>;
  stripeProductId?: Maybe<string>;
  attributeKey: string;
};

export type DeleteAttributeMutation = {
  __typename?: "Mutation";

  deleteAttribute: Maybe<DeleteAttributeDeleteAttribute>;
};

export type DeleteAttributeDeleteAttribute = {
  __typename?: "DeleteAttributePayload";

  product: Maybe<DeleteAttributeProduct>;
};

export type DeleteAttributeProduct = {
  __typename?: "ProductNode";

  attributes: Maybe<GenericScalar>;
};

export type DeleteAttributeValueVariables = {
  domainId: string;
  productId?: Maybe<string>;
  stripeProductId?: Maybe<string>;
  attribute: AttributeInputObject;
};

export type DeleteAttributeValueMutation = {
  __typename?: "Mutation";

  deleteAttributeValue: Maybe<DeleteAttributeValueDeleteAttributeValue>;
};

export type DeleteAttributeValueDeleteAttributeValue = {
  __typename?: "DeleteAttributeValuePayload";

  product: Maybe<DeleteAttributeValueProduct>;
};

export type DeleteAttributeValueProduct = {
  __typename?: "ProductNode";

  attributes: Maybe<GenericScalar>;
};

export type SkuCountVariables = {
  productId: string;
  attributeKey?: Maybe<string>;
  attributeValue?: Maybe<string>;
};

export type SkuCountQuery = {
  __typename?: "Query";

  node: Maybe<SkuCountNode>;
};

export type SkuCountNode = SkuCountProductNodeInlineFragment;

export type SkuCountProductNodeInlineFragment = {
  __typename?: "ProductNode";

  id: string;

  skuCount: Maybe<number>;
};

export type UpdateAttributesVariables = {
  domainId: string;
  productId?: Maybe<string>;
  stripeProductId?: Maybe<string>;
  renames?: Maybe<RenameAttributeKeyInput[]>;
  additions?: Maybe<AddAttributeInput[]>;
};

export type UpdateAttributesMutation = {
  __typename?: "Mutation";

  updateAttributes: Maybe<UpdateAttributesUpdateAttributes>;
};

export type UpdateAttributesUpdateAttributes = {
  __typename?: "UpdateAttributesPayload";

  product: Maybe<UpdateAttributesProduct>;
};

export type UpdateAttributesProduct = {
  __typename?: "ProductNode";

  id: string;
};

export type OrderVariables = {
  orderId: string;
};

export type OrderQuery = {
  __typename?: "Query";

  node: Maybe<OrderNode>;
};

export type OrderOrderNodeInlineFragment = {
  __typename?: "OrderNode";

  id: string;

  createdOn: DateTime;

  stripeId: string;

  customerName: string;

  customerEmail: string;

  customerPhoneNumber: string;

  shippingAddress1: string;

  shippingAddress2: Maybe<string>;

  shippingCity: string;

  shippingState: string;

  shippingZipCode: string;

  shippingCountry: string;

  shippingLabelUrl: Maybe<string>;

  packingSlipUrl: Maybe<string>;

  paymentMethod: Maybe<string>;

  shippingMethod: Maybe<string>;

  shippingTrackingNumber: Maybe<string>;

  shippingTrackingUrl: Maybe<string>;

  orderStatus: number;

  orderTotal: number;

  tax: number;

  shippingCost: number;

  vendorTotal: number;

  items: Maybe<OrderItems[]>;

  campaigns: Maybe<OrderCampaigns>;
};

export type OrderItems = {
  __typename?: "OrderSkuNode";

  id: string;

  sku: OrderSku;

  quantity: number;
};

export type OrderSku = {
  __typename?: "SkuNode";

  basePrice: number;

  salePrice: Maybe<number>;

  attributes: Maybe<GenericScalar>;

  image: Maybe<string>;

  product: OrderProduct;
};

export type OrderProduct = {
  __typename?: "ProductNode";

  name: string;

  gender: Maybe<number>;
};

export type OrderCampaigns = {
  __typename?: "CampaignNodeConnection";

  edges: OrderEdges[];
};

export type OrderEdges = {
  __typename?: "CampaignNodeEdge";

  node: Maybe<Order_Node>;
};

export type Order_Node = {
  __typename?: "CampaignNode";

  type: number;

  name: string;
};

export type OrdersVariables = {
  first?: Maybe<number>;
  cursor?: Maybe<string>;
  orderStatusFilter?: Maybe<number>;
  searchFilter?: Maybe<string>;
  orderBy?: Maybe<string>;
  domainId: string;
};

export type OrdersQuery = {
  __typename?: "Query";

  node: Maybe<OrdersNode>;
};

export type OrdersNode = OrdersDomainNodeInlineFragment;

export type OrdersDomainNodeInlineFragment = {
  __typename?: "DomainNode";

  orders: Maybe<OrdersOrders>;
};

export type OrdersOrders = {
  __typename?: "OrderNodeConnection";

  pageInfo: OrdersPageInfo;

  edges: OrdersEdges[];
};

export type OrdersPageInfo = {
  __typename?: "PageInfo";

  startCursor: Maybe<string>;

  endCursor: Maybe<string>;

  hasNextPage: boolean;
};

export type OrdersEdges = {
  __typename?: "OrderNodeEdge";

  node: Maybe<Orders_Node>;
};

export type Orders_Node = {
  __typename?: "OrderNode";

  id: string;

  stripeId: string;

  customerName: string;

  orderStatus: number;

  orderTotal: number;
};

export type LatestOrdersVariables = {
  last?: Maybe<number>;
  domainId: string;
};

export type LatestOrdersQuery = {
  __typename?: "Query";

  node: Maybe<LatestOrdersNode>;
};

export type LatestOrdersNode = LatestOrdersDomainNodeInlineFragment;

export type LatestOrdersDomainNodeInlineFragment = {
  __typename?: "DomainNode";

  orders: Maybe<LatestOrdersOrders>;
};

export type LatestOrdersOrders = {
  __typename?: "OrderNodeConnection";

  edges: LatestOrdersEdges[];
};

export type LatestOrdersEdges = {
  __typename?: "OrderNodeEdge";

  node: Maybe<LatestOrders_Node>;
};

export type LatestOrders_Node = {
  __typename?: "OrderNode";

  id: string;

  stripeId: string;

  customerName: string;

  orderStatus: number;

  orderTotal: number;
};

export type CompanyNodeVariables = {
  id: string;
};

export type CompanyNodeQuery = {
  __typename?: "Query";

  domains: Maybe<CompanyNodeDomains>;
};

export type CompanyNodeDomains = {
  __typename?: "DomainNodeConnection";

  edges: CompanyNodeEdges[];
};

export type CompanyNodeEdges = {
  __typename?: "DomainNodeEdge";

  node: Maybe<CompanyNodeNode>;
};

export type CompanyNodeNode = {
  __typename?: "DomainNode";

  id: string;

  freeShippingThreshold: Maybe<number>;

  company: Maybe<CompanyNodeCompany>;

  promotions: Maybe<CompanyNodePromotions>;

  campaignTrackingPixels: Maybe<CompanyNodeCampaignTrackingPixels>;
};

export type CompanyNodeCompany = {
  __typename?: "CompanyNode";

  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  name: string;

  email: string;

  address: Maybe<CompanyNodeAddress>;

  customerSupportNumber: Maybe<string>;

  currency: string;

  returnPolicy: Maybe<string>;

  sizeGuide: Maybe<string>;

  avatar: Maybe<string>;
};

export type CompanyNodeAddress = {
  __typename?: "ShippingLocationNode";

  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  name: string;

  address1: Maybe<string>;

  address2: Maybe<string>;

  city: Maybe<string>;

  state: Maybe<string>;

  zipCode: Maybe<string>;

  country: Maybe<string>;
};

export type CompanyNodePromotions = {
  __typename?: "PromotionNodeConnection";

  edges: CompanyNode_Edges[];
};

export type CompanyNode_Edges = {
  __typename?: "PromotionNodeEdge";

  node: Maybe<CompanyNode_Node>;
};

export type CompanyNode_Node = {
  __typename?: "PromotionNode";

  id: string;

  createdOn: DateTime;

  modifiedOn: DateTime;

  label: string;

  startDatetime: DateTime;

  endDatetime: DateTime;

  discountValue: number;

  discountType: number;

  stripeCouponCode: string;
};

export type CompanyNodeCampaignTrackingPixels = {
  __typename?: "CampaignTrackingPixelNodeConnection";

  edges: CompanyNode__Edges[];
};

export type CompanyNode__Edges = {
  __typename?: "CampaignTrackingPixelNodeEdge";

  node: Maybe<CompanyNode__Node>;
};

export type CompanyNode__Node = {
  __typename?: "CampaignTrackingPixelNode";

  platform: number;

  pixel: string;

  modifiedOn: DateTime;

  createdOn: DateTime;
};

export type ShippingLocationsVariables = {
  id: string;
};

export type ShippingLocationsQuery = {
  __typename?: "Query";

  domains: Maybe<ShippingLocationsDomains>;
};

export type ShippingLocationsDomains = {
  __typename?: "DomainNodeConnection";

  edges: ShippingLocationsEdges[];
};

export type ShippingLocationsEdges = {
  __typename?: "DomainNodeEdge";

  node: Maybe<ShippingLocationsNode>;
};

export type ShippingLocationsNode = {
  __typename?: "DomainNode";

  id: string;

  shippingLocations: Maybe<ShippingLocationsShippingLocations>;
};

export type ShippingLocationsShippingLocations = {
  __typename?: "ShippingLocationNodeConnection";

  edges: ShippingLocations_Edges[];
};

export type ShippingLocations_Edges = {
  __typename?: "ShippingLocationNodeEdge";

  node: Maybe<ShippingLocations_Node>;
};

export type ShippingLocations_Node = {
  __typename?: "ShippingLocationNode";

  id: string;

  name: string;

  address1: Maybe<string>;

  address2: Maybe<string>;

  city: Maybe<string>;

  state: Maybe<string>;

  zipCode: Maybe<string>;

  country: Maybe<string>;

  email: Maybe<string>;

  phoneNumber: Maybe<string>;
};

export type UsersVariables = {
  domainId: string;
};

export type UsersQuery = {
  __typename?: "Query";

  domains: Maybe<UsersDomains>;
};

export type UsersDomains = {
  __typename?: "DomainNodeConnection";

  edges: UsersEdges[];
};

export type UsersEdges = {
  __typename?: "DomainNodeEdge";

  node: Maybe<UsersNode>;
};

export type UsersNode = {
  __typename?: "DomainNode";

  id: string;

  users: Maybe<UsersUsers>;
};

export type UsersUsers = {
  __typename?: "UserNodeConnection";

  edges: Users_Edges[];
};

export type Users_Edges = {
  __typename?: "UserNodeEdge";

  node: Maybe<Users_Node>;
};

export type Users_Node = {
  __typename?: "UserNode";

  id: string;

  isSuperuser: boolean;

  firstName: Maybe<string>;

  lastName: Maybe<string>;

  email: string;

  invitationToken: Maybe<string>;
};

export type UploadCompanyAvatarVariables = {
  domainId: string;
  image: Upload;
};

export type UploadCompanyAvatarMutation = {
  __typename?: "Mutation";

  uploadCompanyAvatar: Maybe<UploadCompanyAvatarUploadCompanyAvatar>;
};

export type UploadCompanyAvatarUploadCompanyAvatar = {
  __typename?: "UploadCompanyAvatarPayload";

  company: Maybe<UploadCompanyAvatarCompany>;
};

export type UploadCompanyAvatarCompany = {
  __typename?: "CompanyNode";

  avatar: Maybe<string>;
};

export type CreateCampaignTrackingPixelVariables = {
  domainId: string;
  platform: number;
  pixel: string;
};

export type CreateCampaignTrackingPixelMutation = {
  __typename?: "Mutation";

  createCampaignTrackingPixel: Maybe<
    CreateCampaignTrackingPixelCreateCampaignTrackingPixel
  >;
};

export type CreateCampaignTrackingPixelCreateCampaignTrackingPixel = {
  __typename?: "CreateCampaignTrackingPixelPayload";

  campaignTrackingPixel: Maybe<
    CreateCampaignTrackingPixelCampaignTrackingPixel
  >;
};

export type CreateCampaignTrackingPixelCampaignTrackingPixel = {
  __typename?: "CampaignTrackingPixelNode";

  id: string;

  platform: number;

  pixel: string;
};

export type UpdateCompanyVariables = {
  domainId: string;
  name?: Maybe<string>;
  email?: Maybe<string>;
  customerSupportNumber?: Maybe<string>;
  returnPolicy?: Maybe<string>;
  sizeGuide?: Maybe<string>;
  currency?: Maybe<string>;
};

export type UpdateCompanyMutation = {
  __typename?: "Mutation";

  updateCompany: Maybe<UpdateCompanyUpdateCompany>;
};

export type UpdateCompanyUpdateCompany = {
  __typename?: "UpdateCompanyPayload";

  company: Maybe<UpdateCompanyCompany>;
};

export type UpdateCompanyCompany = {
  __typename?: "CompanyNode";

  id: string;

  name: string;

  email: string;

  customerSupportNumber: Maybe<string>;

  currency: string;

  address: Maybe<UpdateCompanyAddress>;

  returnPolicy: Maybe<string>;

  sizeGuide: Maybe<string>;
};

export type UpdateCompanyAddress = {
  __typename?: "ShippingLocationNode";

  id: string;

  address1: Maybe<string>;

  address2: Maybe<string>;

  zipCode: Maybe<string>;

  city: Maybe<string>;

  country: Maybe<string>;

  state: Maybe<string>;
};

export type CreateShippingLocationVariables = {
  domainId: string;
  shippingLocations: CreateShippingLocationInputObject[];
};

export type CreateShippingLocationMutation = {
  __typename?: "Mutation";

  createShippingLocation: Maybe<CreateShippingLocationCreateShippingLocation>;
};

export type CreateShippingLocationCreateShippingLocation = {
  __typename?: "CreateShippingLocationPayload";

  domain: Maybe<CreateShippingLocationDomain>;
};

export type CreateShippingLocationDomain = {
  __typename?: "DomainNode";

  id: string;

  label: string;
};

export type UpdateShippingLocationVariables = {
  domainId: string;
  shippingLocations: UpdateShippingLocationInputObject[];
};

export type UpdateShippingLocationMutation = {
  __typename?: "Mutation";

  updateShippingLocation: Maybe<UpdateShippingLocationUpdateShippingLocation>;
};

export type UpdateShippingLocationUpdateShippingLocation = {
  __typename?: "UpdateShippingLocationPayload";

  domain: Maybe<UpdateShippingLocationDomain>;
};

export type UpdateShippingLocationDomain = {
  __typename?: "DomainNode";

  id: string;

  label: string;
};

export type DeleteShippingLocationVariables = {
  domainId: string;
  shippingLocationIds: string[];
};

export type DeleteShippingLocationMutation = {
  __typename?: "Mutation";

  deleteShippingLocation: Maybe<DeleteShippingLocationDeleteShippingLocation>;
};

export type DeleteShippingLocationDeleteShippingLocation = {
  __typename?: "DeleteShippingLocationPayload";

  success: Maybe<boolean>;
};

export type AddUserVariables = {
  domainId: string;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  email: string;
};

export type AddUserMutation = {
  __typename?: "Mutation";

  addUser: Maybe<AddUserAddUser>;
};

export type AddUserAddUser = {
  __typename?: "AddUserPayload";

  user: Maybe<AddUserUser>;
};

export type AddUserUser = {
  __typename?: "UserNode";

  id: string;
};

export type UpdateUserVariables = {
  domainId: string;
  id: string;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
};

export type UpdateUserMutation = {
  __typename?: "Mutation";

  updateUser: Maybe<UpdateUserUpdateUser>;
};

export type UpdateUserUpdateUser = {
  __typename?: "UpdateUserPayload";

  user: Maybe<UpdateUserUser>;
};

export type UpdateUserUser = {
  __typename?: "UserNode";

  id: string;
};

export type RemoveUserFromDomainVariables = {
  domainId: string;
  id: string;
};

export type RemoveUserFromDomainMutation = {
  __typename?: "Mutation";

  removeUserFromDomain: Maybe<RemoveUserFromDomainRemoveUserFromDomain>;
};

export type RemoveUserFromDomainRemoveUserFromDomain = {
  __typename?: "RemoveUserFromDomainPayload";

  success: Maybe<boolean>;
};

export type UpdateDomainVariables = {
  id: string;
  freeShippingThreshold?: Maybe<number>;
};

export type UpdateDomainMutation = {
  __typename?: "Mutation";

  updateDomain: Maybe<UpdateDomainUpdateDomain>;
};

export type UpdateDomainUpdateDomain = {
  __typename?: "UpdateDomainPayload";

  domain: Maybe<UpdateDomainDomain>;
};

export type UpdateDomainDomain = {
  __typename?: "DomainNode";

  label: string;

  id: string;

  freeShippingThreshold: Maybe<number>;
};

export type RemoveFreeShippingThresholdVariables = {
  domainId: string;
};

export type RemoveFreeShippingThresholdMutation = {
  __typename?: "Mutation";

  removeFreeShippingThreshold: Maybe<
    RemoveFreeShippingThresholdRemoveFreeShippingThreshold
  >;
};

export type RemoveFreeShippingThresholdRemoveFreeShippingThreshold = {
  __typename?: "RemoveFreeShippingThresholdPayload";

  success: Maybe<boolean>;
};

export type CreatePromotionVariables = {
  domainId: string;
  promotions: CreatePromotionInputObject[];
};

export type CreatePromotionMutation = {
  __typename?: "Mutation";

  createPromotion: Maybe<CreatePromotionCreatePromotion>;
};

export type CreatePromotionCreatePromotion = {
  __typename?: "CreatePromotionPayload";

  promotions: Maybe<CreatePromotionPromotions[]>;
};

export type CreatePromotionPromotions = {
  __typename?: "PromotionNode";

  id: string;
};

export type DeletePromotionVariables = {
  domainId: string;
  promotionIds: string[];
};

export type DeletePromotionMutation = {
  __typename?: "Mutation";

  deletePromotion: Maybe<DeletePromotionDeletePromotion>;
};

export type DeletePromotionDeletePromotion = {
  __typename?: "DeletePromotionPayload";

  success: Maybe<boolean>;
};
