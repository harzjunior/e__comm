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
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles"; // used material-UI styling for this project
import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";
import { commerce } from "../../../lib/commerce";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment details"]; //2 steps (from SHIPPING ADDRESS TO PAYMENT DETAILS)

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({}); // handles the shipping data collected from user
  const [isFinished, setIsFinished] = useState(false);

  const classes = useStyles();
  const history = useHistory(); // re-navigate

  useEffect(() => {
    //to generates needed Token for the e-commerce API
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        history.push("/");
      }
    };
    generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  const nextStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep + 1);
  const backStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  //timeout function
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
      console.log("Loading...");
    }, 2500);
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider}></Divider>
          <Typography variant="subtitle2">
            Order ref: {order.customer.reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : isFinished ? (
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase</Typography>
          <Divider className={classes.divider}></Divider>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
        <br />
        <CircularProgress />
      </div>
    );
  if (error) {
    <>
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
      <br />
      <Typography varian="h5">Error: {error}</Typography>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    );

  return (
    <>
      <CssBaseline />

      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center"></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation shippingData={shippingData} />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
