
import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box"
import EnterStatus from "../../src/components/EnterStatus";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InputBase from '@material-ui/core/InputBase';
import Login from "../components/Login";
import SearchBar from "./SearchBar";
import StatusBoard from "./StatusBoard";


const StyledAppBar = withStyles({
  root: {
    background: "white",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 280,
    padding: "0 5px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  } 
})(AppBar);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: .25,
  },
 
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: '30px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      width: 'auto',
    },
  },
}));

export default function NavBar({user, complete}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const date = new Date();
  const currentTime = date.toISOString();
  const [posts, updatePosts] = useState(
    [{key: "James", user:"James", contents:"This is a post.", timestamp:currentTime.toLocaleString("en-US", {timeZone: "UTC"}), likes:["Kaylen", "Yaqi", "Gretchen"],}]
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

    
  
      <MenuItem>
      <img src="/ScoopLogo_clipped.png" alt="Logo"  width="243" height="144" />
        <IconButton aria-label="show 11 new notifications" color="#F9BABF">
          <Badge badgeContent={11} color="secondary">
            <FavoriteIcon/>
          </Badge>
        </IconButton>
        <p>Likes</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  const [searchTerm, setSearchTerm] = useState("");
  //const [search, setSearch] = useState();
  //load post data
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "/api/posts"
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const postData = await response.json();
      //const 
      updatePosts(postData);
    };
    getData();
  }, []);


  return (
    <div className={classes.grow}>
      <StyledAppBar position="sticky">
        <Toolbar>
        <img src="/ScoopLogo_clipped.png" alt="Logo"  width="243" height="144" align = "left"/>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          <div className={classes.search}>
            <SearchBar
              placeholder="Search…"
              searchTerm={searchTerm}
              setTerm={setSearchTerm}
            />
          </div>
            
          <Box margin = {5}>
          <Login> </Login>
          </Box>
        </Toolbar>
        <EnterStatus user={user} complete={complete}/>
      </StyledAppBar>
      {renderMobileMenu}
      {renderMenu}
      <StatusBoard searchTerm={searchTerm} posts={posts}/>
    </div>
  );
}