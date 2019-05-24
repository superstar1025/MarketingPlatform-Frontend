import { get } from "lodash/fp";

import { settingDetailFormFields } from "../constants/formFields";

export const getSettingInitialValue = (
  firstInitialValues: Object,
  avatar: string,
) => {
  const company = get("company")(firstInitialValues);

  let facebookPixelId = "", snapChatPixelId = "";

  const campaignTrackingPixels = get("campaignTrackingPixels.edges")(firstInitialValues);
  if (campaignTrackingPixels) {
    for (let i=0; i < campaignTrackingPixels.length; i++) {
        const platform = get('node.platform')(campaignTrackingPixels[i]);
        if (platform === 1) {
          facebookPixelId = get('node.pixel')(campaignTrackingPixels[i])
        } else {
          snapChatPixelId = get('node.pixel')(campaignTrackingPixels[i])
        }
    }
  }
  const promotions = get("promotions.edges")(firstInitialValues);

  const freeShippingThreshold = get("freeShippingThreshold")(firstInitialValues);

  const currency = get([settingDetailFormFields.businessDetails.currency])(
    company
  );

  const returnPolicy = get([
    settingDetailFormFields.keyInformation.returnPolicy
  ])(company);

  const sizeGuide = get([settingDetailFormFields.keyInformation.sizeGuide])(
    company
  );

  const customerSupportNumber = get([
    settingDetailFormFields.businessDetails.customerSupportNumber
  ])(company);

  const companyName = get([
    settingDetailFormFields.businessDetails.companyName
  ])(company);

  const email = get([settingDetailFormFields.businessDetails.email])(company);

  const address = get("address")(company);

  const address1 = get([settingDetailFormFields.businessDetails.address1])(
    address
  );

  const address2 = get([settingDetailFormFields.businessDetails.address2])(
    address
  );
  const city = get([settingDetailFormFields.businessDetails.city])(address);
  const country = get([settingDetailFormFields.businessDetails.country])(
    address
  );
  const state = get([settingDetailFormFields.businessDetails.state])(address);

  const zipCode = get([settingDetailFormFields.businessDetails.zipCode])(
    address
  );

  const initialAvatar = avatar
    ? avatar
    : get([settingDetailFormFields.brandingDetails.avatar])(company);

  return {
    [settingDetailFormFields.brandingDetails.avatar]: initialAvatar
      ? [initialAvatar]
      : "",
    [settingDetailFormFields.brandingDetails.avatarContent]: companyName
      ? [companyName]
      : [""],
    [settingDetailFormFields.brandingDetails.updated]: [],
    [settingDetailFormFields.businessDetails.companyName]: companyName
      ? companyName
      : "",
    [settingDetailFormFields.businessDetails.email]: email ? email : "",
    [settingDetailFormFields.businessDetails.address1]: address1
      ? address1
      : "",
    [settingDetailFormFields.businessDetails.address2]: address2
      ? address2
      : "",
    [settingDetailFormFields.businessDetails
      .customerSupportNumber]: customerSupportNumber
      ? customerSupportNumber
      : "",
    [settingDetailFormFields.businessDetails.city]: city ? city : "",
    [settingDetailFormFields.businessDetails.zipCode]: zipCode ? zipCode : "",
    [settingDetailFormFields.businessDetails.country]: country ? country : "",
    [settingDetailFormFields.businessDetails.state]: state ? state : "",
    [settingDetailFormFields.businessDetails.currency]: currency
      ? [{ label: currency, value: currency }]
      : [""],
    [settingDetailFormFields.keyInformation.facebookPixelId]: facebookPixelId,
    [settingDetailFormFields.keyInformation.returnPolicy]: returnPolicy
      ? returnPolicy
      : "",
    [settingDetailFormFields.keyInformation.snapchatPixelId]: snapChatPixelId,
    [settingDetailFormFields.keyInformation.sizeGuide]: sizeGuide
      ? sizeGuide
      : "",
    [settingDetailFormFields.user.deleteUsers]: [],
    [settingDetailFormFields.location.deleteLocations]: [],
    [settingDetailFormFields.promotion.deletePromotions]: [],
    [settingDetailFormFields.promotion.allPromotionIds]: [],
    [settingDetailFormFields.payouts.activatedStripe]: false,
    [settingDetailFormFields.payouts.activatedPaypal]: false,
    [settingDetailFormFields.promotion.activatedPromo]: !promotions || promotions.length === 0? false : true,
    [settingDetailFormFields.shipping.activatedFlatShipping]: false,
    [settingDetailFormFields.shipping
      .activatedFreeShipping]: freeShippingThreshold ? true : false,
    [settingDetailFormFields.shipping.minimumOrderValue]: freeShippingThreshold
      ? freeShippingThreshold
      : 0
  };
};

