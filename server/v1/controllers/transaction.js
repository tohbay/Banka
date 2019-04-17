import transactions from '../../db/transactions';
import TransactionService from '../models/transaction';
import AccountService from '../models/account';


class TransactionController {
  static fetchAll(request, response) {
    const transactionRecords = TransactionService.getAll(transactions);
    if (transactionRecords.length === 0) return response.status(200).json({ status: 404, message: 'There are no transaction records' });
    return response.status(200).json({
      status: 200,
      message: 'All Transactions retrieved successfully',
      data: transactionRecords
    });
  }

  static fetchSpecificTransaction(request, response) {
    const { id } = request.params;
    const specificTransactionRecord = TransactionService.getOne(Number(id));
    if (!specificTransactionRecord) return response.status(200).json({ status: 404, message: 'Transaction with given Id does not exist' });
    return response.status(200).json({
      status: 200,
      message: 'All Transactions retrieved successfully',
      data: specificTransactionRecord
    });
  }

  static creditAccount(request, response) {
    const { accountNumber } = request.params;
    const { amount, cashier } = request.body;
    const retrievedAccountRecord = AccountService.getOne(Number(accountNumber));

    if (!retrievedAccountRecord) return response.status(200).json({ status: 404, message: 'Unable to retrieve account' });
    if (retrievedAccountRecord.status === 'dormant') return response.status(400).json({ status: 400, message: 'Sorry,  Account is dormant; cannot proceed with this transaction' });
    if (retrievedAccountRecord.status === 'draft') return response.status(400).json({ status: 400, message: 'Sorry,  Account is not active; cannot proceed with this transaction' });

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
      message: 'Transaction complete, account credited successfully',
      data: creditDetails
    });
  }

  static debitAccount(request, response) {
    const { accountNumber } = request.params;
    const { amount, cashier } = request.body;
    const retrievedAccountRecord = AccountService.getOne(Number(accountNumber));

    if (!retrievedAccountRecord) response.status(200).json({ status: 404, message: 'Unable to retrieve account' });
    if (retrievedAccountRecord.status === 'dormant') return response.status(400).json({ status: 400, message: 'Sorry,  Account is dormant; cannot proceed with this transaction' });
    if (retrievedAccountRecord.status === 'draft') return response.status(400).json({ status: 400, message: 'Sorry,  Account is not active; cannot proceed with this transaction' });
    if (retrievedAccountRecord.balance < amount) return response.status(400).json({ status: 400, message: 'Sorry,  insufficient fund' });

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
    return response.status(200).json({
      status: 200,
      message: 'Transaction complete, account debited successfully',
      data: debitDetails
    });
  }
}

export default TransactionController;
