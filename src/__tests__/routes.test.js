import path from "path";
import request from "supertest";
import {
  startApp,
  stopApp,
  nextBuild,
  nextServer,
} from "../test-utils/next-test-utils";

import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  addUser,
} from "../lib/backend-utils";

jest.setTimeout(1000 * 20);

describe("The Scoop API", () => {
  let server;
  let users;
  let sampleUser;

  beforeAll(async () => {
    const appDir = path.join(__dirname, "../../");
    await nextBuild(appDir);

    const app = nextServer({
      dir: appDir,
      dev: false,
      quiet: true,
    });

    server = await startApp(app);
  });

  beforeEach(async () => {

    users = getUsers();
    sampleUser = users[Math.floor(users.length / 2)];
  });

  /**
  * Shut down the server
  */
  afterAll(async () => {
    await stopApp(server)
  });

  // The SuperTest request().method() chain returns a Promise. If the body of
  // a Jest test returns a Promise, the test will fail if the Promise rejects.
  // Thus we make sure to return the chain in each test.

  test.only("GET /api/posts should return all posts (mostly Jest)", async () => {
    // Here we use the built-in Jest matchers, like we used with React, et al.

    const response = await request(server)
      .get("/api/posts");

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );

    expect(response.body).toEqual(users);
  });

  // SuperTest has several helpful methods for conveniently testing responses
  // that we can use to make the tests more concise
  // jest supports an optional argument to the test function that is a function to 
  // be called when the test is complete (to cope with asynchronous code)
  // supertest allows us to pass it in to the last expect to stop the test
  test("GET /api/posts should return all posts (mostly SuperTest)", (done) => {

    request(server)
      .get("/api/posts")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(users, done);
  });

  test("PUT /api/posts/:id should update the user (mostly SuperTest)", async () => {

    const newUser = { ...sampleUser, firstName: "Jenny" };
    await request(server)
      .put(`/api/posts/${newUser.id}`)
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(newUser);

    const updatedUsers = getUsers();
    const testUser = updatedUsers.find((u) => u.id === newUser.id);
    expect(testUser).toEqual(newUser);
  });

  test("GET /api/posts/:id should return single user", (done) => {
    const id = 4;
    const user = users.find(u => u.id === id);
     request(server)
      .get("/api/posts/:id")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(post, done);

  });

});