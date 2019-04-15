import transactions from '../../db/transactions';
import AccountService from './account';

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

  static creditOne(accountNumber) {
  }

  static deleteOne(id) {
    const transaction = transactions.find(transaction => transaction.id === Number(transactionId));

    const index = transactions.indexOf(transaction);
    transaction.splice(index, 1);

    return transaction;
  }
}

export default TransactionService;
