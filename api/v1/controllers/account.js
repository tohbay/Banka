import debug from 'debug';
import AccountModel from '../models/account';
import UserModel from '../models/user';
import accounts from '../db/accounts';
import users from '../db/users';

class accountController {
  static create(request, response) {
    if (!request.body.type) {
      return response.status(400).json({
        status: 400,
        error: 'Account type is required'
      });
    }

    const account = accounts[accounts.length - 1].id;
    console.log(accounts[accounts.length - 1].id, accounts.length, users.length);
    if (account === users.length) {
      return response.status(400).json({
        status: 400,
        error: 'Account already exist'
      });
    }


    const type = request.body;

    const newAccount = AccountModel.create(type);
    console.log(newAccount);
    return response.status(201).send({
      status: 201,
      data: newAccount
    });
  }

  static getallAccounts(request, response) {
    return response.status(200).send(accounts);
  }

  static getOne(request, response) {
    const { id } = request.params;
    const retrieved = AccountModel.getOne(Number(id));
    if (!retrieved) return response.status(404).send({ message: ' Account number not found!' });

    return response.status(200).send({
      message: 'Account number sucessfully activated',
      data: retrieved
    });
  }

  static patchOne(request, response) {
    const { accountNumber } = request.params;
    const retrieved = AccountModel.getOne(Number(accountNumber));
    if (!retrieved) return response.status(404).send({ error: 'Account number not found!' });
    if (!request.body.status) return response.status(400).send({ error: 'Status is required' });

    retrieved.status = request.body.status;

    if (retrieved.status === 'active') {
      return response.status(200).send({
        message: 'Account number sucessfully activated',
        data: retrieved
      });
    }

    return response.status(200).send({
      message: 'Account number sucessfully deactivated',
      data: retrieved
    });
  }
}

export default accountController;
