import { AttributesInputObject } from "../typeDefinitions/__generated__/components";

export const CREATE_PRODUCT_IMAGE_COUNT_LIMIT = 5;
export const CREATE_PRODUCT_IMAGE_SIZE_LIMIT = 700000;

export const defaultAttributes: AttributesInputObject[] = [
  {
    attributeKey: "Size",
    attributeValues: []
  },
  {
    attributeKey: "Color",
    attributeValues: []
  },
  {
    attributeKey: "Material",
    attributeValues: []
  }
];

export const genderCodesAndLabels = [
  {
    id: 1,
    label: "Hers"
  },
  {
    id: 2,
    label: "His"
  },
  {
    id: 3,
    label: "Boys"
  },
  {
    id: 4,
    label: "Girls"
  },
  {
    id: 5,
    label: "Everyone"
  }
];

export const defaultDropDownValue = 1;

export const unitsOfWeight = [
  { label: "OZ", value: defaultDropDownValue },
  { label: "G", value: 2 },
  { label: "LB", value: 3 },
  { label: "KG", value: 4 }
];
export const defaultUnitOfWeight = unitsOfWeight[0];

export const unitsOfDimension = [
  { label: "IN", value: defaultDropDownValue },
  { label: "CM", value: 2 }
];
export const defaultUnitOfDimension = unitsOfDimension[0];

export const campaignTypes = [
  {
    id: 1,
    label: "Buy Now"
  },
  { id: 2, label: "QR Code" }
];

export const campaignFeedTypes = [
  {
    id: 1,
    label: "Facebook"
  },
  { id: 2, label: "Snapchat" }
];

const KeyCodes = {
  comma: 188,
  enter: 13,
  tab: 9
};

export const attributeValueDelimiters = [
  KeyCodes.comma,
  KeyCodes.enter,
  KeyCodes.tab
];

export const minimumPriceInCents = 50;
export const minimumPriceInDollars = 0.5;
export const minimumDimensionSize = 0.0;
export const minimumQuantity = 0;

export const BASE_IMAGE_URL = process.env.REACT_APP_ELLIOT_BASE_IMAGE_URL;
