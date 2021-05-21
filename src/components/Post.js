/*

Props:
  post (an object that includes:
  user, timestamp, contents)

Properties within the post object: user refers to author of the post, timestamp records timing of when the "post" button is hit, and contents is text entry that the author chooses to publish.
*/
import PropTypes from "prop-types";
import styles from "../styles/Post.module.css";
import { useState, useEffect } from "react";

export default function Post({ user }) {
  const [likes, setLikes] = useState();
  const [counter, setCounter] = useState(8);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

    return (

    <div className = {styles.post} >
      <h2> { user.firstName } </h2>
      <p> { user.post }</p>
      
      <p className = {styles.timestamp}>{user.postTime}</p>

      <p> {counter}</p>

      <span className = {styles.like} onClick={() => setLikes(likes)} type="button">♥</span>
    </div>

    );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

//<small> { counter }</small>