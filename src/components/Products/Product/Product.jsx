// singular product components(all the layout for one specific product e.g the image the description the title)
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles"; // used material-UI styling for this project

// destructure the product by {product} instead of props.name and son on

// now we can call the useStyles that we just imported
const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  // eslint-disable-next-line
  {
    /* the classes are called from styles.js file inside components/Products/Product */
  }
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography
            variant="h5"
            className={classes.prodnameStyling}
            gutterBottom
          >
            {product.name}
          </Typography>
          <Typography variant="h5" className={classes.prodFontstyling}>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          className={classes.productFontStyle}
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
