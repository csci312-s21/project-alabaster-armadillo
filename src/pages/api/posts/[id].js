import nc from "next-connect";

import {
  deleteUser,
  updateUser,
  getUser
} from "../../../lib/backend-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
  .get(async (req, res) => {
    const { id } = req.query;

    const user = await getUser(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).end(`User with id ${id} not found`);
    }
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const newUser = req.body;
    const success = await updateUser(newUser);

    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end(`User with id ${id} not found`);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const success = await deleteUser(id);
    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end(`User with id ${id} not found`);
    }
  });

export default handler;
