const accountCreated = document.getElementById('account-created');
const createAccount = document.getElementById('create-account');
const createAccountForm = document.getElementById('create-account-form');
const noAccount = document.getElementById('no-accounts');
const create = document.getElementById('create');

noAccount.style.display = 'block';

const userCreateAccount = () => {
  createAccountForm.style.display = 'block';
};

const createAccountBtn = (e) => {
  createAccountForm.style.display = 'block';
  accountCreated.style.display = 'block';
  createAccountForm.style.display = 'none';
  e.preventDefault();
  noAccount.style.display = 'none';
};

createAccount.addEventListener('click', userCreateAccount);
create.addEventListener('click', createAccountBtn);