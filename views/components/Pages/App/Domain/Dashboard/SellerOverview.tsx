import React from "react";
import { Formik, FastField, FieldProps } from "formik";
import { adopt } from "react-adopt";
import classNames from "classnames";
import { NamespacesConsumer } from "react-i18next";

import localeNamespaceKeys from "../../../../../../constants/localization";
import {
  AddCreditsComponent,
  AddCreditsMutation,
  AddCreditsVariables
} from "../../../../../../typeDefinitions/__generated__/components";
import GraphQLErrors from "../../../../Helpers/GraphQLErrors";
import { IMapper } from "../../../../Pages/Authentication/Register";
import { MutationRenderProp } from "../../../../../../@uik../../typeDefinitions";


const {
  UikWidget,
  UikWidgetHeader,
  UikSelect,
  UikRadio,
  UikButton,
  UikWidgetContent,
  UikFormInputGroup,
} = require("../../../../../../@uik");


const SellerOverview = () => {
  return (
    <NamespacesConsumer ns={[localeNamespaceKeys.dashboard._name]}>
      {(t) =>
        <UikWidget className="seller-overview">
          <UikWidgetHeader
          >
            {t(`${localeNamespaceKeys.dashboard.sellerOverview}`)}
          </UikWidgetHeader>
          <UikWidgetContent>
          </UikWidgetContent>
        </UikWidget>
      }
    </NamespacesConsumer>
  );
};

export default SellerOverview;
