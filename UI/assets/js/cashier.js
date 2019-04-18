const transact = document.getElementById('transact-account');
const transactForm = document.getElementById('transact-form');
const viewAccounts = document.getElementById('view-accounts');
const showAccounts = document.getElementById('show-accounts');
const viewTransactionHistory = document.getElementById('view-transactions');
const transactHistory = document.getElementById('transaction-history');
const viewDetails = document.querySelectorAll('.view');

transactForm.style.display = 'none';
transactHistory.style.display = 'none';
viewAccounts.style.display = 'none';

const showTransactForm = () => {
  transactForm.style.display = 'block';
  transactHistory.style.display = 'none';
  viewAccounts.style.display = 'none';
};

const showTransactionHistory = () => {
  transactForm.style.display = 'none';
  transactHistory.style.display = 'block';
  viewAccounts.style.display = 'none';
};

const showAllAccounts = () => {
  viewAccounts.style.display = 'block';
  transactForm.style.display = 'none';
  transactHistory.style.display = 'none';
};

const viewTransactionDetails = (e) => {
  mainView.style.overflowY = 'scroll';
  accountTransactions.style.display = 'block';
  e.preventDefault();
};


transact.addEventListener('click', showTransactForm);
viewTransactionHistory.addEventListener('click', showTransactionHistory);
showAccounts.addEventListener('click', showAllAccounts);

for (let i = 0; i <= viewDetails.length; i++) {
  viewDetails[i].addEventListener('click', viewTransactionDetails);
}
