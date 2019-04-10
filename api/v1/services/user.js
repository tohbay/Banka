import users from '../db/dummyDb';
// import User from '../models/user';

class UserService {
  static getAll() {
    return users;
    // const validUsers = users.map((user) => {
    // const newUser = new User();
    // newUser.id = user.id;
    // newUser.emial = user.email;
    // newUser.firstName = user.firstName;
    // newUser.lastName = user.lastName;
    // newUser.password = user.password;
    // newUser.type = user.type;
    // newUser.isAdmin = user.isAdmin;

    //   return validUsers;
    // });
  }

  static add(user) {
    const userLength = users.length;
    const lastUserId = users[userLength - 1].id;
    const userId = lastUserId + 1;
    user.id = userId;
    users.push(user);
    return user;
  }

  static getOne(id) {
    const user = users.find(user => user.id === id);
    return user || {};
  }

  static deleteOne(id) {
    const user = users.find(user => user.id === id);

    const index = users.indexOf(user);
    users.splice(index, 1);

    return user || {};
  }
}

export default UserService;
