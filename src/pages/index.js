import Head from "next/head";
import StatusBoard from "../../src/components/StatusBoard";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import Profile from "../components/Profile";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/client";
import NavBar from "../components/NavBar";

export default function Home() {
  const [session] = useSession();
  const [posts, updatePosts] = useState();

  const [mode, setMode] = useState("login");
  const [currentUser, setUser] = useState("");

  let statusBoard;
  let log;
  let navBar;
  let logo;
  let profile;

  useEffect(() => {
    const getData = async () => {
      if (session) {
        const response = await fetch(`/api/posts/${session.user.id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const user = await response.json();
        setUser(user);
      }
    };
    getData();

  }, [mode]);

  //Fetch users from the server
  const getUsers = async () => {
    const response = await fetch(`/api/posts`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const userData = await response.json();
    updatePosts(userData); //update the post data
  };

  //getUsers every time there is a change in posts
  useEffect(() => {
    getUsers()
  }, []);

  const changeMode = async (newUser) => {

    const response = await fetch(`/api/posts/${session.user.id}`);
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const user = await response.json();
    
    setUser(user);

    if (newUser) {
      setMode("view");
    }
  }

  const complete = async (newPost) => {
   
    if (newPost){

      /*const placePost = await fetch(
        `/api/posts/${session.user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(newPost),
          headers: new Headers({ "Content-type": "application/json" }),
        });
      
      placePost();*/
      setMode("view");
        
      //Set timer for post to expire after certain # of seconds --> 4000 = 4 secs 
      setTimeout(() => {
          const finalPosts = posts.filter(post => post !== newPost);
          updatePosts(finalPosts);
        }, 8000) //currently timer for posts is set at 60 minutes //3600000 for 60 mins
    } else {
      setMode("view");
    }
  }

  if (mode === "view" && !(currentUser.firstName)){
    profile = <Profile changeMode = {changeMode} /> 
  } else if (mode === "view" && currentUser.firstName){
    
    navBar = <NavBar user={currentUser} complete={complete}/>;
    statusBoard = <StatusBoard posts={posts}/>
    
  } else if (mode === "login"){
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