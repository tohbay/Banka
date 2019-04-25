import AccountService from '../models/account';
import accounts from '../../db/accounts';
import validate from '../../middleware/validate';

class accountController {
  static create(request, response) {
    const { value, error } = validate.createAccount(request.body);
    if (error) {
      return response.status(400).json(error.details[0].message);
    }

    const newAccount = {
      type: value.type
    };

    const create = AccountService.create(newAccount);
    return response.status(201).json({
      status: 201,
      data: create
    });
  }

  static getallAccounts(request, response) {
    const accountRecords = AccountService.getAll(accounts);
    if (accountRecords.length === 0) {
      return response.status(404).json({
        status: 404,
        error: 'There are no account records'
      });
    }
    return response.status(200).json({
      status: 200,
      data: accountRecords
    });
  }

  static getOne(request, response) {
    const { id } = request.params;
    const retrieved = AccountService.getOne(Number(id));
    if (!retrieved) {
      return response.status(404).json({
        status: 404,
        error: 'Account number not found!'
      });
    }
    return response.status(200).json({
      status: 200,
      data: retrieved
    });
  }

  static patchOne(request, response) {
    const { value, error } = validate.patchAccount(request.body);
    if (error) {
      return response.status(400).json(error.details[0].message);
    }
    const { accountNumber } = request.params;
    const retrieved = AccountService.getOne(Number(accountNumber));
    if (!retrieved) {
      return response.status(404).json({
        status: 404,
        error: 'Account number not found!'
      });
    }


    retrieved.status = request.body.status;

    if (retrieved.status === 'active') {
      return response.status(200).json({
        status: 200,
        data: {
          accountNumber: retrieved.accountNumber,
          status: retrieved.status
        }
      });
    }

    return response.status(200).json({
      status: 200,
      data: {
        accountNumber: retrieved.accountNumber,
        status: retrieved.status
      }
    });
  }

  static deleteAccount(request, response) {
    const { accountNumber } = request.params;
    const query = `SELECT * FROM accounts WHERE "accountNumber"=${accountNumber}`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        const deleteQuery = `DELETE FROM accounts WHERE "accountNumber"=${result.rows[0].accountNumber}`;
        return connectDB.query(deleteQuery)
          .then(() => response.status(204).send({ status: 204, message: 'Account successfully deleted', data: result.rows[0] }))
          .catch((error) => {
            console.log(error);
            response.status(500).send({ status: 500, error: 'Error deleting the specific account' });
          });
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send({ status: 500, error: 'Error deleting the specific account' });
      });
  }
}

export default accountController;
