import nc from "next-connect";
import { getUsers, addUser } from "../../../lib/backend-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
  .get(async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
  })
  .post(async (req, res) => {
    const newUser = req.body;
    const user = await addUser(newUser);
    res.status(200).json(user);
  });

export default handler;
