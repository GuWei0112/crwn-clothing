import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_CZvWzs0jvIyov8UUYNTUg0P300247dDLeP";
  const onToken = token => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
