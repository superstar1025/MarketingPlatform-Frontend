import { campaignTypes } from "../constants/catalog";

export const getCampaignLabel = (id?: number | null) => {
  if (id === null) {
    return null;
  }
  const match = campaignTypes.find(type => type.id === id);
  if (match) {
    return match.label;
  }
  return null;
};
