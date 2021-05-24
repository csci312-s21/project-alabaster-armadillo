/*
 LikeButton.js

  The `LikeButton` component is the implementation of our like button

  The bar has two states determined by `liked`. If false, the like button will show up unfilled and grey, if true, the like button will turn red, indicating that its been liked

  When a button is clicked, `handleClick` is called with "like" or "unlike"

  props:
    liked - a Boolean indicating if the post has already been liked or not
    handleClick - a function called when a button is clicked (required)
*/
import PropTypes from "prop-types";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import styles from "../styles/Like.module.css";

export default function Like({ liked, handleClick, selfPost}) {


//need map for dropdown 
let likeView;

//if the button has not been liked
  if (selfPost){
    likeView = <>
      
      <FavoriteIcon style={{ fontSize: 40 }} className={styles.self} type="like" id="like" />
      </>

  }else{
    if(! liked){ 
      likeView = 
      <FavoriteBorderOutlinedIcon style={{ fontSize: 40 }} className={styles.empty} type="like" id="like" onClick= {() => handleClick("like") }> </FavoriteBorderOutlinedIcon>
    
    }
    else{
      likeView =
      <FavoriteIcon style={{ fontSize: 40 }} className={styles.filled} type="like" id="like" onClick= {() => handleClick("unlike") }>  </FavoriteIcon>
  }}

return( 
  likeView
);
}

Like.propTypes = {
  liked: PropTypes.bool,
  handleClick: PropTypes.func,
}