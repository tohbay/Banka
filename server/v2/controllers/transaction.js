import transactions from '../../db/transactions';
import TransactionService from '../models/transaction';
import AccountService from '../models/account';
import validate from '../../middleware/validate';

class TransactionController {
  static fetchAll(request, response) {
    const allTransactions = TransactionService.getAll(transactions);
    if (allTransactions.length === 0) {
      return response.status(404).json({
        status: 404,
        error: 'There are no transaction records'
      });
    }
    return response.status(200).json({
      status: 200,
      data: allTransactions
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

    const oldBalance = retrievedAccountRecord.balance;
    const transactionId = transactions.length + 1;
    const type = 'credit';
    const newBalance = oldBalance + amount;
    retrievedAccountRecord.balance = newBalance;

    const creditDetails = {
      transactionId,
      createdOn: new Date().toLocaleString(),
      type,
      accountNumber,
      cashier,
      amount,
      oldBalance,
      newBalance
    };

    const { value, error } = validate.creditAccount(request.body);
    if (error) {
      return response.status(400).json(error);
    }

    TransactionService.creditOne(creditDetails);
    return response.status(200).json({
      status: 200,
      data: creditDetails
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
