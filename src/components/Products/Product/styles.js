import { makeStyles } from "@material-ui/core/styles";     // JSS used material-UI styling for this project

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
