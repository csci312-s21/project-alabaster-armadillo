/*

  backend-utils.js

  This is a collection of utility functions to be called on the server backend. These functions
  interact directly with the database.

  available functions:

  getUsers - reads all of the users out of the DB and returns them
  getUser(id) - get the user with the specified id
  deleteUser(id) - delete the article associated with the given id
  updateUser(user) - update the data store with changes in `users`
  addUser(user) - add the new `user` to the data store
*/

import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);


/**
 * Find all users 
 *
 * @returns list of users
 */
export async function getUsers() {
  const rows = await knex("users").select();
  return rows;
}

/**
 * Find the user with the specified id
 * 
 * @param {number} id 
 * @returns a user object, or null if the user can't be found
 */
export async function getUser(id) {
  const [rows] = await knex("users").select().where({id:id});
  return rows || null;
}


/**
 * Remove the user associated with the provided id from the data storage
 *
 * @param {number} id
 * @returns a Boolean indicating success
 */
export async function deleteUser(id) {
  const rows = await knex("users").del().where({id:id});
  return (rows === 1);
}

/**
 * Update the data store with the provided user object
 *
 * @param {object} user
 * @returns a Boolean indicating success
 */
export async function updateUser(user) {
  if (user.id > 0) {
    const rows = await knex("users").update(user).where({id:user.id});
    if (rows !== -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return 0;
  }
}

/**
 * Add a new user to the data store
 *
 * @param {number} article
 * @returns the user with a new id attached
 */
export async function addUser(user) {
  const id = await knex("users").insert({
    name: user.name, 
    email: user.email ? user.email : "", 
    image: user.image}, 
    ["id"]
  );

  const newUser = await knex("users").select().where({id:id[0]});

  return newUser[0];
}

/**
 * Get a list of the sections 
 * 
 * @returns an Array of the sections
 */

/**
 * Fetch the ids and titles for articles in a particular section
 * 
 * @param {string} section 
 * @returns an array of objects with title and article id
 */