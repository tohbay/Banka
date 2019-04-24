import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserService from '../models/user';
import users from '../../db/users';
import validate from '../../middleware/validate';
import helpers from '../../middleware/helpers';
import connectDB from '../../connectDB';

class userController {
  static signup(request, response) {
    if (!request.body.firstName) {
      return response.status(400).json({
        status: 400,
        error: 'First name is required',
      });
    }
    if (!request.body.lastName) {
      return response.status(400).json({
        status: 400,
        error: 'Last name is required',
      });
    }
    if (!request.body.email) {
      return response.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    if (!request.body.password) {
      return response.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }

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

    // const signupData = UserService.create(newUser);
    // return response.status(201).send({
    //   status: 201,
    //   message: 'You have successfully signed up',
    //   data: signupData
    // });

    const query = `INSERT INTO users ("email", "firstName", "lastName", "password", "type", "isAdmin")
    VALUES('${newUser.email}','${newUser.firstName}','${newUser.lastName}','${newUser.password}', 'draft', 'false') returning * `;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount >= 1) {
          return response.status(200).send({ status: 200, message: 'Sign up was successful', data: result.rows[0] });
        }

        return response.status(500).send({ staus: 500, message: 'The user could not be saved' });
      })
      .catch((error) => {
        if (error.detail === `Key (email)=(${newUser.email}) already exists.`) {
          return response.status(400).send({ status: 'error', message: 'Account already exist' });
        }
        console.log(error);
        return response.status(500).send({ status: 500, message: 'Error creating account' });
      });
  }

  static signin(request, response) {
    if (!request.body.email) {
      return response.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    if (!request.body.password) {
      return response.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }

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
      message: 'You have successfully logged in',
      data: userData,
      token
    });
  }
}

export default userController;
