import accounts from '../db/accounts';
import users from '../db/users';

class AccountService {
  static getAll() {
    return accounts;
  }

  static create(account) {
    const id = accounts[accounts.length - 1].id + 1;
    const accountNumber = users[users.length].id;
    const { createdOn } = accounts;
    const owner = users[users.length].id;
    const type = 'client';
    const { status } = accounts;
    const openingBalance = accounts[accounts.length].balance;
    const {
      email, firstName, lastName, password
    } = users;

    const newAccount = {
      id, accountNumber, createOn, owner, type, status, openingBalance
    };

    accounts.push(newAccount);
    return newAccount;
  }

  static getOne(id) {
    const account = accounts.find(account => account.id === id);
    return account || {};
  }

  static deleteOne(id) {
    const account = accounts.find(account => account.id === id);

    const index = accounts.indexOf(account);
    accounts.splice(index, 1);

    return account || {};
  }
}

export default AccountService;
