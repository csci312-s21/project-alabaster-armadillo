/*
Props: 
  posts (an array of objects of posts that include: 
  user, timestamp, contents)

StatusBoard should return a list of the posts along with information on user (author of the post), time of posting, and posted content.
*/
import PropTypes from "prop-types";
import Post from "../components/Post";

export default function StatusBoard({ searchTerm, posts }) {

  // let postLists = posts.map((post)=>(<Post key={posts.user} post={post}/>));

  // if (searchTerm) {
  //   const term = searchTerm.toLowerCase();
  //   displayedPosts = displayedPosts.filter((post) => {
  //     const user = post.firstName.toLowerCase();
  //     const userPost = post.post.toLowerCase();
  //     return user.includes(term) || userPost.includes(term)
  //   });
  // }
  
  // return(
  //   <div>
  //     <ul> {postLists} </ul>
  //   </div>
  // );

  let postList = posts.map((post)=>(<Post key={posts.user} user={post}/>))

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    posts = posts.filter((post) => {
      const user = post.firstName.toLowerCase();
      const userPost = post.post.toLowerCase();
      console.log(user)
      console.log(userPost)
      return user.includes(term) || userPost.includes(term) 
    });
    postList = posts.map((post)=>(<Post key={posts.user} post={post}/>))
  }

  return(
    <div>
      <ul> {postList} </ul>
    </div>
  );
}

StatusBoard.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  posts: PropTypes.func.isRequired,
};
