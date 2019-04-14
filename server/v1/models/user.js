import users from '../../db/users';

class UserService {
  static getAll() {
    return users;
  }

  static create(user) {
    const id = users[users.length - 1].id + 1;
    const type = 'client';
    const isAdmin = false;
    const {
      email, firstName, lastName, password
    } = user;

    const newUser = {
      id, ...user, type, isAdmin
    };

    users.push(newUser);
    return newUser;
  }

  static getOne(id) {
    const user = users.find(user => user.id === id);
    return user || {};
  }

  static deleteOne(id) {
    const user = UserService.getOne(id);

    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);

    return user || {};
  }
}

export default UserService;
