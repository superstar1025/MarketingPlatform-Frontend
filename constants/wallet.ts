export const amountOptions = [
  { label: '$50.00', id: "amount_50", value: 5000 },
  { label: '$75.00', id: "amount_75", value: 7500 },
  { label: '$100.00', id: "amount_100", value: 10000 },
  { label: '$150.00', id: "amount_150", value: 15000 },
  { label: 'Enter another amount', id: "amount_another", value: 0 },
];

export enum creditCards {
  VISA = "Visa",
  AMEX = "Amex",
  DISCOVER = "Discover",
  MASTERCARD = "Mastercard"
}
