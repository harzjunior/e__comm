import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js"; // for Stripe React
import { loadStripe } from "@stripe/stripe-js"; //From Stripe
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); //copy (token/API KEYS)stripe public key here.

//recieved porps
const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  onCaptureCheckout,
  nextStep,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    // error handling. for STRIPE
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },

        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          post_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },

        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: { payment_method_id: paymentMethod.id },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);

      timeout(); //call the timeout here

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />{" "}
      {/* review of all purchased items */}
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  {" "}
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disable={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};
export default PaymentForm;
