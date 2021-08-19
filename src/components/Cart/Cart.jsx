import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles"; // used material-UI styling for this project
import CartItem from "./cartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart, start adding some!
      <Link to="/" className={classes.link}>
        start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
