import Account from '../models/account';
import accounts from '../db/accounts';

class accountController {
  static create(request, response) {
    if (!request.body.type) {
      return response.status(400).json({
        status: 400,
        error: 'Account type name is required',
      });
    }

    const { type } = request.body;
    const userExist = users.find(user => user.id === id);
    if (userExist) {
      return response.status(400).json({
        status: 400,
        error: 'Email already exist',
      });
    }

    const accountData = request.body;
    const newAccount = accounts.create(accountData);
    return response.status(201).send({
      status: 201,
      data: newAccount
    });
  }
}

export default accountController;
