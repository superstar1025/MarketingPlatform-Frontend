import authorization from "../locales/en/authorization.json";
import dashboard from "../locales/en/dashboard.json";
import catalog from "../locales/en/catalog.json";
import formValidation from "../locales/en/formValidation.json";
import imageTitles from "../locales/en/imageTitles.json";
import wallet from "../locales/en/wallet.json";
import navigation from "../locales/en/navigation.json";
import setting from "../locales/en/setting.json";
import orders from "../locales/en/orders.json";

export interface ILocaleNamespaceKeys {
  authorization: {
    _name: string;
    forgotPasswordPage: {
      _name: string;
      buttonText: string;
      callToActionLink: string;
      header: string;
      question: string;
      sentEmail: string;
    };
    formLabels: {
      _name: string;
      emailAddress: string;
      domain: string;
      firstName: string;
      lastName: string;
      password: string;
      passwordConfirm: string;
    };
    loginPage: {
      _name: string;
      buttonText: string;
      callToActionLink: string;
      header: string;
      question: string;
      forgotPasswordQuestion: string;
      passwordWasReset: string;
    };
    registerPage: {
      _name: string;
      buttonText: string;
      callToActionLink: string;
      header: string;
      question: string;
    };
    resetPasswordPage: {
      _name: string;
      buttonText: string;
      callToActionLink: string;
      header: string;
      question: string;
    };
  };
  dashboard: {
    _name: string;
    title: string;
    sellerOverview: string;
    latestOrders: string;
    viewAllOrders: string;
    noOrdersHaveBeenPlaced: string;
  };
  catalog: {
    _name: string;
    empty: {
      _name: string;
      emoji: string;
      header: string;
      subheader: string;
      createProduct: string;
      import: string;
    };
    products: {
      _name: string;
      all: string;
      availability: string;
      gender: string;
      inStock: string;
      outOfStock: string;
      price: string;
      product: string;
      searchPlaceholder: string;
      headerCatalog: string;
      headerManageProducts: string;
    };
    product: {
      _keyPath?: string;
      _name: string;
      headerBack: string;
      createProduct: {
        _keyPath?: string;
        _name: string;
        title: string;
        subtitle: string;
      };
      formLabels: {
        _keyPath?: string;
        _name: string;
        productInfo: {
          _keyPath?: string;
          _name: string;
          title: string;
          titlePlaceholder: string;
          description: string;
          descriptionPlaceholder: string;
        };
        status: {
          _keyPath?: string;
          _name: string;
          sectionHeader: string;
          prompt: string;
          live: string;
          visible: string;
        };
        gender: {
          _keyPath?: string;
          _name: string;
          sectionHeader: string;
          prompt: string;
          hers: string;
          his: string;
          boys: string;
          girls: string;
          everyone: string;
        };
        images: {
          _keyPath?: string;
          _name: string;
          sectionHeader: string;
          buttonTextUpload: string;
          noImages: string;
        };
        pricing: {
          _keyPath?: string;
          _name: string;
          sectionHeader: string;
          basePrice: string;
          salePrice: string;
        };
        shipping: {
          _keyPath?: string;
          _name: string;
          sectionHeader: string;
          weight: string;
          unitOfWeight: string[] | string;
          dimensions: string;
          unitOfMeasure: string;
          unitOfDimensions: string[] | string;
          length: string;
          height: string;
          width: string;
        };
        inventory: {
          _keyPath?: string;
          _name: string;
          sectionHeader: string;
          sku: string;
          inventory: string;
          allowCustomersToPurchase: string;
        };
        variations: {
          _keyPath?: string;
          _name: string;
          sectionHeader: string;
          buttonTextReorderOptions: string;
          buttonTextEditOptions: string;
          buttonTextAddOption: string;
          buttonTextEdit: string;
          color: string;
          size: string;
          sku: string;
          price: string;
          inventory: string;
        };
        buttonText: string;
        modals: {
          _keyPath?: string;
          _name: string;
          editOptions: {
            _name: string;
            header: string;
            buttonText: string;
          };
          deleteOption: {
            _keyPath?: string;
            _name: string;
            header: string;
            deleteVariants: string;
            variants: string;
            withA: string;
            of: string;
            actionCantBeUndone: string;
            buttonText: string;
          };
          reorderOption: {
            _keyPath?: string;
            _name: string;
            header: string;
            buttonText: string;
          };
          editVariation: {
            _keyPath?: string;
            _name: string;
            header: string;
            headerOptions: string;
            optionsText: string;
            color: string;
            size: string;
            headerPricing: string;
            basePrice: string;
            salePrice: string;
            headerShipping: string;
            weight: string;
            unitOfWeight: string[] | string;
            buttonTextVariationImage: string;
            buttonText: string;
          };
        };
      };
    };
  };
  setting: {
    _name: string;
    general: string;
    branding: {
      _name: string;
      header: string;
      updateAvatar: string;
      avatarContent: string;
    };
    businessDetails: {
      _name: string,
      header: string,
      companyName: string,
      email: string,
      customerSupportNumber: string,
      address1: string,
      address2: string,
      city: string,
      zipCode: string,
      currency: string,
      country: string,
      state: string
    };
    keyInformation: {
      _name: string,
      tabLabels: Array<string>
      description: string,
      tabs: Array<string>,
    };
    location: {
      _name: string,
      description: string,
      subDescription: string,
      subTitle: string,
      locationName: string,
      locationEmail: string,
      locationPhoneNumber: string,
      locationAdress1: string,
      locationAdress2: string,
      locationCity: string,
      locationState: string,
      locationZipCode: string,
      locationCountry: string,
    };
    payouts: {
      _name: string,
      description: string,
      paypalDescription: string,
      stripeDescription: string,
      connectStripe: string,
      paypalEmailAddress: string
    }
    user: {
      _name: string,
      firstName: string,
      lastName: string,
      email: string,
      owner: string,
      warning: string,
      emailNotification: string
    },
    promotion: {
      _name: string,
      description: string,
      promoCode: string,
      discount: string,
      duration: string,
      from: string,
      to: string,
      subTitle: string,
      subDescription: string,
      addButton: string
    },
    shipping: {
      _name: string,
      description: string
    }
  };
  orders: {
    _name: string;
    empty: {
      _name: string;
      emoji: string;
      header: string;
      subheader: string;
      createProduct: string;
      import: string;
    };
    orders: {
      _name: string;
      all: string;
      completed: string;
      cancelled: string;
      pending: string;
      refunded: string;
      availability: string;
      orderNumber: string;
      customer: string;
      campaign: string;
      status: string;
      total: string;
      searchPlaceholder: string;
    };
    order: {
      _name: string;
      backToOrders: string;
      downloadInvoice: string;
      shippingLabels: string;
      customerDetails: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      shippingDetails: string;
      shippingAddress1: string;
      shippingAddress2: string;
      shippingCity: string;
      shippingState: string;
      shippingZipCode: string;
      shippingCountry: string;
      campaignDetails: string;
      campaignType: string;
      campaign: string;
      orderDetails: string;
      orderPaymentMethod: string;
      orderShippingMethod: string;
      orderTracking: string;
      orderShippingCost: string;
      orderTotal: string;
      orderTax: string;
      orderStripe: string;
      orderTotalPayout: string;
    };
  };

