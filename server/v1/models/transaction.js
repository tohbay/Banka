import transactions from '../../db/transactions';

class TransactionService {
  static getAll() {
    return transactions;
  }

  static getOne(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    return transaction;
  }

  static deleteOne(id) {
    const transaction = transactions.find(transaction => transaction.id === id);

    const index = transactions.indexOf(transaction);
    transaction.splice(index, 1);

    return transaction;
  }
}

export default TransactionService;
