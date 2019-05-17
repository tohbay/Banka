const basePath = '../../resources/pages';
const accountCreated = document.getElementById('account-created');
const createAccountForm = document.getElementById('create-account-form');

const getUserToken = () => {
  const tokenStr = window.localStorage.getItem('authToken');
  if (tokenStr) {
    return tokenStr;
  }
  return 'No token Found';
};

const userToken = window.localStorage.getItem('authToken');

const {
  email, firstName, lastName, type, isAdmin
} = userToken;

async function createNewAccount(e) {
  e.preventDefault();

  const sel = document.getElementById('account-type');

  await fetch('https://banka-tobe.herokuapp.com/api/v2/accounts', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ type: sel.value }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`
    }),
  })
    .then(response => response.json())
    .then((response) => {
      if (response.status === 201) {
        createAccountForm.style.display = 'none';
        accountCreated.style.display = 'block';
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById('create').addEventListener('click', createNewAccount);
