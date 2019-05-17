async function viewUserAccounts(e) {
  e.preventDefault();

  const email = document.getElementById('user-email').value;

  await fetch(`https://banka-tobe.herokuapp.com/api/v2/accounts/user/${email}`, {
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
