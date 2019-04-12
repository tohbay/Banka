import debug from 'debug';
import Account from '../models/account';
import accounts from '../db/accounts';
import users from '../db/users';

class accountController {
  static create(request, response) {
    if (!request.body.type) {
      return response.status(400).json({
        status: 400,
        error: 'Account type name is required'
      });
    }

    const accountData = request.body;

    const newAccount = Account.create(accountData);
    return response.status(201).send({
      status: 201,
      data: newAccount
    });
  }

  static getOne(request, response) {
    const { id, status } = request.params;
    const retrieved = accounts.find(account => account.id === Number(id));
    if (!retrieved) return response.status(404).send({ message: ' Account number not found!' });

    retrieved.status = status;

    return response.status(200).send({
      message: 'Account number sucessfully activated',
      data: retrieved
    });
  }
}

export default accountController;
