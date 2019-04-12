import accounts from '../../db/accounts';
import users from '../../db/users';

class AccountService {
  static getAll() {
    return accounts;
  }

  static create(data) {
    const newAccount = {
      id: accounts[accounts.length - 1].id + 1,
      accountNumber: users[users.length - 1].id,
      firstName: users[users.length - 1].firstName,
      lastName: users[users.length - 1].lastName,
      email: users[users.length - 1].email,
      createdOn: new Date().toLocaleString(),
      owner: users[users.length - 1].id,
      type: data.type,
      status: 'draft',
      openingBalance: 0.00
    };

    accounts.push(newAccount);
    return newAccount;
  }

  static getOne(id) {
    const account = accounts.find(account => account.id === id);
    return account;
  }

  static deleteOne(id) {
    const account = accounts.find(account => account.id === id);

    const index = accounts.indexOf(account);
    accounts.splice(index, 1);

    return account;
  }
}

export default AccountService;
