import React, { forwardRef, useRef, useImperativeHandle } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements
} from "react-stripe-elements";
const { UikFormInputGroup } = require("../../../../../@uik");
import localeNamespaceKeys from "../../../../../constants/localization";
import FormRow from "../../FormRow";
import FormField from "../../FormField";
import FormLabel from "../../FormLabel";


const _StripeElement = (props: any) => {
  const { t } = props;
  return (
    <div>
      <FormRow>
        <FormField>
          <FormLabel>{t(`${localeNamespaceKeys.wallet.creditCardNumber}`)}</FormLabel>
          <CardNumberElement
            className="uik-input__input"
            placeholder="Card number"
          />
        </FormField>
      </FormRow>
      <UikFormInputGroup direction="horizontal">
        <FormField>
          <FormLabel>{t(`${localeNamespaceKeys.wallet.expirationDate}`)}</FormLabel>
          <CardExpiryElement
            className="uik-input__input"
          />
        </FormField>
        <FormField>
          <FormLabel>{t(`${localeNamespaceKeys.wallet.cvcCode}`)}</FormLabel>
          <CardCVCElement
            className="uik-input__input"
          />
        </FormField>
      </UikFormInputGroup>
    </div>
  );
};

const StripeElement = injectStripe(_StripeElement);

const StripeComponent = forwardRef((props: any, ref) => {
  const childRef: any = useRef();
  useImperativeHandle(ref, () => ({
    getStripe: () => childRef.current.state.stripe
  }));
  return (
    // TODO: Make this apiKey an environment variable
    <StripeProvider apiKey="pk_test_f6fk9Tr6IMH18JKxAx3TefiH">
      <Elements>
        <StripeElement ref={childRef} t={props.t} />
      </Elements>
    </StripeProvider>
  )
})

export default StripeComponent;
