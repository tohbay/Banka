import transactions from '../../db/transactions';
import AccountService from './account';
import accounts from '../../db/accounts';

class TransactionService {
  static getAll() {
    return transactions;
  }

  static getOne(transactionId) {
    const transaction = transactions.find(
      transaction => transaction.transactionId === Number(transactionId)
    );
    return transaction;
  }

  static creditOne(data) {
    const creditDetails = {
      transactionId: transactions.length + 1,
      createdOn: new Date().toLocaleString(),
      type: 'credit',
      accountNumber: data.accountNumber,
      amount: data.amount,
      cashier: data.cashier,
      oldBalance: data.oldBalance,
      newBalance: data.newBalance
    };

    return transactions.push(creditDetails);
  }

  static debitOne(data) {
    const debitDetails = {
      transactionId: data.transactionId,
      createdOn: data.createdOn,
      type: data.type,
      accountNumber: data.accountNumber,
      amount: data.amount,
      cashier: data.cashier,
      oldBalance: data.oldBalance,
      newBalance: data.newBalance
    };

    return transactions.push(debitDetails);
  }

  static deleteOne(id) {
    const transaction = transactions.find(transaction => transaction.id === Number(transactionId));

    const index = transactions.indexOf(transaction);
    transaction.splice(index, 1);

    return transaction;
  }
}

export default TransactionService;
