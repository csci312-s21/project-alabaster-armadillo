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
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";
import { withStyles } from '@material-ui/core/styles';

export default function EnterStatus({ user, complete }) {
  const [contents, setContents] = useState("");

  const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #F9BABF 30%, #F4D3BF 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
  })(Button);

  
  

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

      
          <center>
            <TextField variant="outlined"
              multiline
              style = {{width: 500}}
              rows={12}
              id="contents"
              value= {contents}
              placeholder="Enter the Scoop!"
              onChange={(evt) => setContents(evt.target.value)}
            />
          </center>
      
          <p></p>

          <div>
            <Box display="flex" justifyContent="space-evenly">
             
              <StyledButton variant="contained" onClick={() => postButton()}
                type="button" disabled={(contents==="")} >Post</StyledButton>
              <StyledButton variant="contained" onClick={() => complete()} type="button">Cancel</StyledButton>
              
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