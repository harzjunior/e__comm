import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding></List>{" "}
      {/* we need to loop through the products we have in our cart from Checkout component inside the generatedToken async function, which is stored by setCheckoutToken as checkoutToken and then passed over to PaymentForm in Form function*/}
      {/* get 1 specific product in order to display some jsx; */}
      {checkoutToken.live.line_items.map((product) => (
        <ListItem style={{ padding: "10px 0" }} key={product.name}>
          <ListItemText
            primary={product.name}
            secondary={`Quantity: ${product.quantity}`}
          />
          <Typography variant="body2">
            {product.line_total.formatted_with_symbol}
          </Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: "10px 0" }}>
        <ListItemText primary="total" />
      </ListItem>
      <Typography variant="subtitle1" styles={{ font: 700 }}>
        {checkoutToken.live.subtotal.formatted_with_symbol}
      </Typography>
    </>
  );
};

export default Review;
