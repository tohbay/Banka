[![Build Status](https://travis-ci.org/tobechukwuobitube/Banka.svg?branch=develop)](https://travis-ci.org/tobechukwuobitube/Banka)
[![Coverage Status](https://coveralls.io/repos/github/tobechukwuobitube/Banka/badge.svg?branch=ch-setup-transaction-dummyData-model-%23165334294)](https://coveralls.io/github/tobechukwuobitube/Banka?branch=ch-setup-transaction-dummyData-model-%23165334294)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f3d6ff4120779fd6daf1/test_coverage)](https://codeclimate.com/github/tobechukwuobitube/Banka/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/f3d6ff4120779fd6daf1/maintainability)](https://codeclimate.com/github/tobechukwuobitube/Banka/maintainability)

# Banka
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.


## Link to github pages
https://tobechukwuobitube.github.io/Banka/

## Heroku Link
https://banka-tobe.herokuapp.com

## API Documentation
https://banka-tobe.herokuapp.com/api-docs/


## Current Features and gitHub-pages link:

| User            | FEATURE                | LINK TO PAGES/VIEWS                                                             |
| ---------       | -----------------------| --------------------------------------------------------------------------------|
| Client          | User can sign up       | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/signup.html           |
| Client          | User can sign in       | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/login.html            |
| Client          | Create bank account    | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/client.html           |
| Admin/Staff     | Activate an account    | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/admin-dashboard.html  |
| Admin/Staff     | Deactivate an account  | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/admin-dashboard.html  |
| Admin/Staff     | Delete an account      | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/accounts.html         |
| Staff (cashier) | Credit an account      | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/transaction.html      |
| Staff (cashier) | Credit an account      | https://tobechukwuobitube.github.io/Banka/UI/assets/pages/transaction.html      |


## API endpoints

| HTTP VERB | ENDPOINT                                | FUNCTIONALITY                           |
| --------- | ------------------------------          | ----------------------------------------|
| POST      | api/v1/auth/signup                      | Create a user account                   |
| POST      | api/v1/auth/signup                      | Login a user                            |
| POST      | api/v1/accounts                         | Create a bank account                   |
| PATCH     | api/v1/accounts/:accountNumber          | Activate or Deactivate a bank account   |
| GET       | api/v1/accounts                         | Fetch all bank accounts                 |
| GET       | api/v1/accounts/:id                     | Fetch all specific bank accounts        |

## Technologies Used
* HTML5 for page structure and contents
* CSS3 for page styles
* JavaScript ES6 for DOM Manipulations
* Nodejs: an open source server framework that allows you to run JavaScript on the server.
* Express: open source server-side framework for starting out Javascript server quickly on the fly.
* Pivotal Tracker: an open source projement management tool for managing different stages of teh development process.

## Author
tobechukwuobitube@gmail.com

### Footnote
This project is still ongoing.
Your kind reviews are highly appreciated.
