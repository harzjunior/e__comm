import React, { useState, useEffect } from "react";
//Import the needed stuff from material-UI
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles"; // used material-UI styling for this project
import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"]; // our steps has only 2 steps to reach (from SHIPPING ADDRESS TO PAYMENT DETAILS) in other to complete the form. for example if you had ["Shipping address", "Payment details", "harz", "sweet"] then you have 4 steps to cimplete the form

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null); //state field for the token and sets to null

  const classes = useStyles();

  //create the checkoutTokenId set component didmount (returns empty). as soon as user checkedout then generate token
  useEffect(() => {
    //to generate Token we need to import the ecommerce API
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        }); // pass in the cart ID and the type of token we are generating (since the carti id is in App component and we dont have access to it, we then need to pass it as props from App.js). There this will generate the token
        // console.log(token); // for test at chrome dev tools only
        setCheckoutToken(token); // pass it to as a prop to AddressFrom (const Form function)bellow
      } catch (error) {}
    };
    generateToken();
  }, [cart]);   // (TypeError: Cannot read property 'id' of null) solution ---> update dynamically with the cart

  const Comfirmation = () => {
    return <div>Confirmation</div>;
  };

  //Form component that becomes active/change depending on the current location
  // activeStep is equal to 0 then render/show AddresFrom component else render/show PaymentForm
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} /> //pass checkoutToken as prop for AddressForm component to use/consume
    ) : (
      <PaymentForm />
    );

  return (
    <>
      {/* padding for navBar */}
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center"></Typography>
          {/* we used the active step here */}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {/* mapping through all the steps and we call the steps and map trough it*/}
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* if we are on the last step show Confirmation component else we need to have the checkoutToken only then the From will be rendered */}
          {activeStep === steps.length ? (
            <Comfirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
