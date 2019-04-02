const accountProfile  = document.getElementById('account-profile');
const viewProfile  = document.getElementById('view-profile');
const noAccount = document.getElementById('no-accounts');

noAccount.style.display = 'none';

const showAccountProfile = () => {
  accountProfile.style.display = 'block';
}

viewProfile.addEventListener('click', showAccountProfile);