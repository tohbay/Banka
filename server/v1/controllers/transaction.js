import transactions from '../../db/transactions';
import TransactionService from '../models/transaction';
import AccountService from '../models/account';

class TransactionController {
  static fetchAll(request, response) {
    const allTransactions = TransactionService.getAll(transactions);
    if (allTransactions.length === 0) return response.status(404).json({ status: 404, error: 'There are no transaction records' });
    return response.status(200).json({
      status: 200,
      data: allTransactions
    });
  }

  static fetchSpecificTransaction(request, response) {
    const { id } = request.params;
    const specificTransactionRecord = TransactionService.getOne(Number(id));
    if (!specificTransactionRecord) return response.status(404).json({ status: 404, error: 'Transaction record not found' });
    return response.status(200).json({
      status: 200,
      data: specificTransactionRecord
    });
  }

  static creditAccount(request, response) {
    const { accountNumber } = request.params;
    const { amount, cashier } = request.body;
    const retrievedAccountRecord = AccountService.getOne(Number(accountNumber));

    if (!retrievedAccountRecord) return response.status(404).json({ status: 404, error: 'Account not found' });
    if (retrievedAccountRecord.status !== 'active') return response.status(400).json({ status: 400, error: 'Sorry, Account is not active' });

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
    TransactionService.creditOne(creditDetails);
    return response.status(200).json({
      status: 200,
      data: creditDetails
    });
  }

  static debitAccount(request, response) {
    const { accountNumber } = request.params;
    const { amount, cashier } = request.body;
    const retrievedAccountRecord = AccountService.getOne(Number(accountNumber));

    if (!retrievedAccountRecord) return response.status(404).json({ status: 404, error: 'Account not found' });
    if (retrievedAccountRecord.status !== 'active') return response.status(400).json({ status: 400, error: 'Sorry, Account is not active' });
    if (retrievedAccountRecord.balance < amount) return response.status(400).json({ status: 400, error: 'Sorry,  insufficient fund' });

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
