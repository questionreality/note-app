const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);
afterEach(() => {
  // console.log("after each");
});

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Vivek",
      email: "vivek@test.com",
      password: "123456788",
    })
    .expect(201);
  //Ideas
  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Vivek",
      email: "vivek@test.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toEqual("MyPass777!");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: "vivekvarma15516@gmail.com",
      password: "wutwut4343",
    })
    .expect(200);
  const user = await User.findById(response.body.user._id);
  expect(response.body.token).toEqual(user.tokens[1].token); //this is the second token as the first token was created when the user was created
});

test("Should not login existing user", async () => {
  await request(app).post("/users/login").send({}).expect(400);
});
test("Should not get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(response._id);
  expect(user).toBeNull();
});

test("Should not delete account for user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/marijuana.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
  //toBe uses the triple equality operator
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Vivek",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Vivek");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      height: "54",
    })
    .expect(400);
});
