const accounts = [
  {
    id: 1,
    accountNumber: 1,
    email: 'frank@email.com',
    firstName: 'Frank',
    lastName: 'Obi',
    createdOn: new Date().toLocaleString(),
    owner: 1,
    type: 'savings',
    status: 'draft',
    balance: 0.00
  },
  {
    id: 2,
    accountNumber: 2,
    email: 'Emeka@email.com',
    firstName: 'Emeka',
    lastName: 'John',
    createdOn: new Date().toLocaleString(),
    owner: 2,
    type: 'savings',
    status: 'active',
    balance: 550.35
  },
  {
    id: 3,
    accountNumber: 3,
    email: 'mark@email.com',
    firstName: 'Mark',
    lastName: 'James',
    createdOn: new Date().toLocaleString(),
    owner: 3,
    type: 'current',
    status: 'dormant',
    balance: 1000000.78
  }
];

export default accounts;
