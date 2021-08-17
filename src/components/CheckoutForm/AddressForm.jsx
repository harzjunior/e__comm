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

  //looping through
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  })); //convert an object into 2D array, mapping one more time to turn it into normal array to get the code and name and return an array with object that have id and label

  //looping through

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  //looping through. shippingOptions are array by default therefore no need for object entries
  const options = shippingOptions.map((shipOpt) => ({
    id: shipOpt.id,
    label: `${shipOpt.description} - (${shipOpt.price.formatted_with_symbol})`,
  }));

  // console.log(shippingOptions)
  //Countries... let's start with countries first, this will accept the checkout token id (it's like getting a receipt in a store)
  const fecthShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId // will be created in check Component
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]); //get the first county in the array form and by keys (country code names)
  };

  //Subdivions accepts one parameters and that's country code
  const fetchSubdivions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  //shipping Options accepts 3 parameters and that's checkouttokenId country and a region sets to null if no data
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    ); // the options objects {} that specifies in which country and region we are.
    setShippingOptions(options);
    setShippingOption(options[0].id); // select first avalaible shipping option
  };

  //to get the contries ASAP the function Address runs
  useEffect(() => {
    fecthShippingCountries(checkoutToken.id);
  }, []);

  //reason for the this seconse useEffect is that, the shipping country might not be ready/called yet. it's perfectly okay to have multiple use effects in a single component
  useEffect(() => {
    if (shippingCountry) fetchSubdivions(shippingCountry); //whenever shipping country changes, call subdivisions functions only if it exists
  }, [shippingCountry]); //shippingcountry is a dependancy of subdivivions (when ever the shipping country changes we will call the useEffect). Sometimes the dependancy might be empty therefore we will use IF STATEMENT for if it exists

  //runs affter Subdivision changes
  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      ); //whenever shipping country changes, call checkoutToken.id, shippingCountry, shippingSubdivision only if it exists
  }, [shippingSubdivision]); //shippingSubdivision is a dependancy of subdivivions (when ever the shipping Subdivision changes we will call the useEffect). Sometimes the dependancy might be empty therefore we will use IF STATEMENT for if it exists

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
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="ZIP" label="Zip Code / Postal Code" />
            <Grid item xs={12} sm={6}>
              {/* changes happens from here and the to shipping subdivision */}
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {/*looping through countries */}
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* country code depends on shipping subdivions */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {/*looping through subdivisions */}
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* depends on shipping Options for Nigeria is free because it is domestic while international costs some fees */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {/*looping through options */}
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
