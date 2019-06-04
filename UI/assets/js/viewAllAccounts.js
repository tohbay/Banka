
const viewUserAccounts = (e) => {
  e.preventDefault();
  // const fetchUrl = `https://banka-tobe.herokuapp.com/api/v2/accounts/user/${email}`;
  const fetchUrl = `http://localhost:3001/api/v2/accounts/user/${email}`;
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
  };

  fetch(fetchUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => { console.log(err); });
};

document.getElementById('my-accounts').addEventListener('click', viewUserAccounts);
