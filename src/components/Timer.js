/*
import React, { useState, useEffect } from "react";

export default function Timer({user}) {
  const [seconds, setSeconds] = useState(0);
  let decider = false;

  useEffect(async() => {

     const newUser = {...user, postTime: seconds}

    await fetch(
    `/api/posts/${user.user_id}`,
    {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: new Headers({ "Content-type": "application/json" })
    });
  
  }, [seconds]);

  useEffect(() => {

    let interval = null;

    if (!decider) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (decider) {
      clearInterval(interval);
      setSeconds(0);
      decider = false;
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="app">
      <div className="time">
        {seconds}s
      </div>
    </div>
  );
}
*/