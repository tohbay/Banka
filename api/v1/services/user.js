import dummyDb from '../db/dummyDb';
import User from '../models/user';

const UserService = {
  getAllUsers() {
    const validUsers = dummyDb.users.map((user) => {
      const newUser = new User();
      newUser.id = user.id;
      newUser.emial = user.email;
      newUser.firstName = user.firstName;
      newUser.lastName = user.lastName;
      newUser.password = user.password;
      newUser.type = user.type;
      newUser.isAdmin = user.isAdmin;

      return validUsers;
    });
  },

  createUser(user) {
    const userLength = dummyDb.users.length;
    const lastUserId = dummyDb.users[userLength - 1].id;
    const userId = lastUserId + 1;
    user.id = userId;
    dummyDb.users.push(user);
    return user;
  }
};
