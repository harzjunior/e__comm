import { Grid } from "@material-ui/core";
import Product from "./Product/Product"; // import the singular product component.
import useStyles from "./styles"; // used material-UI styling for this project

const Products = ({ products, onAddToCart }) => {
  // the styles for the this page
  const classes = useStyles();

  return (
    <main className={classes.content}>
      {/* the toolbar pushes the content a little bit below */}
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {/* put the items in grid */}
        {/* get each products from the array using map and mobile responsive(xs={6} md={4} lg={3}) */}
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* a singular product components inside  components/Products folder */}
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
