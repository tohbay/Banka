import AccountModel from '../models/account';
import UserModel from '../models/user';
import accounts from '../../db/accounts';
import users from '../../db/users';

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
    return response.status(201).json({
      status: 201,
      data: newAccount
    });
  }

  static getallAccounts(request, response) {
    const accountRecords = AccountModel.getAll(accounts);
    if (accountRecords.length === 0) return response.status(200).json({ status: 404, message: 'There are no account records' });
    return response.status(200).json({ status: 200, accountRecords });
  }

  static getOne(request, response) {
    const { id } = request.params;
    const retrieved = AccountModel.getOne(Number(id));
    if (!retrieved) return response.status(404).json({ message: ' Account number not found!' });
    console.log(retrieved.openingBalance);
    return response.status(200).json({
      status: 200,
      message: 'Account number sucessfully retrieved',
      data: retrieved
    });
  }

  static patchOne(request, response) {
    const { accountNumber } = request.params;
    const retrieved = AccountModel.getOne(Number(accountNumber));
    if (!retrieved) return response.status(404).json({ status: 404, error: 'Account number not found!' });
    if (!request.body.status) return response.status(400).json({ status: 400, error: 'Status is required' });

    retrieved.status = request.body.status;

    if (retrieved.status === 'active') {
      return response.status(200).json({
        status: 200,
        message: 'Account number sucessfully activated',
        data: {
          accountNumber: retrieved.accountNumber,
          status: retrieved.status
        }
      });
    }

    return response.status(200).json({
      status: 200,
      message: 'Account number sucessfully deactivated',
      data: {
        accountNumber: retrieved.accountNumber,
        status: retrieved.status
      }
    });
  }

  static deleteAccount(request, response) {
    const { accountNumber } = request.params;
    const retrieved = AccountModel.getOne(Number(accountNumber));
    if (!retrieved) return response.status(404).json({ message: 'Account not found!' });

    const deleteRetrieved = AccountModel.deleteOne(Number(accountNumber));

    return response.status(200).json({
      status: 200,
      message: 'Account sucessfully deleted',
      data: deleteRetrieved
    });
  }
}

export default accountController;
