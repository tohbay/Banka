const transactionHistory = document.getElementById('transaction-history');
const viewTransactions = document.getElementById('view-transactions');
const mainView = document.getElementById('client');
const accountTransactions = document.getElementById('account-transactions');
const viewDetails = document.querySelectorAll('.view');

accountTransactions.style.display = 'none';

const showTransctionHistory = (e) => {
  accountProfile.style.display = 'none';
  transactionHistory.style.display = 'block';
  e.preventDefault();
  accountTransactions.style.display = 'none';
}
// transactionHistory.style.display = 'none';

const viewTransactionDetails = (e) => {
  mainView.style.overflowY = 'scroll';
  accountTransactions.style.display = 'block';
  e.preventDefault();
}

viewTransactions.addEventListener('click', showTransctionHistory);

for(let i = 0; i <= viewDetails.length; i++) {
  viewDetails[i].addEventListener('click', viewTransactionDetails);
}