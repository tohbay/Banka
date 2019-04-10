import UserService from '../services/user';
import users from '../db/dummyDb';

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

    const { email } = request.body;
    const checkEmail = users.find(aUser => aUser.email === email);
    if (checkEmail) {
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
}

export default userController;
