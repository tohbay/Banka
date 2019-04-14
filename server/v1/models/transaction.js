import transaction from '../../db/transactions';

class TransactionService {
  static getAll() {
    return transaction;
  }

  static getOne(id) {
    const account = transaction.find(account => account.id === id);
    return account;
  }

  static deleteOne(id) {
    const account = transaction.find(account => account.id === id);

    const index = transaction.indexOf(account);
    transaction.splice(index, 1);

    return account;
  }
}

export default TransactionService;
