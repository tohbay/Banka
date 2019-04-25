import validate from '../../middleware/validate';
import connectDB from '../../connectDB';

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

  static accountStatusUpdate(request, response) {
    const { accountNumber } = request.params;
    const { status } = request.body;

    const { value, error } = validate.patchAccount(request.body, request.params);
    if (error) {
      return response.status(400).json({ status: 422, error: error.details[0].message });
    }

    const findSpecificAccount = `SELECT * FROM accounts WHERE "accountNumber"='${(accountNumber)}'`;
    return connectDB.query(findSpecificAccount)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        const updateOneAccount = `UPDATE accounts
          SET "status"='${status}' WHERE "accountNumber"='${accountNumber}' AND (("status"='draft' OR "status"='dormant') OR "status"='active')`;
        return connectDB.query(updateOneAccount)
          .then(() => response.status(200).send({ status: 200, message: 'Account successfully updated', data: result.rows[0] }))
          .catch((error) => {
            response.status(500).send({ status: 500, error: 'Error updating the specific account' });
          });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error updating the account, Please ensure valid input' });
      });
  }

  static deleteAccount(request, response) {
    const { accountNumber } = request.params;
    const retrieved = AccountService.getOne(Number(accountNumber));
    if (!retrieved) {
      return response.status(404).json({
        status: 404,
        error: 'Account not found!'
      });
    }

    const deleteRetrieved = AccountService.deleteOne(Number(accountNumber));

    return response.status(200).json({
      status: 200,
      data: deleteRetrieved
    });
  }
}

export default accountController;
