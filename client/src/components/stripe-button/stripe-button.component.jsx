import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
export default ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_CZvWzs0jvIyov8UUYNTUg0P300247dDLeP";
  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        token,
        amount: priceForStripe
      }
    })
      .then(resp => {
        alert("Payment Successful");
      })
      .catch(err => {
        console.log("Payment error: ", JSON.parse(err));
        alert("Please sure you use the provided credit card");
      });
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
