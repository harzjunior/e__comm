import React, { useState } from "react";
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

const steps = ["Shipping address", "Payment details"]; // our steps has only 2 steps to reach (from SHIPPING ADDRESS TO PAYMENT DETAILS) in other to complete the form. for example if you had ["Shipping address", "Payment details", "harz", "sweet"] then you have 4 steps to cimplete the form

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const classes = useStyles();

  const Comfirmation = () => {
    return <div>Confirmation</div>;
  };

  //Form component that becomes active/change depending on the current location
  // activeStep is equal to 0 then render/show AddresFrom component else render/show PaymentForm
  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

  return (
    <>
      {/* padding for navBar */}
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          {/* we used the active step here */}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {/* mapping through all the steps and we call the steps and map trough it*/}
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* if we are on the last step show Confirmation component else show From component*/}
          {activeStep === steps.length ? <Comfirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
