
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// import {
//   knex,
//   getUsers,
//   getUser,
//   addUser,
// } from "../lib/backend-utils";

import {
  signIn, 
  signOut,
  useSession
} from "next-auth/client";

export default function Login() {

  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #F9BABF 30%, #C5DEC9 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px"
    
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

