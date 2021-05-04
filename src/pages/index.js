import Head from "next/head";
import StatusBoard from "../../src/components/StatusBoard";
import EnterStatus from "../../src/components/EnterStatus";
import { useState } from "react";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";
import {useSession} from "next-auth/client";
import Button from "@material-ui/core/Button";
import NavBar from "../components/NavBar";
// import {
//   knex,
//   getUsers,
//   getUser,
//   deleteUser,
//   updateUser,
//   addUser
// } from "../lib/backend-utils";


export default function Home() {
  const [session] = useSession();
  const date = new Date();
  const currentTime = date.toISOString();

  const [posts, updatePosts] = useState([{user:"James", contents:"This is a post.", timestamp:currentTime.toLocaleString("en-US", {timeZone: "UTC"}), likes:["Kaylen", "Yaqi", "Gretchen"]}]);
  const [mode, setMode] = useState("login");
  const [currentUser, setUser] = useState("");

  let statusBoard;
  let enterStatus;
  let log;
  let postButton;
  let navBar;
  let logo;

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
    navBar = <NavBar/>;
    statusBoard = <StatusBoard posts={posts}/>
    postButton = <Button variant="contained" onClick={() => setMode("add")} type="button">Post a Status</Button>
    //log = <Login/>
  }else if (mode === "add"){
    navBar = <NavBar/>;
    enterStatus = <EnterStatus user={currentUser.email} complete={complete}/>
    //log = <Login/>
  }else if (mode === "login"){
    log = <Login/>
    logo = <img src="/ScoopLogo3.png" alt="Logo"/>
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
      
        {navBar}
        
        {logo}
        {log}
        {statusBoard}
        {enterStatus}
        {postButton}

        <p />
        

      </main>

      <footer>A CS 312 Project </footer>
    </div>
  );

}