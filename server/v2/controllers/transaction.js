import jwt from 'jsonwebtoken';
import validate from '../../middleware/validate';
import connectDB from '../../connectDB';
import helpers from '../../middleware/helpers';

class TransactionController {
  static fetchAll(request, response) {
    const user = {
      email: request.body.email,
      password: request.body.password
    };

    const token = helpers.issueToken(user);

    const query = 'SELECT * FROM transactions';
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'There are no transactions records' });
        }
        return response.status(200).send({ status: 200, message: 'Transactions successfully retrieved', data: result.rows });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching all transactions, ensure you provide valid credentials' });
      });
  }

  static fetchSpecificTransaction(request, response) {
    const { id } = request.params;
    const query = `SELECT * FROM transactions WHERE "transactionId"=${id}`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(400).send({ status: 400, error: 'Transaction does not exist' });
        }
        return response.status(200).send({ status: 200, message: 'Transaction successfully retrieved', data: result.rows[0] });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching the specific transaction, ensure you provide valid credentials' });
      });
  }

  static creditAccount(request, response) {
    const { accountNumber } = request.params;
    const { amount, cashier } = request.body;

    const data = jwt.verify(request.token, process.env.jwt_secret);
    const { id } = data;

    const { value, error } = validate.creditAccount(request.body);
    if (error) {
      return response.status(400).json({ status: 400, error: error.details[0].message });
    }

    const findSpecificAccount = `SELECT * FROM accounts WHERE "accountNumber"='${(accountNumber)}'`;
    return connectDB.query(findSpecificAccount)
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        const { accountNumber, balance, status } = result.rows[0];
        const newBalance = parseFloat(balance) + parseFloat(amount);

        if (status === 'draft' || status === 'dormant') {
          return response.status(400).send({ status: 400, error: 'Account account is not active' });
        }

        const creditDetails = {
          createdOn: new Date().toLocaleString(),
          type: 'credit',
          accountNumber,
          cashier,
          amount,
          oldBalance: balance,
          balance: newBalance
        };

        const creditQuery = `INSERT INTO transactions ("createdOn", "type", "accountNumber", "cashier",  "amount",
          "oldBalance", "newBalance") VALUES('${creditDetails.createdOn}', '${creditDetails.type}', '${creditDetails.accountNumber}',
          '${creditDetails.cashier}', '${creditDetails.amount}', '${balance}', '${newBalance}') returning *`;

        const updateCreditedAccount = `UPDATE accounts SET "balance"='${newBalance}' WHERE "accountNumber"='${accountNumber}' returning *`;
        return connectDB.query(updateCreditedAccount)
          .then(result => connectDB.query(creditQuery)
            .then((result) => {
              if (result.rowCount >= 1) {
                return response.status(200).send({ status: 202, message: 'Acccount successfully credited', data: result.rows[0] });
              }
              return response.status(500).send({ staus: 500, message: 'Error crediting the specific account, ensure you provide valid credentials' });
            }))
          .catch((error) => {
            response.status(500).send({ status: 500, error: 'Error crediting the account, ensure you provide valid credentials' });
          });
      });
  }

  static debitAccount(request, response) {
    const { accountNumber } = request.params;
    const { amount, cashier } = request.body;

    const data = jwt.verify(request.token, process.env.jwt_secret);
    const { id } = data;

    const { value, error } = validate.debitAccount(request.body);
    if (error) {
      return response.status(400).json({ status: 400, error: error.details[0].message });
    }

    const findSpecificAccount = `SELECT * FROM accounts WHERE "accountNumber"='${(accountNumber)}'`;
    return connectDB.query(findSpecificAccount)
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        const { accountNumber, balance, status } = result.rows[0];
        const newBalance = parseFloat(balance) - parseFloat(amount);

        if (status === 'draft' || status === 'dormant') {
          return response.status(400).send({ status: 400, error: 'Account account is not active' });
        }

        if (balance < amount) {
          return response.status(400).send({ status: 400, error: 'Insufficient fund' });
        }

        const debitDetails = {
          createdOn: new Date().toLocaleString(),
          type: 'debit',
          accountNumber,
          cashier,
          amount,
          oldBalance: balance,
          balance: newBalance
        };

        const debitQuery = `INSERT INTO transactions ("createdOn", "type", "accountNumber", "cashier", "amount", 
          "oldBalance", "newBalance") VALUES('${debitDetails.createdOn}', '${debitDetails.type}', '${debitDetails.accountNumber}', 
          '${debitDetails.cashier}', '${debitDetails.amount}', '${balance}', '${newBalance}') returning *`;

        const updateDebitedAccount = `UPDATE accounts SET "balance"='${newBalance}' WHERE "accountNumber"='${accountNumber}' returning *`;
        return connectDB.query(updateDebitedAccount)
          .then(result => connectDB.query(debitQuery)
            .then((result) => {
              if (result.rowCount >= 1) {
                return response.status(200).send({ status: 202, message: 'Acccount successfully debited', data: result.rows[0] });
              }
              return response.status(500).send({ staus: 500, message: 'Error debiting the specific account' });
            }))
          .catch((error) => {
            response.status(500).send({ status: 500, error: 'Error debiting the account, ensure you provide valid credentials' });
          });
      });
  }

  static getSpecificAccountTransactions(request, response) {
    const { accountNumber } = request.params;
    const query = `SELECT * FROM transactions WHERE "accountNumber"='${(accountNumber)}'`;
    return connectDB.query(query)
      .then((result) => {
        console.log(result);
        if (result.rowCount === 0) {
          return response.status(400).send({
            status: 400,
            error: 'Account transactions does not exist'
          });
        }
        return response.status(200).send({
          status: 200,
          message: 'User transactions successfully retrieved',
          data: result.rows
        });
      })
      .catch((error) => {
        response.status(500).send({
          status: 500,
          error: 'Error fetching user transactions, ensure you provide valid credentials'
        });
      });
  }
}

export default TransactionController;
