import Head from "next/head";
import StatusBoard from "../../src/components/StatusBoard";
import { useState } from "react";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";
import {useSession} from "next-auth/client";
import NavBar from "../components/NavBar";

export default function Home() {
  const [session] = useSession();
  const date = new Date();
  const currentTime = date.toISOString();

  const [posts, updatePosts] = useState(
    [{key: "James", user:"James", contents:"'alskdjf;alskdjfa;lskdjfa;lsdkfja;lsdkfja;lsdkfja;lsdkfja;sl", timestamp:currentTime.toLocaleString("en-US", {timeZone: "UTC"}), likes:["Kaylen", "Yaqi", "Gretchen"],tags:[{value:"ross", name:"Ross"},{value:"atwater", name:"Atwater"}]}]
  );
  const [mode, setMode] = useState("login");
  const [currentUser, setUser] = useState("");

  let statusBoard;
  let log;
  let navBar;
  let logo;

 const complete = function com(newPost) {

  if(newPost){
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
    navBar = <NavBar user={currentUser.email} complete={complete}/>;
    statusBoard = <StatusBoard posts={posts}/>
    //enterStatus = <EnterStatus user={currentUser.email} complete={complete}/>
    //log = <Login/>
  }else if (mode === "login"){
    log = <Login/>
    logo = <img src="/ScoopLogo3.png" alt="Logo"/>
    if (session) {
      setUser(session.user);
      setMode("view");
    }
  }
//<AppBar position="sticky" color="transparent" children={enterStatus}></AppBar>
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
      </main>
      <footer>A CS 312 Project </footer>
    </div>
  );

}