const accountCreated = document.getElementById('account-created');
const createAccount = document.getElementById('create-account');
const createAccountForm = document.getElementById('create-account-form');
const noAccount = document.getElementById('no-accounts');
const create = document.getElementById('create');
const accountProfile  = document.getElementById('account-profile');
const viewProfile  = document.getElementById('view-profile');

viewProfile.style.display = 'none';

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
  // accountProfile.style.display = 'block';
  viewProfile.style.display = 'block';
};

const showAccountProfile = () => {
  accountProfile.style.display = 'block';
  noAccount.style.display = 'none';
  accountCreated.style.display = 'none';
}

viewProfile.disabled = false;

createAccount.addEventListener('click', userCreateAccount);
create.addEventListener('click', createAccountBtn);
viewProfile.addEventListener('click', showAccountProfile);