export const getLocationInitialValue = (data: Object) => {
  if (!data) {
    return {
      [settingDetailFormFields.location.locationName]: "",
      [settingDetailFormFields.location.locationEmail]: "",
      [settingDetailFormFields.location.locationPhoneNumber]: "",
      [settingDetailFormFields.location.locationAdress1]: "",
      [settingDetailFormFields.location.locationAdress2]: "",
      [settingDetailFormFields.location.locationCity]: "",
      [settingDetailFormFields.location.locationCountry]: "",
      [settingDetailFormFields.location.locationZipCode]: "",
      [settingDetailFormFields.location.locationState]: ""
    };
  } else {
    return {
      [settingDetailFormFields.location.locationName]: get("name")(data)
        ? get("name")(data)
        : "",
      [settingDetailFormFields.location.locationEmail]: get("email")(data)
        ? get("email")(data)
        : "",
      [settingDetailFormFields.location.locationPhoneNumber]: get(
        "phoneNumber"
      )(data)
        ? get("phoneNumber")(data)
        : "",
      [settingDetailFormFields.location.locationAdress1]: get("address1")(data)
        ? get("address1")(data)
        : "",
      [settingDetailFormFields.location.locationAdress2]: get("address2")(data)
        ? get("address2")(data)
        : "",
      [settingDetailFormFields.location.locationCity]: get("city")(data)
        ? get("city")(data)
        : "",
      [settingDetailFormFields.location.locationCountry]: get("country")(data)
        ? get("country")(data)
        : "",
      [settingDetailFormFields.location.locationZipCode]: get("zipCode")(data)
        ? get("zipCode")(data)
        : "",
      [settingDetailFormFields.location.locationState]: get("state")(data)
        ? get("state")(data)
        : ""
    };
  }
};

export const getUsersFormInitialValue = (data: Object) => {
  if (data) {
    return {
      [settingDetailFormFields.user.firstName]: get("firstName")(data)
        ? get("firstName")(data)
        : "",
      [settingDetailFormFields.user.lastName]: get("lastName")(data)
        ? get("lastName")(data)
        : "",
      [settingDetailFormFields.user.email]: get("email")(data)
        ? get("email")(data)
        : "",
      [settingDetailFormFields.user.owner]: get("isSuperuser")(data)
        ? get("isSuperuser")(data)
        : false
    };
  } else {
    return {
      [settingDetailFormFields.user.firstName]: "",
      [settingDetailFormFields.user.lastName]: "",
      [settingDetailFormFields.user.email]: "",
      [settingDetailFormFields.user.owner]: false
    };
  }
};
export const getPromoFormInitialValue = (data: Object) => {
  if (data) {
    return {
      [settingDetailFormFields.promotion.promoCode]: "",
      [settingDetailFormFields.promotion.discount]: 0,
      [settingDetailFormFields.promotion.unitOfDiscount]: "%",
      [settingDetailFormFields.promotion.firstDateTime]:
        "2019-03-18T12:00:00.0",
      [settingDetailFormFields.promotion.lastDateTime]: "2019-03-18T12:00:00.0"
    };
  } else {
    return {
      [settingDetailFormFields.promotion.promoCode]: "",
      [settingDetailFormFields.promotion.discount]: 0,
      [settingDetailFormFields.promotion.unitOfDiscount]: [
        { label: "$", value: 1 }
      ],
      [settingDetailFormFields.promotion.firstDateTime]: "",
      [settingDetailFormFields.promotion.lastDateTime]: ""
    };
  }
};