  formValidation: {
    _name: string;
    noWhitespace: string;
    emailLength: string;
    emailNotValid: string;
    emailRequired: string;
    passwordRequired: string;
    passwordMinLength: string;
    passwordMaxLength: string;
    passwordDoesntMatch: string;
    passwordConfirmationRequired: string;
    firstNameRequired: string;
    firstNameMaxLength: string;
    lastNameRequired: string;
    lastNameMaxLength: string;
    domainRequired: string;
    domainMaxLength: string;
    networkError: string;
    createProductForm: {
      _keyPath?: string;
      _name: string;
      titleRequired: string;
    };
    setting: {
      businessDetails: {
        _keyPath?: string;
        _name: string;
        generalValidation: string;
      }
    };
  };
  imageTitles: {
    _name: string;
    imageNotAvailable: string;
  };
  navigation: {
    _name: string;
    menu: string;
    dashboard: string;
    catalog: string;
    orders: string;
    settings: string;
    revenueStreams: string;
    buyNowLinks: string;
    qrCodes: string;
    support: string;
    featureRequest: string;
    knowledgeBase: string;
    availableCredits: string;
    updateWalletSettings: string;
    copyRight: string;
    companyDescription: string;
  };
  wallet: {
    _name: string;
    walletTitle: string;
    noCreditCard: string;
    noCreditCardMessage: string;
    currentBalance: string;
    invalidCreditCardMessage_1: string;
    invalidCreditCardMessage_2: string;
    walletAddCard: string;
    creditCardNumber: string;
    expirationDate: string;
    cvcCode: string;
    defaultPaymentMethod: string;
    paymentMethods: string;
    creditCardShortName: string;
    addAnotherCreditCard: string;
    viewAddons: string;
    viewInvoices: string;
    addCreditsToWallet: string;
    walletInvoices: string;
    backToWallet: string;
    walletAddons: string;
    enableAddons: string;
    currencyRounding: string;
    addonDescription: string;
    download: string;
    downloadableProducts: string;
    locations: string;
    socialProductFeeds: string;
    subscription: string;
    confirmMonthlyAddons: string;
    walletEditCard: string;
    updateCard: string;
    deleteCard: string;
    walletAddCredits: string;
    specifyCreditAmount: string;
    deleteCardConfirmModalTitle: string;
    deleteCardConfirmModaltext: string;
    deleteAddOnConfirmModalTitle: string;
    deleteAddOnConfirmModalText: string;
    confirm: string;
    cancel: string;
    enterAnotherAmount: string;
    addPromoCode: string;
    addToWallet: string;
    addCard: string;
    addCreditCard: string;
  };
}

