const basePath = '../../assets/pages';
// code for email validations is credited to https://www.w3resource.com/javascript/form/email-validation.php
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const messageInfo = document.getElementById('message-info');
const email = document.getElementById('email');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const signupBtn = document.getElementById('signupBtn');

const userSignup = (userInfo) => {
  // const signupUrl = 'https://banka-tobe.herokuapp.com/api/v2/auth/signup';
  const signupUrl = 'http://localhost:3001/api/v2/auth/signup';
  const options = {
    method: 'POST',
    body: userInfo,
    headers: { 'Content-Type': 'application/json' }
  };

  fetch(signupUrl, options)
    .then(response => response.json())
    .then((response) => {
      if (response.error) {
        messageInfo.innerHTML = response.error;
        return false;
      }

      messageInfo.innerHTML = response.message;

      // localStorage.setItem('Authorization', token);
      if (response.status === 201) {
        setTimeout(() => {
          (window.location.href = `${basePath}/login.html`);
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

signupBtn.addEventListener('click', (e) => {
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

  if (firstName.value === '') {
    messageInfo.innerHTML = 'First name is required!';
    firstName.focus();
    return false;
  }

  if (lastName.value === '') {
    messageInfo.innerHTML = 'Last name is required!';
    lastName.focus();
    return false;
  }


  if (password.value === '') {
    messageInfo.innerHTML = 'Password is required!';
    password.focus();
    return false;
  }

  if (password.value.length < 6) {
    messageInfo.innerHTML = 'The password must be minimum 6 characters';
    password.focus();
    return false;
  }


  if (confirmPassword.value === '') {
    messageInfo.innerHTML = 'Confirm Password is required!';
    confirmPassword.focus();
    return false;
  }

  if (password.value !== confirmPassword.value) {
    messageInfo.innerHTML = 'Password do not match';
    confirmPassword.focus();
    return false;
  }

  const userInfo = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };
  const body = JSON.stringify(userInfo);
  userSignup(body);
});
