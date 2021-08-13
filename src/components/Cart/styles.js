import {makeStyles} from '@material-ui/core/styles'    // JSS used material-UI styling for this project

export default makeStyles((theme)=>({
    toolbar: theme.mixins.toolbar,
    title: {
        marginTop: '0',
        marginBottom: '1%',
    },
    emptyButton:{
        minWidth: '150px',
        [theme.breakpoints.down('xs')]:{
            marginBottom: '5px',
        },
        [theme.breakpoints.up('xs')]:{
            marginRight: '20px',
        },
    },
    checkoutButton: {
        minWidth: '150px',
    },
    link: {
        textDecoration: 'none',
        fontWeight: 800,
        
    },
    cardDetails: {
        display: 'flex',
        marginTop: '10%',
        width: '100%',
        justifyContent: 'space-between',
    },
}));