const basePath = '../../assets/pages';

async function submitLoginForm(e) {
  e.preventDefault();
  const loginData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  await fetch('https://banka-tobe.herokuapp.com/api/v2/auth/signin', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then((response) => {
      if (response.token) window.localStorage.setItem('authToken', response.token);
      if (response.status === 200) window.location.href = `${basePath}/client.html`;
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById('loginBtn').addEventListener('click', submitLoginForm);
