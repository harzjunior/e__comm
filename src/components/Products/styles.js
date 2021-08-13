import { makeStyles } from "@material-ui/core/styles";  // JSS used material-UI styling for this project

export default makeStyles((theme)=>({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1, 
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(5,3,3,3),
    },
    root: {
        flexGrow: 1,
    },
}));
