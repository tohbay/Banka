// const authUser = JSON.parse(localStorage.getItem('authToken'));
// const userData = JSON.parse(localStorage.getItem('authToken'));

// console.log(userData.firstName, userData.lastName, userData.email);

async function viewUserAccounts(e) {
  e.preventDefault();

  // console.log(getUserToken());
  // const token = window.localStorage.getItem('authToken');


  const email = document.getElementById('user-email').value;


  await fetch(`http://localhost:3001/api/v2/accounts/user/${email}`, {
    // method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`
    }
  })
    .then(res => res.json())
    .then((data) => { console.log(data); })
    .catch((err) => { console.log(err); });
}

document.getElementById('my-accounts').addEventListener('click', viewUserAccounts);
