import { MutationRenderProp } from '../typeDefinitions/index';
import isEmpty from "lodash/fp/isEmpty";

import {
  UpdateCompanyMutation,
  UpdateCompanyVariables,
  UploadCompanyAvatarMutation,
  UploadCompanyAvatarVariables,
  CreateCampaignTrackingPixelMutation,
  CreateCampaignTrackingPixelVariables,
  UpdateShippingLocationVariables,
  UpdateShippingLocationMutation,
  DeleteShippingLocationMutation,
  DeleteShippingLocationVariables,
  RemoveUserFromDomainMutation,
  RemoveUserFromDomainVariables,
  UpdateDomainMutation,
  UpdateDomainVariables,
  RemoveFreeShippingThresholdMutation,
  RemoveFreeShippingThresholdVariables,
  DeletePromotionMutation,
  DeletePromotionVariables
} from "../typeDefinitions/__generated__/components";

export const areMutationsLoading = (calls: {
  [key: string]: MutationRenderProp<any, any>;
}) =>
  !isEmpty(calls)
    ? Object.keys(calls)
        .map((key: string) => calls[key])
        .reduce((accVal, call) => call.result.loading || accVal, false)
    : [];

export interface IMappedSettingFormMutations {
  [key: string]: MutationRenderProp<any, any>;
  brandingMutation: MutationRenderProp<
    UploadCompanyAvatarMutation,
    UploadCompanyAvatarVariables
  >;
  businessDetailsMutation: MutationRenderProp<
    UpdateCompanyMutation,
    UpdateCompanyVariables
  >;
  keyInformationPixelMutation: MutationRenderProp<
    CreateCampaignTrackingPixelMutation,
    CreateCampaignTrackingPixelVariables
  >;
  updateShippingLocationMutation: MutationRenderProp<
    UpdateShippingLocationMutation,
    UpdateShippingLocationVariables
  >;
  deleteShippingLocationMutation: MutationRenderProp<
    DeleteShippingLocationMutation,
    DeleteShippingLocationVariables
  >;
  deleteUserMutation: MutationRenderProp<
    RemoveUserFromDomainMutation,
    RemoveUserFromDomainVariables
  >;
  updateDomainMutation: MutationRenderProp<
    UpdateDomainMutation,
    UpdateDomainVariables
  >;
  removeFreeShippingMutation: MutationRenderProp<
    RemoveFreeShippingThresholdMutation,
    RemoveFreeShippingThresholdVariables
  >;
  deletePromotionMutation: MutationRenderProp<
    DeletePromotionMutation,
    DeletePromotionVariables
  >;
}