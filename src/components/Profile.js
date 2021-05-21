/*
This component appears for users who have logged on to the Scoop for the first time and are prompted to enter their first and last names which then updates the User component in the database.
*/
import { useState } from "react";
import { useSession } from "next-auth/client";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import styles from "../styles/Profile.module.css";
import Box from "@material-ui/core/Box";

export default function Profile({ user, complete }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [session] = useSession();

  const saveButton = async() => {
     let newUserInfo= {
       user_id: session.id,
       firstName: firstName,
       lastName: lastName,
       post: "",
       postTime: "",
       postLikes: "",
       postReports: ""
     }

    console.log(session);

    newUserInfo = { ...user, ...newUserInfo };
    
    const response = await fetch(
      `/api/posts/${user.user_id}`,
      {
        method: "PUT",
        body: JSON.stringify(newUserInfo),
        headers: new Headers({ "Content-type": "application/json" }),
      });

    console.log(newUserInfo);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    complete();
  }

  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #F9BABF 30%, #C5DEC9 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 40,
      padding: "0 30px"
    }
  })(Button);

  return (
    <div>
      <h2 className = {styles.heading} > Profile </h2>
      <p className = {styles.description}>
          Welcome to The Scoop! Enter your first and last name so that your friends know who you are when you post.
      </p>
      <form >
      <Box display="flex" justifyContent="center">
        <TextField id="outlined-basic" label="First" variant="outlined" color= "secondary"
            value={firstName}
            onChange={(evt) => setFirstName(evt.target.value)} />
        <TextField id="outlined-basic" label="Last" variant="outlined" color="secondary" value= {lastName} onChange={(evt) => setLastName(evt.target.value)} />
      </Box>
      </form>
      <p></p>
      <Box display="flex" justifyContent="space-evenly">
        <StyledButton className = {styles.button} onClick={() => saveButton()}
          type="button" variant="contained" disabled={(firstName==="" || lastName ==="")} >Save</StyledButton>
        <StyledButton className = {styles.button}  variant="contained" onClick={() => complete()} type="button">Cancel</StyledButton>
      </Box>
      </div>
   );
}