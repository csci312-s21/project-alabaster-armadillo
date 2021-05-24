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
  const [currentPost, setPost] = useState("")

  let statusBoard;
  let log;
  let navBar;
  let logo;
  let profile;

  useEffect(() => {
    const getData = async () => {
      if (session) {

        try {
          const response = await fetch(`/api/posts/${session.user.id}`);
          const user = await response.json();
          setUser(user);
          setPost(user.post);
        } catch (error) {
          console.log(error);
        }

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
  }, [posts]);

  const changeMode = async (newUser) => {

    const response = await fetch(`/api/posts/${session.user.id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const user = await response.json();

    setUser(user);
    setPost(user.post);

    if (newUser) {
      setMode("view");
    }
  }

  const complete = async (newPost) => {

    if (newPost) {

      await fetch(
        `/api/posts/${session.user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(newPost),
          headers: new Headers({ "Content-type": "application/json" })
        });

      setMode("view");
      setPost(newPost);

    } else {
      setMode("view");
    }
  }


    useEffect(() => {
      try {
        const timer = setTimeout(async() => {
         const deletedPost = {... currentUser, post: "", postTime: 0, postLikes: "", postReports: ""}

          await fetch(
          `/api/posts/${currentUser.user_id}`,
          {
            method: "PUT",
            body: JSON.stringify(deletedPost),
            headers: new Headers({ "Content-type": "application/json" })
          });
        }, 3600000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.log(error);
      }

    }, [currentPost]);


  if (mode === "view" && !(currentUser.firstName)){
    profile = <Profile changeMode = {changeMode} />
  } else if (mode === "view" && currentUser.firstName){

    navBar = <NavBar user={currentUser} complete={complete}/>;
    statusBoard = <StatusBoard session={session} currentUser={currentUser} posts={posts}/>

  } else if (mode === "login"){
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
        {profile}
        {log}
        {statusBoard}
      </main>
      <footer>A CS 312 Project </footer>
    </div>
  );

}
