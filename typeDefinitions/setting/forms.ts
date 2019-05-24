import { UserNode } from "../__generated__/components";

export interface SettingFormValues {
  [key: string]: any;
  avatarContent?: string;
  avatar?: string;
  preview?: string
  companyName?: string;
  customerSupportNumber?: string;
  address1?: string;
  city?: string;
  zipCode?: string;
  email?: string;
  currency?: string;
  address2?: string;
  state?: string;
  country?: string;
  facebookPixelId?: string;
  returnPolicy?: string;
  snapchatPixelId?: string;
  sizeGuide?: string;
  deleteLocations?: Array<string>;
  deletePromotions?: Array<string>;
  allPromotionIds?: Array<string>;
  deleteUsers?: Array<string>;
  existingUsers?: UserNode;
  activatedPromo?: boolean;
  activatedFreeShipping?: boolean;
  activatedFlatShipping?: boolean;
  activatedStripe?: boolean;
  activatedPaypal?: boolean;
  minimumOrderValue?: number;
}

export interface LocationFormValues {
  [key: string]: any;
  locationAdress1?: string;
  locationAdress2?: string;
  locationCity?: string;
  locationCountry?: string;
  locationCurrency?: string;
  locationEmail?: string;
  locationName?: string;
  locationPhoneNumber?: string;
  locationState?: string;
  locationZipCode?: string;
}
export interface UserFormValues {
  [key: string]: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  owner?: boolean;
}
export interface PromotionFormValues {
  [key: string]: any;
  promoCode?: string;
  discount?: number;
  unitOfDiscount?: string;
  firstDateTime?: string;
  lastDateTime?: string;
}