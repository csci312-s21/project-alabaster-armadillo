/*
This component shows the interface where a user can enter a post. They will be able to type in a status and then choose to 'post' or to 'cancel'

The interface has two buttons. If "Cancel" is clicked, the `complete` callback is called with no arguments. If the "Post" button is clicked, the `complete` callback is called with a new post object with `user`, `contents`, and `timestamp`.

Props:
 complete - function to call on post completion (required)
 user - the username of the user who is posting 

*/

import PropTypes from "prop-types";
import { useState } from "react";
import Button from "@material-ui/core/Button";


export default function EnterStatus({ user, complete }) {
  const [contents, setContents] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = function addtag(tag, bool) {
  
    if (bool){
      let repeat = false;
      tags.forEach((oldTag)=>{if (oldTag.value === tag.value)repeat=true})

      if (!repeat) {
        const newTags = [...tags];
        newTags.push(tag);
        setTags(newTags)
      }
      
    }else{
      const newTags = tags.filter((atag)=>{
        return atag !== tag;
      });
      
      setTags(newTags);
    }
  }

  const selectedTags = tags.map((tag)=>{
    return <Button key={tag.value} variant="contained" type="button" name={tag.value} onClick={() =>addTag(tag, false)}>{tag.name}</Button>});



  

  //Post button
  const postButton = () => {
    const date = new Date();
    const currentTime = date.toLocaleString("en-US", {timeZone: "UTC"});

    const new_post = {
        key: user,
        user: user,
        contents: contents,
        timestamp: currentTime,
        tags: tags
      };
      
    complete(new_post);
  };

  return (
      <div>
        <p
            value={user}         
          />
        <form>
          <div>
          <textarea
          rows="10"
          cols="50"
          id="contents"
            value= {contents}
            placeholder="Enter your status here!"
            onChange={(evt) => setContents(evt.target.value)}/>
          </div>
          {selectedTags}
          <div>
            <select name="placetags" id="placetags">
              <option value="title"> Locations</option>
              <option value="proc" onClick={() => addTag({value:"proc", name:"Proc"}, true)}>Proc</option>
              <option value="ross" onClick={() => addTag({value:"ross", name:"Ross"}, true)}>Ross</option>
              <option value="atwater" onClick={() => addTag({value:"atwater", name:"Atwater"}, true)}>Atwater</option>
            </select>
            <select name="activitytags" id="activitytags">
              <option value="title"> Activities</option>
              <option value="meal" onClick={() => addTag({value:"meal", name:"Grab a Meal"}, true)}>Grab a Meal</option>
              <option value="study" onClick={() => addTag({value:"study", name:"Study Time"}, true)}>Study Time</option>
            </select>
          </div>
          <div>
            <button onClick={() => postButton()} type="button" disabled={(contents==="")} >Post</button>
            <button onClick={() => complete()} type="button">Cancel</button>
          </div>
        </form>
      </div>
    );
}

EnterStatus.propTypes = {
  complete: PropTypes.func,
  userid: PropTypes.string
};