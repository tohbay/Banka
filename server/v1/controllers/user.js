// import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserService from '../models/user';
import users from '../../db/users';
import validate from '../../middleware/validate';
import helpers from '../../middleware/helpers';

class userController {
  static signup(request, response) {
    const { value, error } = validate.signup(request.body);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }

    if (value.password !== value.confirmPassword) {
      return response.status(400).json({
        status: 400,
        error: 'Passwords do not match'
      });
    }

    const user = users.find(user => user.email === value.email);
    if (user) {
      return response.status(409).json({
        status: 409,
        error: 'User already exist',
      });
    }

    const hashedPassword = helpers.encryptPassword(value.password);

    value.password = hashedPassword;
    const newUser = {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      password: hashedPassword
    };
    const signupData = UserService.create(newUser);
    return response.status(201).send({
      status: 201,
      data: signupData
    });
  }

  static signin(request, response) {
    const { value, error } = validate.signin(request.body);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    const userData = {
      email: request.body.email,
      password: request.body.password
    };
    const user = users.find(user => user.email === value.email);

    if (!user) {
      return response.status(401).json({
        status: 401,
        error: 'Login failed',
      });
    }
    const authenticated = helpers.comparePassword(value.password, user.password);
    console.log(value.password, user.password);
    if (!authenticated) {
      return response.status(401).json({
        status: 401,
        error: 'Login failed'
      });
    }

    const token = helpers.issueToken(userData);
    return response.status(200).json({
      status: 200,
      data: userData,
      token
    });
  }
}

export default userController;