export const localeNamespaceKeyTypeCheck: ILocaleNamespaceKeys = {
  authorization,
  dashboard,
  catalog,
  setting,
  orders,
  formValidation,
  imageTitles,
  navigation,
  wallet
};

const localeNamespaceKeys: ILocaleNamespaceKeys = {
  authorization: {
    _name: "authorization",
    forgotPasswordPage: {
      _name: "forgotPasswordPage",
      buttonText: "buttonText",
      callToActionLink: "callToActionLink",
      header: "header",
      question: "question",
      sentEmail: "sentEmail"
    },
    formLabels: {
      _name: "formLabels",
      domain: "domain",
      emailAddress: "emailAddress",
      firstName: "firstName",
      lastName: "lastName",
      password: "password",
      passwordConfirm: "passwordConfirm"
    },
    loginPage: {
      _name: "loginPage",
      buttonText: "buttonText",
      callToActionLink: "callToActionLink",
      forgotPasswordQuestion: "forgotPasswordQuestion",
      header: "header",
      question: "question",
      passwordWasReset: "passwordWasReset"
    },
    registerPage: {
      _name: "registerPage",
      buttonText: "buttonText",
      callToActionLink: "callToActionLink",
      header: "header",
      question: "question"
    },
    resetPasswordPage: {
      _name: "resetPasswordPage",
      buttonText: "buttonText",
      callToActionLink: "callToActionLink",
      header: "header",
      question: "question"
    }
  },
  dashboard: {
    _name: "dashboard",
    title: "title",
    sellerOverview: "sellerOverview",
    latestOrders: "latestOrders",
    viewAllOrders: "viewAllOrders",
    noOrdersHaveBeenPlaced: "noOrdersHaveBeenPlaced"
  },
  catalog: {
    _name: "catalog",
    empty: {
      _name: "empty",
      emoji: "emoji",
      header: "header",
      subheader: "subheader",
      createProduct: "createProduct",
      import: "import"
    },
    products: {
      _name: "products",
      all: "all",
      availability: "availability",
      gender: "gender",
      inStock: "inStock",
      outOfStock: "outOfStock",
      price: "price",
      product: "product",
      searchPlaceholder: "searchPlaceholder",
      headerCatalog: "headerCatalog",
      headerManageProducts: "headerManageProducts"
    },
    product: {
      _keyPath: "product",
      _name: "product",
      headerBack: "headerBack",
      createProduct: {
        _keyPath: "product.createProduct",
        _name: "createProduct",
        title: "title",
        subtitle: "subtitle"
      },
      formLabels: {
        _keyPath: "product.formLabels",
        _name: "formLabels",
        productInfo: {
          _keyPath: "product.formLabels.productInfo",
          _name: "productInfo",
          title: "title",
          titlePlaceholder: "titlePlaceholder",
          description: "description",
          descriptionPlaceholder: "descriptionPlaceholder"
        },
        status: {
          _keyPath: "product.formLabels.status",
          _name: "status",
          sectionHeader: "sectionHeader",
          prompt: "prompt",
          live: "live",
          visible: "visible"
        },
        gender: {
          _keyPath: "product.formLabels.gender",
          _name: "gender",
          sectionHeader: "sectionHeader",
          prompt: "prompt",
          hers: "hers",
          his: "his",
          boys: "boys",
          girls: "girls",
          everyone: "everyone"
        },
        images: {
          _keyPath: "product.formLabels.images",
          _name: "images",
          sectionHeader: "sectionHeader",
          buttonTextUpload: "buttonTextUpload",
          noImages: "noImages"
        },
        pricing: {
          _keyPath: "product.formLabels.pricing",
          _name: "pricing",
          sectionHeader: "sectionHeader",
          basePrice: "basePrice",
          salePrice: "salePrice"
        },
        shipping: {
          _keyPath: "product.formLabels.shipping",
          _name: "shipping",
          sectionHeader: "sectionHeader",
          weight: "weight",
          unitOfWeight: "unitOfWeight",
          dimensions: "dimensions",
          unitOfMeasure: "unitOfMeasure",
          unitOfDimensions: "unitOfDimensions",
          length: "length",
          height: "height",
          width: "width"
        },
        inventory: {
          _keyPath: "product.formLabels.inventory",
          _name: "inventory",
          sectionHeader: "sectionHeader",
          sku: "sku",
          inventory: "inventory",
          allowCustomersToPurchase: "allowCustomersToPurchase"
        },
        variations: {
          _keyPath: "product.formLabels.variations",
          _name: "variations",
          sectionHeader: "sectionHeader",
          buttonTextReorderOptions: "buttonTextReorderOptions",
          buttonTextEditOptions: "buttonTextEditOptions",
          buttonTextAddOption: "buttonTextAddOption",
          buttonTextEdit: "buttonTextEdit",
          color: "color",
          size: "size",
          sku: "sku",
          price: "price",
          inventory: "inventory"
        },
        buttonText: "buttonText",
        modals: {
          _name: "modals",
          editOptions: {
            _name: "editOptions",
            header: "header",
            buttonText: "buttonText"
          },
          deleteOption: {
            _name: "deleteOption",
            header: "header",
            deleteVariants: "deleteVariants",
            variants: "variants",
            withA: "withA",
            of: "of",
            actionCantBeUndone: "actionCantBeUndone",
            buttonText: "buttonText"
          },
          reorderOption: {
            _name: "reorderOption",
            header: "header",
            buttonText: "buttonText"
          },
          editVariation: {
            _name: "editVariation",
            header: "header",
            headerOptions: "headerOptions",
            optionsText: "optionsText",
            color: "color",
            size: "size",
            headerPricing: "headerPricing",
            basePrice: "basePrice",
            salePrice: "salePrice",
            headerShipping: "headerShipping",
            weight: "weight",
            unitOfWeight: "unitOfWeight",
            buttonTextVariationImage: "buttonTextVariationImage",
            buttonText: "buttonText"
          }
        }
      }
    }
  },
  setting: {
    _name: "Settings",
    general: "GENERAL",
    branding: {
      _name: "Branding",
      header: "Upload or edit your brand’s avatar.",
      updateAvatar: "Update Avatar",
      avatarContent: ""
    },
    businessDetails: {
      _name: "Business Details",
      header: "Edit and manage your basic business details.",
      companyName: "COMPANY NAME",
      email: "EMAIL",
      customerSupportNumber: "CUSTOMER SUPPORT NUMBER",
      address1: "ADDRESS 1",
      address2: "ADDRESS 2",
      city: "CITY",
      zipCode: "ZIP CODE",
      currency: "CURRENCY",
      country: "COUNTRY",
      state: "STATE"
    },
    keyInformation: {
      _name: "Key Information",
      description: "Add and edit key information about your company and products.",
      tabs: [
        "Facebook Pixel ID",
        "Return Policy",
        "Snapchat Pixel ID",
        "Size Guide"
      ],
      tabLabels: [
        "FACEBOOK PIXEL ID",
        "WHAT IS YOUR RETURN POLICY",
        "SNAPCHAT PIXEL ID",
        "WHAT IS YOUR SIZE GUID"
      ]
    },
    location: {
      _name: "Locations",
      description: "Add, edit and assign locations you ship from.",
      subDescription: "By default, your business details address is the default ship from location.",
      subTitle: "LOCATION",
      locationName: "LOCATION NAME",
      locationEmail: "LOCATION EMAIL",
      locationPhoneNumber: "LOCATION PHONE NUMBER",
      locationAdress1: "ADDRESS 1",
      locationAdress2: "ADDRESS 2",
      locationCity: "CITY",
      locationState: "STATE",
      locationZipCode: "ZIP CODE",
      locationCountry: "COUNTRY"
    },
    payouts: {
      _name: "Payouts",
      description: "Connect Stripe or PayPal to receive payouts; note you can only have one activated.",
      stripeDescription: "Activate to connect your Stripe account to weekly deposits.",
      paypalDescription: "Activate and add your company PayPal email address to get daily deposits.",
      connectStripe: "Connect with Stripe",
      paypalEmailAddress: "PAYPAL ACCOUNT EMAIL ADDRESS"
    },
    user: {
      _name: "User",
      firstName: "FIRST NAME",
      lastName: "LAST NAME",
      email: "EMAIL",
      owner: "Make this user the account owner",
      warning: "You are about to transfer ownership of this account to USER@EMAIL.io, after updating this user you will no longer have administrator access.",
      emailNotification: "* An email will be sent to the account owner email to confirm this change."
    },
    promotion: {
      _name: "Promotions",
      description: "Active and add promotional codes to your checkout.",
      promoCode: "PROMO CODE",
      discount: "DISCOUNT",
      duration: "DURATION",
      from: "FROM",
      to: "TO",
      subTitle: "Basic Promotions",
      subDescription: "Add promotional discounts and set expiration.",
      addButton: "Add another promo code"
    },
    shipping: {
      _name: "Shipping",
      description: "Add, edit and manage custom rates and settings."
    }
  },
  orders: {
    _name: "orders",
    empty: {
      _name: "empty",
      emoji: "emoji",
      header: "header",
      subheader: "subheader",
      createProduct: "createProduct",
      import: "import"
    },
    orders: {
      _name: "orders",
      all: "all",
      completed: "completed",
      cancelled: "cancelled",
      pending: "pending",
      refunded: "refunded",
      availability: "availability",
      orderNumber: "orderNumber",
      customer: "customer",
      campaign: "campaign",
      status: "status",
      total: "total",
      searchPlaceholder: "searchPlaceholder"
    },
    order: {
      _name: "order",
      backToOrders: "backToOrders",
      downloadInvoice: "downloadInvoice",
      shippingLabels: "shippingLabels",
      customerDetails: "customerDetails",
      customerName: "customerName",
      customerEmail: "customerEmail",
      customerPhone: "customerPhone",
      shippingDetails: "shippingDetails",
      shippingAddress1: "shippingAddress1",
      shippingAddress2: "shippingAddress2",
      shippingCity: "shippingCity",
      shippingState: "shippingState",
      shippingZipCode: "shippingZipCode",
      shippingCountry: "shippingCountry",
      campaignDetails: "campaignDetails",
      campaignType: "campaignType",
      campaign: "campaign",
      orderDetails: "orderDetails",
      orderPaymentMethod: "orderPaymentMethod",
      orderShippingMethod: "orderShippingMethod",
      orderTracking: "orderTracking",
      orderShippingCost: "orderShippingCost",
      orderTotal: "orderTotal",
      orderTax: "orderTax",
      orderStripe: "orderStripe",
      orderTotalPayout: "orderTotalPayout"
    }
  },
  formValidation: {
    _name: "formValidation",
    domainMaxLength: "domainMaxLength",
    domainRequired: "domainRequired",
    emailLength: "emailLength",
    emailNotValid: "emailNotValid",
    emailRequired: "emailRequired",
    firstNameMaxLength: "firstNameMaxLength",
    firstNameRequired: "firstNameRequired",
    lastNameMaxLength: "lastNameMaxLength",
    lastNameRequired: "lastNameRequired",
    noWhitespace: "noWhitespace",
    passwordConfirmationRequired: "passwordConfirmationRequired",
    passwordDoesntMatch: "passwordDoesntMatch",
    passwordMaxLength: "passwordMaxLength",
    passwordMinLength: "passwordMinLength",
    passwordRequired: "passwordRequired",
    networkError: "networkError",
    createProductForm: {
      _keyPath: "createProductForm",
      _name: "createProductForm",
      titleRequired: "titleRequired"
    },
    setting: {
      businessDetails: {
        _keyPath: "businessDetails",
        _name: "businessDetails",
        generalValidation: "generalValidation"
      }
    }
  },
  imageTitles: {
    _name: "imageTitles",
    imageNotAvailable: "imageNotAvailable"
  },
  navigation: {
    _name: "navigation",
    menu: "menu",
    dashboard: "dashboard",
    catalog: "catalog",
    orders: "orders",
    settings: "settings",
    revenueStreams: "revenueStreams",
    buyNowLinks: "buyNowLinks",
    qrCodes: "qrCodes",
    support: "support",
    featureRequest: "featureRequest",
    knowledgeBase: "knowledgeBase",
    availableCredits: "availableCredits",
    updateWalletSettings: "updateWalletSettings",
    copyRight: "copyRight",
    companyDescription: "companyDescription"
  },
  wallet: {
    _name: "wallet",
    walletTitle: "walletTitle",
    noCreditCard: "noCreditCard",
    noCreditCardMessage: "noCreditCardMessage",
    currentBalance: "currentBalance",
    invalidCreditCardMessage_1: "invalidCreditCardMessage_1",
    invalidCreditCardMessage_2: "invalidCreditCardMessage_2",
    walletAddCard: "walletAddCard",
    creditCardNumber: "creditCardNumber",
    expirationDate: "expirationDate",
    cvcCode: "cvcCode",
    defaultPaymentMethod: "defaultPaymentMethod",
    paymentMethods: "paymentMethods",
    creditCardShortName: "creditCardShortName",
    addAnotherCreditCard: "addAnotherCreditCard",
    viewAddons: "viewAddons",
    viewInvoices: "viewInvoices",
    addCreditsToWallet: "addCreditsToWallet",
    walletInvoices: "walletInvoices",
    backToWallet: "backToWallet",
    walletAddons: "walletAddons",
    enableAddons: "enableAddons",
    currencyRounding: "currencyRounding",
    addonDescription: "addonDescription",
    download: "download",
    downloadableProducts: "downloadableProducts",
    locations: "locations",
    socialProductFeeds: "socialProductFeeds",
    subscription: "subscription",
    confirmMonthlyAddons: "confirmMonthlyAddons",
    walletEditCard: "walletEditCard",
    updateCard: "updateCard",
    deleteCard: "deleteCard",
    walletAddCredits: "walletAddCredits",
    specifyCreditAmount: "specifyCreditAmount",
    deleteCardConfirmModalTitle: "deleteCardConfirmModalTitle",
    deleteCardConfirmModaltext: "deleteCardConfirmModaltext",
    deleteAddOnConfirmModalTitle: "deleteAddOnConfirmModalTitle",
    deleteAddOnConfirmModalText: "deleteAddOnConfirmModalText",
    confirm: "confirm",
    cancel: "cancel",
    enterAnotherAmount: "enterAnotherAmount",
    addPromoCode: "addPromoCode",
    addToWallet: "addToWallet",
    addCard: "addCard",
    addCreditCard: "addCreditCard"
  }
};

export default localeNamespaceKeys;
