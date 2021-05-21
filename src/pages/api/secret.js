import nc from "next-connect";
import { getSession } from "next-auth/client";

import {
  getUserFromEmail
} from "../../lib/backend-utils";


const handler = nc().get(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({message:`${session.user.email}: Don't Panic!`});
    // const user = await getUserFromEmail(session.user.email);
    // console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).end(`User with email ${session.user.email} not found`);
    }
  } else {
    res.status(401); // not signed in, reject
  }
  res.end();
});

export default handler;
