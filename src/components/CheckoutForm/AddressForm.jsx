//react-hook-form.com manages the form, they're efficient, and renders less
import React from "react";
//Import the needed stuff from material-UI
import {
  InputLabel,
  Select,
  Step,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form"; // react-hook-form.com for this project
import FormInput from "./FormInput";

const AddressForm = () => {
  const methods = useForm(); // all the methods we need to run the form

  return (
    <>
      <Typography variant="h6" gutterBottom>
        AddressForm
      </Typography>
      {/* we gonna spread all the methods from (react-hook-form) */}
      <FormProvider {...methods}>
        <form onSubmit={""}>
          {/* grid for seperating all the input field */}
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zIP" label="Zip Code / Postal Code" />
            <Grid item xs={12} sm={6}>
              {/* changes happens from here and the to shipping subdivision */}
              <InputLabel>Shipping Country</InputLabel>
              <Select value={""} fullWidth onChange={""}>
                <MenuItem key={""} value={""}>
                  Select me
                </MenuItem>
                hello
              </Select>
            </Grid>

            {/* depends on shipping country */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={""} fullWidth onChange={""}>
                <MenuItem key={""} value={""}>
                  Select me
                </MenuItem>
                hello
              </Select>
            </Grid>

            {/* depends on shipping Subdivision */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={""} fullWidth onChange={""}>
                <MenuItem key={""} value={""}>
                  Select me
                </MenuItem>
                hello
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
