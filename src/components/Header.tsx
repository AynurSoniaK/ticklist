import React, { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import { UserContext } from '../context/UserContext';

type UserType = {
    uid: string,
    username: string,
    photo: string,
    email: string
};

const Header: React.FC = () => {

    const userContext = useContext(UserContext)

    const settings = ['Profile', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [userReady, setUserReady] = useState<boolean>(false);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid || '',
                    username: user.displayName || '',
                    photo: user.photoURL || '',
                    email: user.email || '',
                });
                setUserReady(true)
            }
        });
    }, [])

    return (
        <AppBar position="static" elevation={0} sx={{ borderRadius: '20px 20px 0px 0px', minHeight: { xs: '40px', md: '70px' } }}>
            <Container maxWidth="xl" disableGutters>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, margin: "0 0 0 20px" }}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon style={{ fontSize: '40px' }} />
                        </IconButton>
                        <Menu
                            elevation={0}
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'flex', md: 'flex'  },
                                flexDirection: 'row'
                            }}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, padding: "30px 0px", margin: "0 90px 0 0" }}>
                        {userReady ? (
                            <>
                                <IconButton>
                                    <Avatar alt="user photo" src={userContext.user?.photo} sx={{ width: { xs: '50px', md: '80px' }, height: { xs: '50px', md: '80px' } }} />
                                </IconButton>
                                <Box sx={{ display: "flex", alignItems: 'center', ml: '10px' }}>
                                    <Typography sx={{ fontSize: { xs: '20px', sm: '30px', md:'40px' }}} variant={'h3'} component={'h1'}>Hello, {userContext.user?.username}. </Typography>
                                </Box>
                            </>
                        ) :
                            <>
                                <IconButton>
                                    <Avatar sx={{ width: { xs: '50px', md: '80px' }, height: { xs: '50px', md: '80px' } }} />
                                </IconButton>
                                <Box sx={{ display: "flex", alignItems: 'center', ml: '10px' }}>
                                    <Typography variant={'h3'} component={'h1'}>Hello </Typography>
                                </Box>
                            </>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;