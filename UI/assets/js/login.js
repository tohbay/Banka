const basePath = '../../assets/pages';
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const messageInfo = document.getElementById('message-info');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

const userlogin = (loginInfo) => {
  // const loginUrl = 'https://banka-tobe.herokuapp.com/api/v2/auth/signin';
  const loginUrl = 'http://localhost:3001/api/v2/auth/signin';
  // const loginUrl = 'localhost:3001/api/v2/auth/signin';
  const options = {
    method: 'POST',
    // mode: 'no-cors',
    body: JSON.stringify(loginInfo),
    headers: { 'Content-Type': 'application/json' }
  };

  fetch(loginUrl, options)
    .then(response => response.json())
    .then((response) => {
      const { token, message } = response;
      if (response.error) {
        messageInfo.innerHTML = response.error;
      } else {
        messageInfo.innerHTML = response.message;
        localStorage.setItem('Authorization', token);
        // localStorage.setItem('authUser', JSON.stringify(user));

        // const token = window.localStorage.getItem('Authorization');
        // const jwtData = token.split('.')[1];
        // const decodedJwtJsonData = window.atob(jwtData);
        // const decodedJwtData = JSON.parse(decodedJwtJsonData);

        // const { ...userData } = decodedJwtData;
        // const {
        //   email, firstName, lastName, type, isAdmin
        // } = userData;
        // const {
        //   email, firstName, lastName, type, isAdmin
        // } = decodedJwtData;
        // const {
        //   email, firstName, lastName, type, isAdmin
        // } = userData;
        // console.log(isAdmin, email);
        // console.log(`jwtData: ${jwtData}`);
        // console.log(`decodedJwtJsonData: ${decodedJwtJsonData}`);
        // console.log(`decodedJwtData: ${decodedJwtData}`);
        // console.log(`Is admin: ${isAdmin}`);

        // console.log(`${email}, ${firstName}, ${lastName}, ${type}, ${isAdmin}`);
        // console.log(token);
        // debugger;
        // localStorage.setItem('Authorization', token);
        if (response.status === 200) {
          setTimeout(() => {
            (window.location.href = `${basePath}/client.html`);
          }, 2000);
        }
      }
    })
    .catch((error) => {
      // console.log(error);
      messageInfo.innerHTML = error;
    });
};

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (email.value === '') {
    messageInfo.innerHTML = 'Email is required!';
    email.focus();
    return false;
  }

  if (!validEmail.test(String(email.value).toLowerCase())) {
    messageInfo.innerHTML = 'Invalid email addresponses!';
    email.focus();
    return false;
  }

  if (password.value === '') {
    messageInfo.innerHTML = 'Password is required!';
    password.focus();
    return false;
  }

  const loginInfo = {
    email: email.value,
    password: password.value,
  };

  userlogin(loginInfo);
});
