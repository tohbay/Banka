const basePath = '../../resources/pages';
const accountCreated = document.getElementById('account-created');
const createAccountForm = document.getElementById('create-account-form');
const messageInfo = document.getElementById('message-info');
const userName = document.getElementById('user-name');
const logout = document.getElementById('logout');


userName.textContent = '';

// const getUserToken = () => {
const token = window.localStorage.getItem('Authorization');
//   if (token) {
//     return token;
//   }
//   return 'No token Found';
// };


// const token = window.localStorage.getItem('authToken');
const jwtData = token.split('.')[1];
const decodedJwtJsonData = window.atob(jwtData);
const decodedJwtData = JSON.parse(decodedJwtJsonData);

const { ...userData } = decodedJwtData;
const {
  email, firstName, lastName, type, isAdmin
} = userData;
// console.log(isAdmin, email);
// console.log(`jwtData: ${jwtData}`);
// console.log(`decodedJwtJsonData: ${decodedJwtJsonData}`);
// console.log(`decodedJwtData: ${decodedJwtData}`);
// console.log(`Is admin: ${isAdmin}`);

// console.log(`${email}, ${firstName}, ${lastName}, ${type}, ${isAdmin}`);

userName.textContent = `${firstName}`;


function createNewAccount(e) {
  e.preventDefault();

  const sel = document.getElementById('account-type');

  // fetch('https://banka-tobe.herokuapp.com/api/v2/accounts', {
  fetch('http://localhost:3001/api/v2/accounts', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ type: sel.value }),
    headers: new Headers({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${getUserToken()}`
      Authorization: `Bearer ${token}`
      // Authorization: token
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        messageInfo.innerHTML = data.error;
      } else {
        messageInfo.innerHTML = data.message;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById('create').addEventListener('click', createNewAccount);

const clearToken = () => window.localStorage.removeItem('Authorization');
logout.addEventListener('click', clearToken);
