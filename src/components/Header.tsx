import React, { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { UserContext } from '../context/UserContext';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxWidth: 300,
    boxShadow: 24,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    border: '2px solid #000',
    p: 4,
};


type UserType = {
    uid: string,
    username: string,
    photo: string,
    email: string
};

type FormData = {
    username: string
    photo: string
}

const Header: React.FC = () => {

    const userContext = useContext(UserContext)
    const initialFormData: FormData = {
        username: '',
        photo: '',
    };

    console.log(initialFormData)

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const settings = ['Profile', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [userReady, setUserReady] = useState<boolean>(false);
    const [userChanged, setUserChanged] = useState<boolean>(false);


    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const capitalize = (str: String) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElNav(event.currentTarget);
    // };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const auth = getAuth();

    const handleUpdateUser = async () => {

        if (!formData.username || !formData.photo) return;

        // const userCredential = await createUserWithEmailAndPassword(
        //     auth, formData.username, formData.photo
        // );

        const user = auth.currentUser;

        if (user !== null) {
            try {
                await updateProfile(user, {
                    displayName: formData.username,
                    photoURL: formData.photo
                });
                setFormData({
                    username: '',
                    photo: '',
                })
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("No user is currently signed in.");
        }
        handleClose()
        if (userContext.user) {
            const userUpdates: UserType = {
                uid: userContext.user.uid,
                username: capitalize(formData.username) ?? userContext?.user?.username,
                photo: formData.photo ?? userContext?.user?.photo,
                email: userContext.user.email,
            };
            userContext.setUser(userUpdates);
            setUserChanged(!userChanged)
        }
    }


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
                setFormData({
                    username: user.displayName || '',
                    photo: user.photoURL || '',
                })
            }
        });
    }, [userChanged])

    return (
        <AppBar position="static" elevation={0} sx={{ borderRadius: '20px 20px 0px 0px', minHeight: { xs: '40px', md: '70px' } }}>
            <Container maxWidth="xl" disableGutters>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, margin: "0 0 0 20px" }}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            //onClick={handleOpenNavMenu}
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
                            //onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'flex', md: 'flex' },
                                flexDirection: 'row'
                            }}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting}
                                //onClick={handleCloseNavMenu}
                                >
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
                                    <Typography sx={{ fontSize: { xs: '20px', sm: '30px', md: '40px' } }} variant={'h3'} component={'h1'}>Hello, {userContext.user?.username ? userContext.user.username : "stranger"}.  </Typography>
                                    <DriveFileRenameOutlineIcon onClick={handleOpen} sx={{ fontSize: { xs: '30px', md: '40px' }, marginLeft: "20px" }}></DriveFileRenameOutlineIcon>
                                    <LogoutIcon sx={{ fontSize: { xs: '30px', md: '40px' }, marginLeft: "20px" }}></LogoutIcon>
                                </Box>
                            </>
                        ) :
                            <>
                                <IconButton>
                                    <Box sx={{ width: { xs: '50px', md: '80px' }, height: { xs: '50px', md: '80px' } }} />
                                </IconButton>
                                <Box sx={{ display: "flex", alignItems: 'center', ml: '10px' }}>
                                </Box>
                            </>
                        }
                    </Box>
                </Toolbar>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {!userReady ? (
                        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <p>Loading...</p>
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <form>
                                <Typography variant="h6" component="h1" gutterBottom marginBottom={5} sx={{ textTransform: 'uppercase', display: 'flex', justifyContent: 'center' }}>
                                    Modify your profile
                                </Typography>
                                <Box marginBottom={3}>
                                    <TextField
                                        placeholder={userContext?.user?.username}
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 5 } }}
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        name="username"
                                        autoComplete="off"
                                    />
                                </Box>
                                <Box marginBottom={3}>
                                    <TextField
                                        placeholder={userContext?.user?.photo}
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 5 } }}
                                        value={formData.photo}
                                        onChange={handleInputChange}
                                        name="photo"
                                        autoComplete="off"
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ p: '10px 20px', borderRadius: '20px', marginRight: '20px', opacity: 0.8, margin: '5px' }}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="button-gradient"
                                    sx={{ p: '10px 20px', borderRadius: '20px' }}
                                    onClick={handleUpdateUser}
                                >
                                    Update profile
                                </Button>
                                {/* <Box marginBottom={3}>
                                    <TextField
                                        placeholder="Email"
                                        type="email"
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 5 } }}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        name="email"
                                        autoComplete="off"
                                    />
                                </Box>
                                <Box marginBottom={3}>
                                    <TextField
                                        placeholder="Password"
                                        type="password"
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 5 } }}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        name="password"
                                        autoComplete="new-password"
                                    />
                                </Box> */}
                            </form>
                        </Box>
                    )}
                </Box>
            </Modal>
        </AppBar>
    );
}

export default Header;