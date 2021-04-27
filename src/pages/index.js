import Head from "next/head";
import StatusBoard from "../../src/components/StatusBoard";
import EnterStatus from "../../src/components/EnterStatus";
import { useState } from "react";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";
import {useSession} from "next-auth/client";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";


export default function Home() {
  const [session] = useSession();
  const date = new Date();
  const currentTime = date.toISOString();
  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #F9BABF 30%, #F4D3BF 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    }
  })(Button);


  const [posts, updatePosts] = useState([{user:"James", contents:"This is a post.", timestamp:currentTime.toLocaleString("en-US", {timeZone: "UTC"}), likes:["Kaylen", "Yaqi", "Gretchen"]}]);
  const [mode, setMode] = useState("login");
  const [currentUser, setUser] = useState("");

  let statusBoard;
  let enterStatus;
  let login;
  let logout;
  let postButton;

  const complete = function com(new_post) {
    if (new_post) {
      // create deep copy of collection
      let copy_posts = JSON.parse(JSON.stringify(posts));
      // add post to copy of posts data
      copy_posts = [...copy_posts, new_post];
      updatePosts(copy_posts);
      setMode("view");
    } else {
      setMode("view");
    }
  }

  if (mode === "view"){
    statusBoard = <StatusBoard posts={posts}/>
    postButton = <StyledButton variant="contained" onClick={() => setMode("add")} type="button">Post a Status</StyledButton>
    logout = <Login/>
  }else if (mode === "add"){
    enterStatus = <EnterStatus user={currentUser.email} complete={complete}/>
    logout = <Login/>
  }else if (mode === "login"){
    login = <Login/>
    if (session) {
      setUser(session.user);
      setMode("view");
    }
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>The Scoop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      
        <img src="/ScoopLogo.png" alt="Logo"/>

        {statusBoard}
        {enterStatus}
        {postButton}

        <p />
        
        {login}
        {logout}

      </main>

      <footer>A CS 312 Project </footer>
    </div>
  );

}