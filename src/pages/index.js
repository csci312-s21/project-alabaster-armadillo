import Head from "next/head";
import StatusBoard from "../../src/components/StatusBoard";
import Post from "../../src/components/Post";
import EnterStatus from "../../src/components/EnterStatus";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const date = new Date();
  const currentTime = date.toISOString();

  const [posts, updatePosts] = useState([{user:"James", contents:"This is a post.", timestamp:currentTime.toLocaleString("en-US", {timeZone: "UTC"}), likes:["Kaylen", "Yaqi", "Gretchen"]}]);
  const [mode, setMode] = useState('view');

  let statusBoard;
  let enterStatus;
  let postButton;

  const complete = function com(new_post) {
    if(new_post){
      //Create deep copy of collection
      let copy_posts = JSON.parse(JSON.stringify(posts));
      //Add post to copy of posts data
      copy_posts = [...copy_posts, new_post];
      updatePosts(copy_posts);
      setMode('view');
    }else{
      setMode('view');
    }
  }

  if (mode === 'view'){
    statusBoard = <StatusBoard posts={posts}/>
    postButton = <button onClick={() => setMode('add')} type="button">Post a Status</button>
  }else if (mode === 'add'){
    enterStatus = <EnterStatus user={"User"} complete={complete}/>
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>MiddMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">MiddMap</h1>
        {statusBoard}
        {enterStatus}
        {postButton}
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
