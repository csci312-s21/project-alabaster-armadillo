/*
This component shows the interface where a user can enter a post. They will be able to type in a status and then choose to 'post' or to 'cancel'

The interface has two buttons. If "Cancel" is clicked, the `complete` callback is called with no arguments. If the "Post" button is clicked, the `complete` callback is called with a new post object with `user`, `contents`, and `timestamp`.

Props:
 complete - function to call on post completion (required)
 user - the username of the user who is posting 

*/

import PropTypes from "prop-types";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function EnterStatus({ user, complete  }) {
  const [contents, setContents] = useState("");

  //Post button
  const postButton = () => {

    let updateUserPost = {
        post: contents,
        postTime: 0
      };
    
    if (user) {
      updateUserPost = {...user, ...updateUserPost};
    }
      
    complete(updateUserPost);
  };

  const handlePost = (h) => {
    if (h === "Post"){
      postButton();
      setContents("");
    }else if (h === "Cancel"){
      complete()
      setContents("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    if (contents.length > 61) {
      if (e.keyCode !== 8) { // if the event is not backspace, disable typing
        e.preventDefault();
      }
    }
  };

  return (
      <div>
        <p
            value={user}         
          />
        <form>
          <center>
            <TextField name="limitedtextfield"
              variant="outlined"
              multiline
              style = {{width: 500}}
              rows={1}
              maxLength="60"  
              color= "secondary"
              id="contents"
              value={contents}
              placeholder="Enter the Scoop (in less than 60 characters)!"
              onKeyDown={handleKeyDown}
              onChange={(evt) => setContents(evt.target.value)}
            />
          </center>
      
          <p />

          <div>
            <Box display="flex" justifyContent="space-evenly">
             
              <Button variant="contained" onClick={() => handlePost("Post")}
                type="button" disabled={(contents==="") || (contents.length>61)} >Post</Button>
              <Button variant="contained" onClick={() => handlePost("Cancel")} type="button">Cancel</Button>
              
            </Box>
          </div>
        </form>
      </div>
    );
}

EnterStatus.propTypes = {
  complete: PropTypes.func,
  userid: PropTypes.string
};