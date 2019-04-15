const transactions = [
  {
    transactionId: 1,
    createdOn: new Date().toLocaleString(),
    type: 'credit',
    accountNumber: 1,
    cashier: 1,
    amount: 500.00,
    oldBalance: 0.00,
    newBalance: 500.00
  },
  {
    transactionId: 2,
    createdOn: new Date().toLocaleString(),
    type: 'credit',
    accountNumber: 3,
    cashier: 1,
    amount: 30.67,
    oldBalance: 450.00,
    newBalance: 480.67
  },
  {
    transactionId: 3,
    createdOn: new Date().toLocaleString(),
    type: 'debit',
    accountNumber: 2,
    cashier: 1,
    amount: 500.00,
    oldBalance: 1000.00,
    newBalance: 500.00
  }
];

export default transactions;
