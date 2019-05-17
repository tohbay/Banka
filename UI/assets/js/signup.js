/* eslint-disable no-debugger */
const basePath = '../../assets/pages';

async function submitRegistrationForm(e) {
  e.preventDefault();
  const registrationInfo = {
    email: document.getElementById('email').value,
    firstName: document.getElementById('firstname').value,
    lastName: document.getElementById('lastname').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirm-password').value,
  };
  await fetch('http://localhost:3001/api/v2/auth/signup', {
    method: 'POST',
    body: JSON.stringify(registrationInfo),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then((res) => {
      if (res.status === 201) window.location.href = `${basePath}/login.html`;
      else {
        debugger;
        const newParagraph = document.createElement('p');
        const textNode = document.createTextNode('An error occurred while trying to register you');
        newParagraph.appendChild(textNode);

        const div = document.getElementById('signup-user');
        div.insertBefore(newParagraph, div.childNodes[0]);
        newParagraph.style.color('red');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById('signupBtn').addEventListener('click', submitRegistrationForm);
