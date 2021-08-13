import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/psb__logo.png';
import useStyles from './styles';         // used material-UI styling for this project
import {Link, useLocation} from 'react-router-dom';  // useLocation is a hook e.g when you dont wanna show something let's a cart icon then we use it on a page that we currently  dont wanna see the icon



// layaout of our navbar
const Navbar = ({totalItems}) => {

    const classes = useStyles();
    const location = useLocation();


    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
            {/* appears in the left side of the nav bar */}
            {/* component={Link} to='/' links to cart directly*/}
                <Typography component={Link} to='/' variant="h6" className={classes.title} color='inherit'>
                    <img src={logo} alt='P.S.B Shop' height='50px' className={classes.image}/>P.S.B
                </Typography>
                {/* takes space in the middle of the nav bar as much as we need (classes.grow) */}
                <div className={classes.grow}/>

                {location.pathname === '/' && (
                <div className={classes.button}>
                {/* component={Link} to='/cart' links to cart directly*/}
                    <IconButton component={Link} to='/cart' aria-label="show-cart-items" color="inherit">
                      <Badge badgeContent={totalItems} color="secondary"> {/*badgeContent will equal to the number of items we have */}
                      <ShoppingCart/> {/* shopping cart icon also imported from material UI */}
                     </Badge>
                    </IconButton>
                </div>)}
            </Toolbar>
            </AppBar>
        </>
    ) 
}

export default Navbar;
 