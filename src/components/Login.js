import PropTypes from "prop-types";
import { useState } from "react";

export default function Login({ complete }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <input type="text" 
          name="email" 
          placeholder="email"
          value={email}
          onChange={(input) => setEmail(input.target.value)}
        />
      </div>
      <div>
        <input type="password" 
          name="password" 
          placeholder="password"
          value={password}
          onChange={(input) => setPassword(input.target.value)}
        />
      </div>
      <p />
      <div>
        <center><button type="button" name="login" disabled = {email === "" || password === ""} onClick={() => complete({"email": email, "password": password})}>Login</button></center>
      </div>
    </div>
  );

}


Login.propTypes = {
  user:PropTypes.object,
  complete:PropTypes.func.isRequired
};