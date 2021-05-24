/*
Props: 
  posts (an array of objects of posts that include: 
  user, timestamp, contents)

StatusBoard should return a list of the posts along with information on user (author of the post), time of posting, and posted content.
*/

import Post from "../components/Post";

export default function StatusBoard({posts, currentPost }) {
  let postLists;
  
  if (posts) {
    postLists = posts.map((post)=> {
      if(post.post){
        return <Post user={post} currentPost= {currentPost}/>;
      }
    })
  }
  
  
  return(
    <div>
      {postLists} 
    </div>
  );
}

