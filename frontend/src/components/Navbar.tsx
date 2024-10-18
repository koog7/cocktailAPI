import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {logout} from "../containers/Thunk/AuthFetch.ts";
import { useState } from 'react';

const Navbar = () => {

    const userData = useSelector((state: RootState) => state.User.user)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logOut = async () => {
        if(userData){
            await dispatch(logout(userData.token))
            navigate('/')
            localStorage.removeItem("persist:exam:User");
            location.reload()
        }
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static" sx={{backgroundColor:'#424242' , minWidth:'1000px'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{display:'flex', flexGrow: 1 , justifyContent: 'space-between' }}>
                        <NavLink to={'/'} style={{textDecoration:'none', color:'white'}}>
                            Cocktail builder
                        </NavLink>
                    </Typography>
                    {userData? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '18px',
                                marginTop: '17px',
                                marginRight: '10px'
                            }}>Welcome, {userData.displayName}!</p>

                            <div>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    Menu
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose} component={Link} to="/myCocktails">My cocktails</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/createCocktail">Create New cocktail</MenuItem>
                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <NavLink to={'/login'}>
                                <Button color="inherit">Log in</Button>
                            </NavLink>
                            <NavLink to={'/registration'}>
                                <Button color="inherit">Sign up</Button>
                            </NavLink>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;