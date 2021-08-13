import { makeStyles } from '@material-ui/core/styles';    // JSS used material-UI styling for this project

export default makeStyles(() => ({
  media: {
    height: 100, // image product bottom
    paddingTop: '100%',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  fontstyling: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'black',
  },
  nameStyling: {
    color: "green",
    fontSize: '20px',
    fontWeight: 400,
    fontFamily: `Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;`,
  },
}));