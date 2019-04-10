import UserService from '../services/user';

class userController {
  static getAllUsers(request, response) {
    const allUsers = UserService.getAll;
    return response.status(200).send({
      status: 200,
      data: allUsers
    });
  }
}

export default userController;
