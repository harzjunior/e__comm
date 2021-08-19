import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles"; // used material-UI styling for this project

const CartItem = ({ item, onUpdateCartQuantity, onRemoveFromCart }) => {
  const classes = useStyles();

  return (
    <Card className="cart-item">
      <CardMedia
        className={classes.media}
        image={item.media.source}
        alt={item.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" className={classes.nameStyling}>
          {item.name}
        </Typography>
        <Typography variant="h5" className={classes.fontstyling}>
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
