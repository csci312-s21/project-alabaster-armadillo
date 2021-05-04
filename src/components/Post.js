/*

Props:
  post (an object that includes:
  user, timestamp, contents)

Properties within the post object: user refers to author of the post, timestamp records timing of when the "post" button is hit, and contents is text entry that the author chooses to publish.
*/
import PropTypes from "prop-types";
import styles from "../styles/Post.module.css";
import { useState, useEffect } from "react";

export default function Post({ post }) {
  const [likes, setLikes] = useState();


  const [counter, setCounter] = useState(8);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


/*
  const calculateTimeLeft = () => {
    const startTime = new Date(post.timestamp);
    let endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + 10000);
    let difference = +new Date(endTime) - +new Date(startTime);
    let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
    return timeLeft;
  }


  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


  // Re-render timer every 1 second
  useEffect(() => {
    const timer=setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
    <span>
      {timeLeft[interval]} {interval}{" "}
    </span>
  );
});
*/

    return (

    <div className = {styles.post} >
      <h2> { post.user } </h2>
      <p> { post.contents }</p>
      
      <p className = {styles.timestamp}>{post.timestamp}</p>
      <p> {counter}</p>
      <span className = {styles.like} onClick={() => setLikes(likes)} type="button">♥</span>
    </div>

    );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

//<small> { counter }</small>