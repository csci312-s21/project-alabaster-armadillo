/*
This component shows the interface where a user can enter a post. They will be able to type in a status and then choose to 'post' or to 'cancel'

The interface has two buttons. If "Cancel" is clicked, the `complete` callback is called with no arguments. If the "Post" button is clicked, the `complete` callback is called with a new post object with `user`, `contents`, and `timestamp`.

Props:
 complete - function to call on post completion (required)
 user - the username of the user who is posting 

*/
import PropTypes from "prop-types";
import { useState } from "react";

export default function EnterStatus({ user, complete }) {
  const [contents, setContents] = useState("");

  //Post button
  const postButton = () => {
    const date = new Date();
    const currentTime = date.toLocaleString("en-US", {timeZone: "UTC"});

    const new_post = {
        user: user,
        contents: contents,
        timestamp: currentTime
      };
    
    complete(new_post);
  };

  return (
      <div>
        <p
            value={user}         
          />
        <form>

          <textarea
           rows="10"
           cols="50"
           id="contents"
            value= {contents}
            placeholder="Enter your status here!"
            onChange={(evt) => setContents(evt.target.value)}
          />
          <button onClick={() => postButton()}
            type="button" disabled={(contents==="")} >Post</button>
         <button onClick={() => complete()} type="button">Cancel</button>
        </form>
      </div>
    );
}

EnterStatus.propTypes = {
  complete: PropTypes.func,
  userid: PropTypes.string
};