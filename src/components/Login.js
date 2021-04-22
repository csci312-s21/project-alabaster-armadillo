import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { useState } from "react";


export default function Login({ complete }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <TextField id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text" 
          name="email" 
          value={email}
          onChange={(input) => setEmail(input.target.value)}
        />
      </div>
      <p />
      <div>
        <TextField id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password" 
          name="password" 
          value={password}
          onChange={(input) => setPassword(input.target.value)}
        />
      </div>
      <p />
      <div>
      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" type="button" name="login" disabled = {email === "" || password === ""} onClick={() => complete({"email": email, "password": password})}>Log in</Button>
        
        <Button variant="contained" type="button" name="login" onClick={() => complete()}>Sign up</Button>
      </Box>
      </div>
    </div>
  );

}


Login.propTypes = {
  user:PropTypes.object,
  complete:PropTypes.func.isRequired
};