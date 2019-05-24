export const MAX_EMAIL_LENGTH = 255;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 32;
export const MAX_NAME_LENGTH = 255;

export const authenticationFormFields = {
  forgotPassword: {
    email: "email"
  },
  login: {
    email: "email",
    password: "password"
  },
  register: {
    domainLabel: "domainLabel",
    email: "email",
    firstName: "firstName",
    lastName: "lastName",
    password: "password"
  },
  resetPassword: {
    password: "password",
    passwordConfirm: "passwordConfirm"
  }
};

export const createProductFormFields = {
  title: "title",
  description: "description",
  imageUploads: "imageUploads",
  basePrice: "basePrice",
  salePrice: "salePrice",
  weight: "weight",
  unitOfWeight: "unitOfWeight",
  htsCode: "htsCode",
  unitOfDimensions: "unitOfDimensions",
  length: "length",
  width: "width",
  height: "height",
  sku: "sku",
  quantity: "quantity",
  skus: "skus",
  attributes: "attributes",
  gender: "gender"
};

export const settingDetailFormFields = {
  brandingDetails: {
    avatar: "avatar",
    avatarContent: "avatarContent",
    updated: "updated"
  },
  businessDetails: {
    companyName: "name",
    email: "email",
    customerSupportNumber: "customerSupportNumber",
    address1: "address1",
    address2: "address2",
    city: "city",
    zipCode: "zipCode",
    currency: "currency",
    state: "state",
    country: "country"
  },
  keyInformation: {
    facebookPixelId: "facebookPixelId",
    returnPolicy: "returnPolicy",
    snapchatPixelId: "snapchatPixelId",
    sizeGuide: "sizeGuide"
  },
  location: {
    locationName: "locationName",
    locationEmail: "locationEmail",
    locationPhoneNumber: "locationPhoneNumber",
    locationAdress1: "locationAdress1",
    locationAdress2: "locationAdress2",
    locationCity: "locationCity",
    locationState: "locationState",
    locationZipCode: "locationZipCode",
    locationCountry: "locationCountry",
    deleteLocations: "deleteLocations"
  },
  user: {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    owner: "owner",
    deleteUsers: "deleteUsers",
    existingUsers: "existingUsers"
  },
  payouts: {
    activatedStripe: "activatedStripe",
    activatedPaypal: "activatedPaypal"
  },
  promotion: {
    promoCode: "promoCode",
    discount: "discount",
    unitOfDiscount: "unitOfDiscount",
    firstDateTime: "firstDateTime",
    lastDateTime: "lastDateTime",
    activatedPromo: "activatedPromo",
    deletePromotions: "deletePromotions",
    allPromotionIds: "allPromotionIds"
  },
  shipping: {
    activatedFreeShipping: "activatedFreeShipping",
    activatedFlatShipping: "activatedFlatShipping",
    minimumOrderValue: "minimumOrderValue"
  }
};

export const updateProductFormFields = {
  title: "title",
  description: "description",
  images: "images",
  gender: "gender",
  htsCode: "htsCode"
};

export const updateSimpleProductFormFields = {
  title: "title",
  description: "description",
  images: "images",
  basePrice: "basePrice",
  salePrice: "salePrice",
  weight: "weight",
  unitOfWeight: "unitOfWeight",
  htsCode: "htsCode",
  unitOfDimensions: "unitOfDimensions",
  length: "length",
  width: "width",
  height: "height",
  sku: "sku",
  quantity: "quantity",
  skus: "skus",
  attributes: "attributes",
  gender: "gender"
};

export const createProductVariationsFormFields = {
  basePrice: "basePrice",
  salePrice: "salePrice",
  sku: "sku",
  quantity: "quantity",
  unitOfWeight: "unitOfWeight",
  weight: "weight",
  unitOfDimensions: "unitOfDimensions",
  length: "length",
  width: "width",
  height: "height",
  skus: "skus",
  attributes: "attributes"
};

export const createProductEditVariantFormFields = {
  tempId: "tempId",
  image: "image",
  basePrice: "basePrice",
  salePrice: "salePrice",
  weight: "weight",
  unitOfWeight: "unitOfWeight",
  unitOfDimensions: "unitOfDimensions",
  length: "length",
  width: "width",
  height: "height",
  sku: "sku",
  quantity: "quantity"
};

export const createProductReorderVariationsFormFields = {
  attributes: "attributes"
};

export const updateProductReorderVariationsFormFields = {
  ...createProductReorderVariationsFormFields
};

export const updateProductEditVariationOptionsFormFields = {
  attributes: "attributes",
  additions: "additions",
  renames: "renames",
  removals: "removals"
};

export const updateProducEditVariantFormFields = {
  ...createProductEditVariantFormFields
};

export const updateProducAddVariantFormFields = {
  ...createProductEditVariantFormFields,
  attributes: "attributes"
};

export const createDomainFormFields = {
  name: "name"
};

export const addCardFormFields = {
  defaultPaymentMethod: "defaultPaymentMethod",
  errorField: "errorField"
};

export const addCreditFormFields = {
  paymentMethod: "paymentMethod",
  amountOptions: {
    amount_50: "amount_50",
    amount_75: "amount_75",
    amount_100: "amount_100",
    amount_150: "amount_150",
    amount_another: "amount_another",
  },
  amountOption: "amountOption",
  anotherAmount: "anotherAmount",
  promoCode: "promoCode"
};

export const placeholders = {
  title: "Product Name",
  description: "Briefly describe your product.",
  basePrice: "$",
  salePrice: "$",
  weight: "0",
  htsCode: "0.0.0.0",
  length: "0",
  width: "0",
  height: "0",
  sku: "SKU-001",
  quantity: "0"
};
