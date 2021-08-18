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

const steps = ["Shipping address", "Payment details"]; // our steps has only 2 steps to reach (from SHIPPING ADDRESS TO PAYMENT DETAILS) in other to complete the form. for example if you had ["Shipping address", "Payment details", "harz", "sweet"] then you have 4 steps to cimplete the form

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null); //state field for the token and sets to null
  const [shippingData, setShippingData] = useState({}); // handles the shipping data collected from user. empty object initially
  const [isFinished, setIsFinished] = useState(false);

  const classes = useStyles();
  const history = useHistory(); // this will allow us to re-navigate

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
      } catch (error) {
        history.push("/"); //fix for when page refreshes after checkout the cart icon disappears, also import useHistory from react-router-dom
      }
    };
    generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]); // (TypeError: Cannot read property 'id' of null) solution ---> update dynamically with the cart

  const nextStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep + 1); // doesn't mutate or simply counting by including the previouse counts and. When clicked goes next foward 1 step
  const backStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep - 1); //for PaymentForm component to use. When clicked goes 1 step back

  //passing props to AddressForm component for methods FormInpute to use/consume. will accept data
  //all the datat collected will be set in the useState above (shippingData)
  const next = (data) => {
    setShippingData(data); //once the shipping that has been set then we move the setActiveStep by 1 further by creating 2 functions nextStep and backStep. all these data will be used in AddressForm component
    nextStep(); // calls the next step affter setting the shipping data
  };

  //timeout function for when after checkout and paying but stuck on loading. which will need a state isFinished and send the timeout as a prop to PaymentForm
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
      console.log("Loading!");
    }, 2500);
  };

  //only show when order.customer exists else show spinner before the order.customer is ready
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
        {/* I added the button but with timeout set then no need for the button */}
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
        <br />
        <CircularProgress />
      </div>
    );
  // error handling
  if (error) {
    <>
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
      <br />
      <Typography varian="h5">Error: {error}</Typography>
    </>;
  }

  //Form component that becomes active/change depending on the current location
  // activeStep is equal to 0 then render/show AddresFrom component else render/show PaymentForm
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} /> //pass checkoutToken and next as props for AddressForm component to use/consume
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      /> // this will be passed as a prop to PaymentForm and Review(to loop through all the items) Component and backStep function will be send to button as a prop
    );

  return (
    <>
      {/* padding for navBar */}
      <CssBaseline />

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
          {/* paymentForm component will use (shippingData) be able to finalised the order */}
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
