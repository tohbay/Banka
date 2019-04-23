import bcrypt from 'bcryptjs';
import users from '../../db/users';

class UserService {
  static getAll() {
    return users;
  }

  static create(user) {
    const newUser = {
      id: users.length + 1,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      confirmPassword: user.confirmPassword,
      type: 'client',
      isAdmin: false,
    };
    users.push(newUser);
    return newUser;
  }

  static getOne(id) {
    const user = users.find(user => user.id === id);
    return user;
  }

  static deleteOne(id) {
    const user = UserService.getOne(id);

    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);

    return user;
  }
}

export default UserService;
