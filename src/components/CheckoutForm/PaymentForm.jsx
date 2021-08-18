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
  //creante handle submit function to finalise the order
  const handleSubmit = async (event, elements, stripe) => {
    // data wont get cleared after refreshing the webpage
    event.preventDefault();

    // error handling. STRIPE cannot have access with the if condition.
    if (!stripe || !elements) return; //if nothing happens then we go out of the function

    const cardElement = elements.getElement(CardElement); //get card elements
    // stripe API to create a payment methods

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    // if else check condition
    if (error) {
      console.log(error);
    } //if no error then create an object containingall the data (all the items in the cart, customers, who is buying it, first name, last name and so and store that in orderData )
    else {
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
      {/* review of all the things purchased */}
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        {/* payment methods */}
        Payment method
      </Typography>
      {/* here for stripe and a stripePromise function*/}
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {/* call the handleSubmit function that accepts 3 parameters (event) of the click/entire form, then elements and finally stripe. we need all the stripe dependancy for this to work   */}

          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  {" "}
                  {/* onClick backStep has been created as a function in Checkout components, therefore we can pass it over as a prop for this button to use/consume */}
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disable={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  {/* take the amount from checkoutToken */}
                </Button>
                {/* strips disable when no access not it */}
              </div>
            </form>
          )}
          {/* call back function with 1 more returns that accepts something from stripe. this can be find in stripe documentation website */}
        </ElementsConsumer>
      </Elements>
    </>
  );
};
export default PaymentForm;
