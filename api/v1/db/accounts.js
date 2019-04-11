const accounts = [
  {
    id: 1,
    accountNumber: 1,
    createdOn: Date.now(),
    Owner: 1,
    type: 'savings',
    status: 'draft',
    balance: 0.00
  },
  {
    id: 2,
    accountNumber: 2,
    createdOn: Date.now(),
    Owner: 2,
    type: 'savings',
    status: 'active',
    balance: 550.35
  },
  {
    id: 3,
    accountNumber: 3,
    createdOn: Date.now(),
    Owner: 3,
    type: 'current',
    status: 'dormant',
    balance: 1000000.78
  }
];

export default accounts;
