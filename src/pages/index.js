import Head from "next/head";

import StatusBoard from "../../src/components/StatusBoard";
import EnterStatus from "../../src/components/EnterStatus";
import { useState } from "react";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";



export default function Home() {
  const date = new Date();
  const currentTime = date.toISOString();
  const userArr = [{"email": "seisenberg@middlebury.edu", "password":"password123", "friends":["Hannah", "Brooke"]}, {"email": "hrigdon@middlebury.edu", "password":"coding", "friends":[]}]


  const [posts, updatePosts] = useState([{user:"James", contents:"This is a post.", timestamp:currentTime.toLocaleString("en-US", {timeZone: "UTC"}), likes:["Kaylen", "Yaqi", "Gretchen"]}]);
  const [mode, setMode] = useState("login");
  const [currentUser, setUser] = useState("");
  const [loginStatus, setLoginStatus] = useState(<p id="message" />)

  let statusBoard;
  let enterStatus;
  let login;
  let postButton;

  const complete = function com(new_post) {
    if(new_post){
      //Create deep copy of collection
      let copy_posts = JSON.parse(JSON.stringify(posts));
      //Add post to copy of posts data
      copy_posts = [...copy_posts, new_post];
      updatePosts(copy_posts);
      setMode("view");
    }else{
      setMode("view");
    }
  }
  
  
  const emailValid = (users, input) => {

    let valid = false;
    

    users.forEach((each) => {
      if (each.email === input.email && input.email.substring(input.email.indexOf("@") + 1) === "middlebury.edu") {
        valid = true;
      }
    })

    return valid;

  }

  const passValid = (users, input) => {

    let valid = false;

    users.forEach((each) => {
      if (each.password === input.password) {
        valid = true;
      }
    })

    return valid;

  }

  
  const completeLogin = (input) => {
    if (input) {
      if (emailValid(userArr, input) && passValid(userArr, input)) {
      
        setUser(input);
        setLoginStatus(<p id="message">welcome {currentUser.email}!</p>);
        
      } else {

        const message = <p id="message">password and email do not match!</p>;
        setLoginStatus(message);
        
      }
    }
  }


  if (mode === "view"){
    statusBoard = <StatusBoard posts={posts}/>
    postButton = <button onClick={() => setMode("add")} type="button">Post a Status</button>
  }else if (mode === "add"){
    enterStatus = <EnterStatus user={"User"} complete={complete}/>
  }else if (mode === "login"){
    login = <Login complete={completeLogin}/>
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>MiddMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h1 className="title">The Scoop</h1>
        {statusBoard}
        {enterStatus}
        {postButton}

        {login}
        {loginStatus}

      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
