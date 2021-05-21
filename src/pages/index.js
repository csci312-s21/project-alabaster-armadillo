import Head from "next/head";
import StatusBoard from "../../src/components/StatusBoard";
import { useState } from "react";
import Login from "../components/Login";
import Profile from "../components/Profile";
import styles from "../styles/Home.module.css";
import {useSession} from "next-auth/client";
import NavBar from "../components/NavBar";


export default function Home() {
  const [session] = useSession();
  const date = new Date();
  const currentTime = date.toISOString();

  const [posts, updatePosts] = useState(
    [{key: "James", user:"James", contents:"This is a post.", timestamp:currentTime.toLocaleString("en-US", {timeZone: "UTC"}), likes:["Kaylen", "Yaqi", "Gretchen"],tags:[{value:"ross", name:"Ross"},{value:"atwater", name:"Atwater"}]}]
  );
  const [mode, setMode] = useState("login");
  const [currentUser, setUser] = useState("");

  let statusBoard;
  let log;
  let navBar;
  let logo;
  let profile;

  //Fetch users from the server
  const getUsers = async () => {
    const response = await fetch(`/api/posts`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const userData = await response.json();
    updatePosts(userData);
  };


 const complete = async (newPost) => {

  if(newPost){

    const response = await fetch(
      `/api/posts/${currentUser.user_id}`,
      {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: new Headers({ "Content-type": "application/json" }),
      });
      setMode("view");

    //Set timer for post to expire after certain # of seconds --> 4000 = 4 secs 
    setTimeout(() => {
        const finalPosts = posts.filter(post => post !== newPost);
        updatePosts(finalPosts);
      }, 8000) //currently timer for posts is set at 8 seconds
  } else {
      setMode("view");
  }
}
  console.log(currentUser);
  console.log(currentUser.firstName);
  if(mode === "view" && !(currentUser.firstName)){
    profile = <Profile complete = {complete} user = {currentUser} /> 
  }
  else if (mode === "view" && currentUser.firstName){
    console.log(currentUser);
    navBar = <NavBar user={currentUser.email} complete={complete}/>;
    statusBoard = <StatusBoard posts={posts} user={currentUser}/>
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
        {profile}
        {log}
        {statusBoard}
        <p /> 
      </main>
      <footer>A CS 312 Project </footer>
    </div>
  );

}