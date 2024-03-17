export const getSender = (currentUser, users) => {
  return users[0]._id === currentUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (currentUser, users) => {
  return users[0]._id === currentUser._id ? users[1] : users[0];
};
