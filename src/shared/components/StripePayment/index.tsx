// import React, { FC } from "react";
// import {
//   AddressElement,
//   AfterpayClearpayMessageElement,
//   AuBankAccountElement,
//   CardCvcElement,
//   CardElement,
//   CardExpiryElement,
//   CardNumberElement,
//   ExpressCheckoutElement,
//   FpxBankElement,
//   IbanElement,
//   IdealBankElement,
//   LinkAuthenticationElement,
//   PaymentElement,
//   PaymentRequestButtonElement
// } from "@stripe/react-stripe-js";
// import styles from "./stripePayment.module.scss";
// import Button from "../Button";

// interface StripePaymentProps {}

// const StripePayment: FC<StripePaymentProps> = ({ ...props }) => {
//   return (
//     <form>
//       {/* Available Payment Elements */}
//       {/* 
    
//       <AfterpayClearpayMessageElement />
//       <AuBankAccountElement />
//       <ExpressCheckoutElement />
//       <FpxBankElement />
//       <PaymentElement />
//       <IbanElement />
//       <IdealBankElement />
//       <LinkAuthenticationElement />
//       <PaymentRequestButtonElement />
//       <CardNumberElement />
//       <CardCvcElement />
//       <CardExpiryElement /> 
      
//       */}
//       <AddressElement options={{ mode: "billing" }} />
//       <br />
//       <CardElement />
//       <br />
//       <Button type="primary">Submit</Button>
//     </form>
//   );
// };

// export default StripePayment;
