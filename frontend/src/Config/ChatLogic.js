export const getSender = (currentUser, users) => {
  console.log(users);
  return users[0]._id === currentUser._id ? users[1].name : users[0].name;
};
