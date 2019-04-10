import UserService from '../services/user';
import dummyDb from '../db/dummyDb';

class userController {
  static getAllUsers(request, response) {
    const allUsers = UserService.getAll;
    return response.status(200).send({
      status: 200,
      data: allUsers
    });
  }

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
    if (request.body.email === dummyDb.users.email) {
      return response.status(400).json({
        status: 400,
        error: 'Email already exist',
      });
    }

    const userdata = request.body;
    const signupUser = UserService.add(userdata);
    return response.status(201).send({
      status: 201,
      data: signupUser
    });
  }

  static signin(request, response) {
    const { email, password } = request.body;
    const loginUser = UserService.add(request.body);
    response.status(200).send({
      status: 200,
      data: loginUser
    });
  }

  static getOneUser(resquest, response) {
    const user = UserService.getOne(Number(request.body.id));
    response.status(200).send({
      status: 200,
      data: user
    });
  }

  static deleteUser(resquest, response) {
    const user = UserService.deleteOne(Number(request.body.id));
    response.status(200).send({
      status: 200,
      data: user
    });
  }
}

export default userController;
