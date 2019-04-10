import dummyDb from '../db/dummyDb';
import User from '../models/user';

const UserService = {
  getAll() {
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

  add(user) {
    const userLength = dummyDb.users.length;
    const lastUserId = dummyDb.users[userLength - 1].id;
    const userId = lastUserId + 1;
    user.id = userId;
    dummyDb.users.push(user);
    return user;
  },

  getOne(id) {
    const user = dummyDb.users.find(user => user.id === id);
    return user || {};
  },

  deleteOne(id) {
    const user = dummyDb.users.find(user => user.id === id);

    const index = dummyDb.users.indexOf(user);
    dummyDb.users.splice(index, 1);

    return user || {};
  }
};

export default UserService;
