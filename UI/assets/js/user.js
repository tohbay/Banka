// const accountCreated = document.getElementById('account-created');
const createAccount = document.getElementById('create-account');
// const createAccountForm = document.getElementById('create-account-form');
const noAccount = document.getElementById('no-accounts');
const create = document.getElementById('create');

const accountProfile = document.getElementById('account-profile');
const viewProfile = document.getElementById('view-profile');


const transactionHistory = document.getElementById('transaction-history');
const viewTransactions = document.getElementById('view-transactions');
const mainView = document.getElementById('client');
const accountTransactions = document.getElementById('account-transactions');

// noAccount.style.display = 'block';
transactionHistory.style.display = 'none';
// createAccountForm.style.display = 'none';
accountProfile.style.display = 'none';
viewProfile.style.display = 'block';
accountTransactions.style.display = 'none';

const userCreateAccount = () => {
  createAccountForm.style.display = 'block';
  transactionHistory.style.display = 'none';
  accountProfile.style.display = 'none';
};

const createAccountBtn = (e) => {
  createAccountForm.style.display = 'block';
  accountCreated.style.display = 'block';
  createAccountForm.style.display = 'none';
  e.preventDefault();
  noAccount.style.display = 'none';
  viewProfile.style.display = 'block';
};

const showAccountProfile = () => {
  accountProfile.style.display = 'block';
  accountCreated.style.display = 'none';
  transactionHistory.style.display = 'none';
  createAccountForm.style.display = 'none';
  // noAccount.style.display = 'none';
};

const showTransctionHistory = (e) => {
  accountProfile.style.display = 'none';
  transactionHistory.style.display = 'block';
  e.preventDefault();
  accountTransactions.style.display = 'none';
  createAccountForm.style.display = 'none';
};
// transactionHistory.style.display = 'none';

const viewTransactionDetails = (e) => {
  mainView.style.overflowY = 'scroll';
  accountTransactions.style.display = 'block';
  e.preventDefault();
};

viewProfile.disabled = false;

createAccount.addEventListener('click', userCreateAccount);
// create.addEventListener('click', createAccountBtn);
viewProfile.addEventListener('click', showAccountProfile);
viewTransactions.addEventListener('click', showTransctionHistory);


// const viewDetails = document.querySelectorAll('.view');
// for (let i = 0; i <= viewDetails.length; i++) {
//   viewDetails[i].addEventListener('click', viewTransactionDetails);
// }
