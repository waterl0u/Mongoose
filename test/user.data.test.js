import "./testDb.js";

import {
  createUser,
  findUserById,
  findUserByUsername,
} from "../user/userData.js";

describe("user data layer", () => {
  it("should create a user with a username", async () => {
    const user = await createUser("tonye", "Tony Enerson", "InceptionU");
    expect(user).toBeDefined();
    expect(user.username).toEqual("tonye");
    expect(user.fullName).toEqual("Tony Enerson");
    expect(user.companyName).toEqual("InceptionU");
  });

  it("should find a user by username", async () => {
    await createUser("tonye", "Tony Enerson", "InceptionU");
    const user = await findUserByUsername("tonye");
    expect(user.username).toEqual("tonye");
    expect(user.fullName).toEqual("Tony Enerson");
    expect(user.companyName).toEqual("InceptionU");
  });

  it("should find a user by id", async () => {
    const createdUser = await createUser("tonye", "Tony Enerson", "InceptionU");
    const user = await findUserById(createdUser._id);
    expect(user.username).toEqual("tonye");
    expect(user.fullName).toEqual("Tony Enerson");
    expect(user.companyName).toEqual("InceptionU");
  });

  it("should require a username that is not an empty string", async () => {
    await expect(
      createUser(null, "Tony Enerson", "InceptionU")
    ).rejects.toThrow(
      "user validation failed: username: Path `username` is required."
    );
  });

  it("should require a full name", async () => {
    //execute
    try {
      await createUser("tonye", "", "InceptionU");
      fail("should have failed to create a duplicate username");
    } catch (err) {
      // happy case!
    }
  });

  it("should not require a company name", async () => {
    const user = await createUser("tonye", "Tony Enerson", null);
    expect(user.companyName).toEqual(null);
  });

  it("should not create a user with a duplicate username", async () => {
    await createUser("tonye", "Tony Enerson", "InceptionU");
    try {
      await createUser("tonye", "Tony Eggbert", "Cupcakes4Fun");
      fail("Taken. Like Liam Neeson's daughter.");
    } catch (err) {
      // happy case!
    }
  });
});
