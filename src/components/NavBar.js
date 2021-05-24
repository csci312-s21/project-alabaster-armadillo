
import React from "react";
import {makeStyles } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";



import Box from "@material-ui/core/Box"
import EnterStatus from "../../src/components/EnterStatus";
import Login from "../components/Login";

const StyledAppBar = withStyles({
  root: {
    background: "white",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 280,
    width: "600px",
    padding: "0 5px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  } 
})(AppBar);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: .25
  },
 
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
  },
}));

export default function NavBar({user, complete}) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <StyledAppBar position="sticky">
        <Toolbar>
        <img src="/ScoopLogo_clipped.png" alt="Logo"  width="243" height="144" align = "left"/>
         
        
          <Box margin = {5}>
          <Login> </Login>
          </Box>
        </Toolbar>
        <EnterStatus user={user} complete={complete}/>
      </StyledAppBar>
    
    </div>
  );
}