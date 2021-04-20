/*

Props: 
  post (an object that includes: 
  user, timestamp, contents)

Properties within the post object: user refers to author of the post, timestamp records timing of when the "post" button is hit, and contents is text entry that the author chooses to publish.
*/
import PropTypes from "prop-types";
import styles from "../styles/Post.module.css";
import { useState } from "react";

export default function Post({ post }) {

  const [likes, setLikes] = useState();

    return (
    <div className = {styles.post} > 
      <h2> {post.user} </h2>
      <p> {post.contents}</p>
      <p className = {styles.timestamp}>{post.timestamp}</p>
      <span className = {styles.like} onClick={() => setLikes(likes)} type="button">♥</span>
    </div>);

}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};