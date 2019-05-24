import get from "lodash/fp/get";

import { settingDetailFormFields } from "../constants/formFields";
import { SettingFormValues } from "../typeDefinitions/setting/forms";
import { IMappedSettingFormMutations } from "../utils/setting";

export const submitSettings = async (
  setAvatar: (avatar: string) => void,
  companyAddressId: string,
  domainId: string,
  values: SettingFormValues,
  mutations: IMappedSettingFormMutations
) => {
  try {
    let savedAvatar;
    const currency = get("value")(
      get(0)(values[settingDetailFormFields.businessDetails.currency])
    );
    if (values.updated.length !== 0) {
      const productImages = [
        ...values[settingDetailFormFields.brandingDetails.updated]
      ].map((image: File) => ({
        image
      }));
      // Branding - Save Avatar
      savedAvatar = await mutations.brandingMutation.mutation({
        variables: {
          domainId: domainId,
          image: productImages[0].image
        }
      });
      const savedAvatarURL = get("avatar")(
        get("company")(get("uploadCompanyAvatar")(get("data")(savedAvatar)))
      );
      setAvatar(savedAvatarURL);
    }
    const deletedUsers = values[settingDetailFormFields.user.deleteUsers];
    const deletedLocations =
      values[settingDetailFormFields.location.deleteLocations];
    // Business Details - Save Form
    await mutations.businessDetailsMutation.mutation({
      variables: {
        domainId: domainId,
        name: values[settingDetailFormFields.businessDetails.companyName],
        email: values[settingDetailFormFields.businessDetails.email],
        customerSupportNumber:
          values[settingDetailFormFields.businessDetails.customerSupportNumber],
        returnPolicy:
          values[settingDetailFormFields.keyInformation.returnPolicy],
        sizeGuide: values[settingDetailFormFields.keyInformation.sizeGuide],
        currency: currency
      }
    });
    await mutations.updateShippingLocationMutation.mutation({
      variables: {
        domainId: domainId,
        shippingLocations: [
          {
            id: companyAddressId,
            address1: values[settingDetailFormFields.businessDetails.address1],
            address2: values[settingDetailFormFields.businessDetails.address2],
            city: values[settingDetailFormFields.businessDetails.city],
            state: values[settingDetailFormFields.businessDetails.state],
            zipCode: values[settingDetailFormFields.businessDetails.zipCode],
            country: values[settingDetailFormFields.businessDetails.country]
          }
        ]
      }
    });
    if (deletedLocations && deletedLocations.length > 0) {
      await mutations.deleteShippingLocationMutation.mutation({
        variables: {
          domainId: domainId,
          shippingLocationIds: deletedLocations
        }
      });
    }
    if (deletedUsers && deletedUsers.length > 0) {
      for (let i = 0; i < deletedUsers.length; i++) {
        mutations.deleteUserMutation.mutation({
          variables: {
            domainId: domainId,
            id: deletedUsers[i]
          }
        });
      }
    }
    await mutations.keyInformationPixelMutation.mutation({
      variables: {
        domainId: domainId,
        platform: 1,
        pixel: values[settingDetailFormFields.keyInformation.facebookPixelId]
      }
    });
    await mutations.keyInformationPixelMutation.mutation({
      variables: {
        domainId: domainId,
        platform: 2,
        pixel: values[settingDetailFormFields.keyInformation.snapchatPixelId]
      }
    });

    if (values[settingDetailFormFields.shipping.activatedFreeShipping]) {
      mutations.updateDomainMutation.mutation({
        variables: {
          id: domainId,
          freeShippingThreshold:
            values[settingDetailFormFields.shipping.minimumOrderValue]
        }
      });
    } else {
      mutations.removeFreeShippingMutation.mutation({
        variables: {
          domainId: domainId
        }
      });
    }
    if (values[settingDetailFormFields.promotion.activatedPromo]) {
      if (
        values[settingDetailFormFields.promotion.deletePromotions].length > 0
      ) {
        mutations.deletePromotionMutation.mutation({
          variables: {
            domainId: domainId,
            promotionIds:
              values[settingDetailFormFields.promotion.deletePromotions]
          }
        });
      }
    } else {
      if (
        values[settingDetailFormFields.promotion.allPromotionIds].length > 0
      ) {
        mutations.deletePromotionMutation.mutation({
          variables: {
            domainId: domainId,
            promotionIds:
              values[settingDetailFormFields.promotion.allPromotionIds]
          }
        });
      }
    }
    return Promise.resolve(savedAvatar);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
