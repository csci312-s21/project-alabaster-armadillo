/*

Props:
  post (an object that includes:
  user, timestamp, contents)

Properties within the post object: user refers to author of the post, timestamp records timing of when the "post" button is hit, and contents is text entry that the author chooses to publish.
*/
import PropTypes from "prop-types";
import styles from "../styles/Post.module.css";
import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";

//import Typography from '@material-ui/core/Typography';
import React from "react";
//import { spacing } from "@material-ui/system";
import LikeButton from "../components/LikeButton";
import ReportButton from "../components/ReportButton";


export default function Post({ post }) {
  const [liked, setLike] = useState("unlike");
  const [reported, setReport] = useState("unreported");
  const [counter, setCounter] = useState(8);

  const handleClick = (action) => {
    if(action !== liked){
      setLike(action);
     
    }
  }
  const handleClickReport = (action) => {
    if(action !== reported){
      setReport(action);  
    }   
  }

  let isReported;
    if(reported === "reported"){
    isReported = true;
   
  }
  else{
    isReported = false;
  }

 let isLiked;
  if(liked === "like"){
    isLiked = true;
  }
  else{
    isLiked = false;
  }

 
  
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

    return (
  
      <Box
        justifyContent="center"
        
        alignItems="center"
        color="#000000"
        bgcolor= "#FFFFFF"
        fontFamily = "Courier New"
        width = "600px"
        height = "200px"
        padding= "0 0px"
        boxShadow= "0 3px 5px 2px rgba(255, 105, 135, .3)"
        
      >
      
        <h3  className = {styles.userName}> { post.user } </h3>
        <p className = {styles.postText}> { post.contents }</p>
        <p className = {styles.counter}> {counter}</p>
      
        <LikeButton liked = {isLiked} handleClick = {handleClick}> </LikeButton>
        <ReportButton reported = {isReported} handleClick = {handleClickReport}> </ReportButton>
      </Box>
    
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

//<small> { counter }</small>







