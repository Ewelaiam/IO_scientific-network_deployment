import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom"
import eventbus from '../eventbus/eventbus'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import {useState} from "react";
import {ProfileData} from "../../types/ProfileData";
import SearchResults from "./results";
import {useCookies} from "react-cookie";

const Search = styled('div')(({ theme }) => ({
  'z-index':9999,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {

  const [cookies, setCookie, removeCookie] = useCookies(['loginCookie'])
  const navigate = useNavigate()
  const [profUsers, setProfUsers] = useState<ProfileData[]>([])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  let timeout: number

  const searchHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => requestSearch(event.target.value), 200 );
  }
  const requestSearch = (query: String) => {
    const fetchUrl = 'http://localhost:8080/profile/'+cookies.loginCookie+'/users?query='+query;
    fetch(fetchUrl)
        .then(response => response.json())
        .then((data:ProfileData[]) => fillResults(data)
    )
  }


  const fillResults = (users: ProfileData[]) => {
    setProfUsers(users)
  }



  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    removeCookie("loginCookie", {path:'/'})
    navigate("/login")
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate('/profil/' + cookies.loginCookie)}>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
    </Menu>
  );

  const handleSearchClick = () => {
    setProfUsers([])
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );
  return (
    <div style={{position: "fixed", top: "0", width: "100%", left: "0"}}>
      <AppBar position="static" style={{ background: '#16484F' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>

          {cookies.loginCookie != null && cookies.loginCookie != -1?<IconButton
            size="large"
            component="div"
            color="inherit"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/network')}
          >
            Network
          </IconButton>:<p></p>}
          {cookies.loginCookie != null && cookies.loginCookie != -1?
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    onChange={searchHandler}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <SearchResults results={profUsers} resetFun={handleSearchClick}></SearchResults>
              </Search>:
          ""}


          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {cookies.loginCookie != null && cookies.loginCookie != -1?<IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>:<p></p>}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
