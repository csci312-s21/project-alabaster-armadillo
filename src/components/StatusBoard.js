/*
Props: 
  posts (an array of objects of posts that include: 
  user, timestamp, contents)

StatusBoard should return a list of the posts along with information on user (author of the post), time of posting, and posted content.
*/

import Post from "../components/Post";

export default function StatusBoard({posts, currentUser, session}) {
  const postLists = posts.map((post)=> {
    if(post.post){
      return <Post currentUser={currentUser} session = {session} user={post}/>;
    }
  })
  
  return(
    <div>
      {postLists} 
    </div>
  );
}

