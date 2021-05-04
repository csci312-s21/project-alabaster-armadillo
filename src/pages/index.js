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

 const complete = function com(newPost) {

  if(newPost){
    /*
    if(posts.user === currentUser){
      console.log("UPDATING POST!");
      let copyPosts = posts.map((p) => {
        if(p.user === newPost.user){
          return newPost; 
        }else{
          return p;
        }
      updatePosts(copyPosts);
      });

   }else{
      console.log("ADDING POST!");
     //Create deep copy of collection
      let copyPosts = JSON.parse(JSON.stringify(posts));
      //Add post to copy of posts data
      copyPosts = [...copyPosts, newPost];
      updatePosts(copyPosts);
   }
   */
    //Create deep copy of collection
      let copyPosts = JSON.parse(JSON.stringify(posts));
      //Add post to copy of posts data
      copyPosts = [...copyPosts, newPost];
      updatePosts(copyPosts);
      setMode("view");

    //Set timer for post to expire after certain # of seconds --> 4000 = 4 secs 
    setTimeout(() => {
        const finalPosts = posts.filter(post => post !== newPost);
        updatePosts(finalPosts);
      }, 8000) //currently timer for posts is set at 4 seconds
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