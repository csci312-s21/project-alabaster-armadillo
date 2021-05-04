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

export default function EnterStatus({ user, complete }) {
  const [contents, setContents] = useState("");  

  //Post button
  const postButton = () => {
    const date = new Date();
    const currentTime = date.toLocaleString("en-US", { timeZone: "America/New_York" });

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

      
          <center>
            <TextField variant="outlined"
              multiline
              style = {{width: 500}}
              rows={12}
              id="contents"
              value={contents}
              placeholder="Enter the Scoop!"
              onChange={(evt) => setContents(evt.target.value)}
            />
          </center>
      
          <p />

          <div>
            <Box display="flex" justifyContent="space-evenly">
             
              <Button variant="contained" onClick={() => postButton()}
                type="button" disabled={(contents==="")} >Post</Button>
              <Button variant="contained" onClick={() => complete()} type="button">Cancel</Button>
              
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