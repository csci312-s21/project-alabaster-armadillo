/*
Props: 
  posts (an array of objects of posts that include: 
  user, timestamp, contents)

StatusBoard should return a list of the posts along with information on user (author of the post), time of posting, and posted content.
*/

import Post from "../components/Post";

export default function StatusBoard({ posts }) {
  const postLists = posts.map((post)=>(<Post key={posts.user} post={post}/>));
  
  return(
    <div>
      <ul> {postLists} </ul>
    </div>
  );


}