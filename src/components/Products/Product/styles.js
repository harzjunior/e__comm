import { makeStyles } from "@material-ui/core/styles";     // JSS used material-UI styling for this project

// makeStyles takes one parameter and with an instance return (makeStyles(()=> ({}))), we gonna write our styles
// root, media (classes.root, classes.media) are all name of classes for material UI and then Export it to the singular proct component to be used
export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 100, // image product bottom
    paddingTop: "100%",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  nameStyling: {
    fontSize: "20px",
    fontWeight: 400,
    fontFamily: `Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;`,
  },
  productFontStyle: {
    fontSize: "14px",
    fontFamily: `Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;`,
  },
  prodFontstyling: {
    fontSize: "22px",
    fontWeight: 700,
    color: "black",
  },
  prodnameStyling: {
    color: "green",
    fontSize: "20px",
    fontWeight: 400,
    fontFamily: `Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;`,
  },
}));
