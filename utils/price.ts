import isNumber from "lodash/fp/isNumber";
import { WalletDefaultPaymentCard } from "../typeDefinitions/__generated__/components";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
export const decimalFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  useGrouping: false
});

export const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent"
});

export const getTaxPercent = (
  orderTotal?: number | null,
  shippingCost?: number | null,
  tax?: number | null
) => {
  if (isNumber(orderTotal) && isNumber(tax)) {
    if (isNumber(shippingCost)) {
      const taxPercent = tax / (orderTotal - shippingCost);
      if (taxPercent < 0) {
        throw new Error("Tax percent should not be less than 0");
      } else {
        return percentFormatter.format(taxPercent);
      }
    }
    const taxPercent = tax / orderTotal;
    if (taxPercent < 0) {
      throw new Error("Tax percent should not be less than 0");
    } else {
      return percentFormatter.format(taxPercent);
    }
  }
  return null;
};

export const getFormattedPrice = (price: number = 0) =>
  currencyFormatter.format(price / 100);

export const getCentsFromDollars = (price?: number | null) => {
  if (price === null || price === undefined) {
    return undefined;
  }
  return decimalFormatter.format(price * 100);
};

export const getDollarsFromCents = (price?: number | null | string) => {
  if (typeof price === "string") {
    return undefined;
  }
  if (price === null || price === undefined) {
    return undefined;
  }
  return decimalFormatter.format(price / 100);
};

export const getStripeFee = (
  orderTotal: number,
  tax: number,
  shippingCost: number,
  vendorTotal: number
) => {
  const numbers = [
    { key: "orderTotal", value: orderTotal },
    { key: "tax", value: tax },
    { key: "shippingCost", value: shippingCost },
    { key: "vendorTotal", value: vendorTotal }
  ];
  const stripeFee = orderTotal - tax - shippingCost - vendorTotal;

  for (const number of numbers) {
    if (!isNumber(number.value)) {
      throw new Error(
        `${number.key} is not a number. The provided value was ${number.value}`
      );
    }
    if (stripeFee < 0) {
      throw new Error(`Stripe fee is less than 0: ${stripeFee}`);
    }
  }
  return stripeFee;
};

export const getItemTotalDisplayPrice = (
  quantity?: number | null,
  basePrice?: number | null,
  salePrice?: number | null
) => {
  const q = quantity ? quantity : 1;
  if (basePrice && salePrice && salePrice < basePrice) {
    return getFormattedPrice(salePrice * q);
  }
  if (basePrice) {
    return getFormattedPrice(basePrice * q);
  }
  return null;
};

export const getDisplayCardName = ((card: WalletDefaultPaymentCard) => {
  return `${card.brand !== null ? card.brand.toUpperCase() : ''} **** ${card.last4}`
});
