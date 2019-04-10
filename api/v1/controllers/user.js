import UserService from '../services/user';

class userController {
  static getAllUsers(request, response) {
    const allUsers = UserService.getAll;
    return response.status(200).send({
      status: 200,
      data: allUsers
    });
  }

  static signup(request, response) {
    const userdata = req.body;
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
}

export default userController;
