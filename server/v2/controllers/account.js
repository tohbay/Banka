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
        console.log(error);
        return response.status(500).send({ status: 500, message: 'Error creating account' });
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
