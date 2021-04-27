
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

import {
  signIn, 
  signOut,
  useSession
} from "next-auth/client";

export default function Login() {

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

  const [ session ] = useSession()


  if (session){
    return (<div>
          <StyledButton variant="contained" name="login" onClick={signOut}>Sign out</StyledButton>
         </div>
         );
  }else{
    return (<div>
            <StyledButton variant="contained" name="logout" onClick={signIn}>Sign in</StyledButton>
         </div>);
  }
}

/*
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
*/