//react-hook-form.com manages the form, they're efficient, and renders less
import React, { useState, useEffect } from "react";
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
import { commerce } from "../../lib/commerce.js"; //to use the API features, we need to import the instance (commerce)

const AddressForm = ({ checkoutToken }) => {
  // fetch all the data from API
  const [shippingCountries, setShippingCountries] = useState([]); //shipping Countries and sets to empty array ---> API , we set up we can ship domestically in Turkey
  const [shippingCountry, setShippingCountry] = useState(""); //a chosen shipping Country and sets to empty string
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]); //shipping subdivisions and sets to empty array---> API, also we can ship internationally to few countries
  const [shippingSubdivision, setShippingSubdivision] = useState(""); //a chosen shipping subdivisions and sets to string
  const [shippingOptions, setShippingOptions] = useState([]); //shipping options and sets to empty array ---> API
  const [shippingOption, setShippingOption] = useState([]); //a chosen shipping otion and sets to empty string

  const methods = useForm(); // all the methods we need to run the form

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  })); //convert an object into 2D array, mapping one more time to turn it into normal array to get the code and name and return an array with object that have id and label

  //   let's start with countries first, this will accept the checkout token id (it's like getting a receipt in a store)
  const fecthShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId // will created in check Component
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]); //get the first county in the array form and by keys (country code names)
  };

  //to get the contries ASAP the function Address runs
  useEffect(() => {
    fecthShippingCountries(checkoutToken.id);
  }, []);

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
            <FormInput required name="ZIP" label="Zip Code / Postal Code" />
            <Grid item xs={12} sm={6}>
              {/* changes happens from here and the to shipping subdivision */}
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {" "}
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
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
