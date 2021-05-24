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
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
//import Typography from '@material-ui/core/Typography';
import React from "react";
//import { spacing } from "@material-ui/system";
import LikeButton from "../components/LikeButton";
import ReportButton from "../components/ReportButton";
export default function Post({ user, currentUser, session }) {

  const [liked, setLike] = useState("unlike");
  const [reported, setReport] = useState("unreported");
  const [counter, setCounter] = useState(8);

  //console.log(currentUser);

  //const likeUserArray = JSON.parse(user.postLikes);

   let isLiked;
    if(liked === "like"){
    isLiked = true;
  }
  else{
    isLiked = false;
  }
//   const inLikeUserArray = (likeUserArray)=> {
//     const hasLiked = likeUserArray.find((user)=>{
//       (currentUser.firstName + "_" + currentUser.lastName)=== (user.firstName + "_" + user.lastName)
//     })
//     if(hasLiked){
//       isLiked = true;
//     }
//     else{
//       isLiked = false;
//     }
//     return isLiked;
// }
// let isLiked = inLikeUserArray(likeUserArray);
// console.log("isLiked",isLiked);

  const handleClick = async (action) => {

    let likeUserArray = JSON.parse(user.postLikes);

    

    if(action === "like"){
      setLike("like");
      likeUserArray.push(`${currentUser.firstName  }_${  currentUser.lastName}`);
    }
    else{ //if someone unlikes a post, remove their name from the array)
      setLike("unlike");
      likeUserArray = likeUserArray.filter(likeUser => likeUser !== (`${currentUser.firstName  }_${  currentUser.lastName}`));
    }
    likeUserArray= JSON.stringify(likeUserArray);
     const updateUserPost = {...user, postLikes: likeUserArray };
     await fetch(
      `/api/posts/${session.user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updateUserPost),
        headers: new Headers({ "Content-type": "application/json" }),
      });
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
  useEffect(() => {

    const timer = counter <= 3600000 && setInterval(() => setCounter(counter + 1), 1000);
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
        height = "180px"
        padding= "0px 0px 0px 0px"
        margin= "20px 20px 20px 20px"
        boxShadow= "0 3px 5px 2px rgba(255, 105, 135, .3)"
        hyphens = "manual" >



        <h3 className = {styles.userName}> {user.firstName} { user.lastName} </h3>
        <p className = {styles.postText}> { user.post }</p>

        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <LikeButton selfPost = {false} liked = {isLiked} handleClick = {handleClick}>  </LikeButton>
              <ReportButton reported = {isReported} handleClick = {handleClickReport} > </ReportButton>
            </Grid>
            <Grid item >
              <p className = {styles.counter}> {counter}</p>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
  );
}
Post.propTypes = {
  user: PropTypes.object.isRequired,
};
