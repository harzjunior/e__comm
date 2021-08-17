//A custom component to connect react-hook-form with material-UI text input
import React from "react";

import { TextField, Grid } from "@material-ui/core"; //Import the needed stuff from material-UI
import { useFormContext, Controller } from "react-hook-form"; // react-hook-form.com for this project

const FormInput = ({ name, label }) => {
  //calling the controller
  const { control } = useFormContext();
  return (
    //two items, xs=12 takes the whole scren while sm=6 displays 2 items
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        // textfiels as just text
        render={({ field }) => <TextField fullWidth label={label} />}
      />
    </Grid>
  );
};

export default FormInput;
