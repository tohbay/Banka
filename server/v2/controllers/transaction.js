import transactions from '../../db/transactions';
import TransactionService from '../models/transaction';
import AccountService from '../models/account';
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
        return response.status(200).send({ message: 'Transactions successfully retrieved', data: result.rows });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching all transactions' });
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
        return response.status(200).send({ message: 'Transaction successfully retrieved', data: result.rows[0] });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching the specific transaction' });
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

        const creditQuery = `INSERT INTO transactions ("createdOn", "type", "accountNumber", "cashier",  "amount", "oldBalance", "newBalance")
      VALUES('${creditDetails.createdOn}', '${creditDetails.type}', '${creditDetails.accountNumber}', '${creditDetails.cashier}', '${creditDetails.amount}', '${balance}', '${newBalance}') returning *`;
        const updateCreditedAccount = `UPDATE accounts SET "balance"='${newBalance}' WHERE "accountNumber"='${accountNumber}' returning *`;
        return connectDB.query(updateCreditedAccount)
          .then((result) => {
            console.log(result);
            return connectDB.query(creditQuery)
              .then((result) => {
                if (result.rowCount >= 1) {
                  console.log(result);
                  return response.status(200).send({ status: 200, message: 'Acccount successfully credited', data: result.rows[0] });
                }
                return response.status(500).send({ staus: 500, message: 'Error crediting the specific account' });
              });
          })
          .catch((error) => {
            console.log(error);
            response.status(500).send({ status: 500, error: 'Error crediting the account, Please ensure valid input' });
          });
      });
  }

  static debitAccount(request, response) {
    const { accountNumber } = request.params;

    const { value, error } = validate.debitAccount(request.body);
    if (error) {
      return response.status(400).json(error);
    }

    const { amount, cashier } = request.body;
    const retrievedAccountRecord = AccountService.getOne(Number(accountNumber));

    if (!retrievedAccountRecord) {
      return response.status(404).json({
        status: 404,
        error: 'Account not found'
      });
    }

    if (retrievedAccountRecord.status !== 'active') {
      return response.status(400).json({
        status: 400,
        error: 'Sorry, Account is not active'
      });
    }

    if (retrievedAccountRecord.balance < amount) {
      return response.status(400).json({
        status: 400,
        error: 'Sorry,  insufficient fund'
      });
    }

    const oldBalance = retrievedAccountRecord.balance;
    const transactionId = transactions.length + 1;
    const type = 'debit';
    const newBalance = oldBalance - amount;
    retrievedAccountRecord.balance = newBalance;

    const debitDetails = {
      transactionId,
      createdOn: new Date().toLocaleString(),
      type,
      accountNumber,
      cashier,
      amount,
      oldBalance,
      newBalance
    };

    TransactionService.debitOne(debitDetails);
    return response.status(201).json({
      status: 201,
      data: debitDetails
    });
  }
}

export default TransactionController;
