const { createUser } = require("./userModel");

const createNewUser = async () => {
  const newUser = {
    username: "Superman",
    password: "password1",
    superheroId: "6266c66c5614fd6f22910cf2",
  };
  const newAgent = {
    username: "agent1",
    password: "password1",
    isAgent: true,
  };

  const createdUser = await createUser(newUser);
  const createdAgent = await createUser(newAgent);
  console.log(
    `We created a new user: ${newUser.username} with an _id of ${createdUser._id}`,
    `We created a new user: ${createdAgent.username} with an _id of ${createdAgent._id}`
  );
};

createNewUser();
