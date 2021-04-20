

import Head from "next/head";

import Login from "../components/Login";

import styles from "../styles/Home.module.css";

import { useState } from "react";


export default function Home() {

  const [currentUser, setUser] = useState("");
  //const [currentInterface, setInterface] = useState("");
  const [loginStatus, setLoginStatus] = useState(<p id="message" />)

  const userArr = [{"email": "seisenberg@middlebury.edu", "password":"password123", "friends":["Hannah", "Brooke"]}, {"email": "hrigdon@middlebury.edu", "password":"coding", "friends":[]}]



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

  const complete = (input) => {
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Final Project</h1>
        <Login complete={complete}/>
        {loginStatus}
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
