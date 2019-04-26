import jwt from 'jsonwebtoken';
import validate from '../../middleware/validate';
import connectDB from '../../connectDB';

class accountController {
  static create(request, response) {
    const data = jwt.verify(request.token, process.env.jwt_secret);
    const {
      id, firstName, lastName, email
    } = data;

    const { value, error } = validate.createAccount(request.body);
    if (error) {
      return response.status(400).json({ status: 400, error: error.details[0].message });
    }

    const generateNumber = parseFloat(Date.now());
    const numberPrefix = parseFloat('045');
    const generatedAccountNumber = numberPrefix + generateNumber;

    const newAccount = {
      accountNumber: generatedAccountNumber,
      firstName,
      lastName,
      email,
      createdOn: new Date().toLocaleString(),
      owner: data.email,
      type: value.type,
      status: 'draft',
      openingBalance: 0.00
    };

    const query = `INSERT INTO accounts ("accountNumber", "createdOn", "email", "type", "status", "balance")
    VALUES('${newAccount.accountNumber}','${newAccount.createdOn}', '${newAccount.email}', '${newAccount.type}', 'draft', '0.00') returning * `;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount >= 1) {
          return response.status(200).send({ status: 200, message: 'Acccount successfully created', data: result.rows[0] });
        }

        return response.status(500).send({ staus: 500, message: 'Account could not be created' });
      })
      .catch((error) => {
        if (error.detail === `Key (email)=(${newAccount.email}) already exists.`) {
          return response.status(400).send({ status: 'error', message: 'Account already exist' });
        }
        return response.status(500).send({ status: 500, message: 'Error creating account' });
      });
  }

  static getAllAccounts(request, response) {
    const query = 'SELECT * FROM accounts';
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'There are no account records' });
        }
        return response.status(200).send({ status: 200, message: 'Accounts successfully retrieved', data: result.rows });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching all bank accounts' });
      });
  }

  static getOne(request, response) {
    const { accountNumber } = request.params;
    const query = `SELECT * FROM accounts WHERE "accountNumber"='${accountNumber}'`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        return response.status(200).send({ status: 200, message: 'Account successfully retrieved', data: result.rows[0] });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching the specific account' });
      });
  }

  static accountStatusUpdate(request, response) {
    const { accountNumber } = request.params;
    const { status } = request.body;

    const { value, error } = validate.patchAccount(request.body, request.params);
    if (error) {
      return response.status(400).json({ status: 422, error: error.details[0].message });
    }


    const updateOneAccountStatus = `UPDATE accounts
      SET "status"='${status}' WHERE "accountNumber"='${accountNumber}'
      AND (("status"='draft' OR "status"='dormant') OR "status"='active') returning * `;
    return connectDB.query(updateOneAccountStatus)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        return response.status(200).send({ status: 202, message: 'Account successfully updated', data: result.rows[0] });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error updating the account, Please ensure valid input' });
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
            response.status(500).send({ status: 500, error: 'Error deleting the specific account' });
          });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error deleting the specific account' });
      });
  }

  static getAllDormantAccounts(request, response) {
    const query = 'SELECT * FROM accounts WHERE "status"=\'dormant\' ORDER BY "id"';
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'Dormant account(s) does not exist' });
        }
        return response.status(200).send({ status: 200, message: 'Dormant account(s) successfully retrieved', data: result.rows });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching dormant account(s)' });
      });
  }
}

export default accountController;
