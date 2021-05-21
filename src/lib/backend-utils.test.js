// import fetchMock from "fetch-mock-jest";
// import { act } from "react-dom/test-utils";
/*import { render } from "@testing-library/react";

describe("smoke test", () => {
  test("Smoke test", async () => {
    render(<h2> hey </h2>);
    // await act(async () => {
    //   await fetchMock.flush(true);
    // });
  });
});*/


import sampleUsers from "../../data/test-data.json";


import {
  knex,
  getUsers,
  getUser,
  //deleteUser,
  //updateUser,
  addUser,
} from "./backend-utils";


describe.only("Tests of the database utility functions", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe("get users", () => {
    test("getUsers gets all users", async () => {
      const users = await getUsers();

      sampleUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
      users.sort((a, b) => a.lastName.localeCompare(b.lastName));
      expect(users).toEqual(sampleUsers);
    });

    test("getUser gets a single user", async () => {
      const sampleUser = sampleUsers[Math.floor(sampleUsers.length / 2)];
      const user = await getUser(sampleUser.user_id);
      expect(user).toEqual(sampleUser);
    });

    test("getUser returns null if no user matching the id is found", async () => {
      const result = await getUser(-1);
      expect(result).toBeNull();
    });
  });

  describe("add users", () => {
    test("addUser returns a user with new id", async () => {
      const sample = {
        "firstName": "Yaqi",
        "lastName": "Huang",
        "post": "Mark your calendars for Mischords May 20!",
        "postTime": "59",
        "postLikes" : "",
        "postReports": "",
        "image": "image"
      };
      const user = await addUser(sample);
      expect(user.firstName).toBe(sample.firstName);
      expect(user.lastName).toBe(sample.lastName);
      expect(user.post).toBe(sample.post);
      expect(user.postTime).toBe(sample.postTime);
      expect(user.postLikes).toBe(sample.postLikes);
      expect(user.postReports).toBe(sample.postReports);
      expect(user.user_id).toBeGreaterThanOrEqual(0);
    });
  /*
    test("addUser should reject user with no title", async () => {
      expect.assertions(1);
      const sample = {
        contents: "new body",
        edited: "2020-08-10T18:00:40Z",
      };
      try {
        await addArticle(sample);
      } catch (e) {
        expect(e.toString()).toContain("Error");
      }
    });
    test("addArticle should reject article with duplicate title", async () => {
      expect.assertions(1);
      const sample = {
        title: sampleArticles[0].title,
        contents: "new body",
        edited: "2020-08-10T18:00:40Z",
      };
      try {
        await addArticle(sample);
      } catch (e) {
        expect(e.toString()).toContain("Error");
      }
    });
    test("addArticle should reject article with no date", async () => {
      expect.assertions(1);
      const sample = {
        title: "New title",
        contents: "new body",
      };
      try {
        await addArticle(sample);
      } catch (e) {
        expect(e.toString()).toContain("Error");
      }
    });
    test("addArticle should create a default contents", async () => {
      const sample = {
        title: "New title",
        edited: "2020-08-10T18:00:40Z",
      };
      const article = await addArticle(sample);
      expect(article.title).toBe(sample.title);
      expect(article.contents).toBe("");
      expect(article.edited).toBe(sample.edited);
    });*/

  });

});