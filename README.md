[![Build Status](https://travis-ci.org/tobechukwuobitube/Banka.svg?branch=develop)](https://travis-ci.org/tobechukwuobitube/Banka)
[![Coverage Status](https://coveralls.io/repos/github/tobechukwuobitube/Banka/badge.svg?branch=ch-setup-transaction-dummyData-model-%23165334294)](https://coveralls.io/github/tobechukwuobitube/Banka?branch=ch-setup-transaction-dummyData-model-%23165334294)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f3d6ff4120779fd6daf1/test_coverage)](https://codeclimate.com/github/tobechukwuobitube/Banka/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/f3d6ff4120779fd6daf1/maintainability)](https://codeclimate.com/github/tobechukwuobitube/Banka/maintainability)


# Banka
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.


## Project Features:

| User            | FEATURE                                       |
| ---------       | ----------------------------------------------|
| Client          | User can sign up                              |
| Client          | User can sign in                              |
| Client          | User Create bank account                      |
| Client          | User can view account transaction history     |
| Client          | User can view a specific account transaction  |
| Staff (cashier) | User credit an account                        |
| Staff (cashier) | User debit an account                         |
| Admin/Staff     | User can can view all user accounts           |
| Admin/Staff     | User can can view a specific user accounts    |
| Admin/Staff     | User can deactivate an account                |
| Admin/Staff     | User can activate an account                  |
| Admin/Staff     | User can delete an account                    |
| Admin/Staff     | User create a cashier or admin user accounts  |


## Link to github pages
https://tobechukwuobitube.github.io/Banka/

## Heroku Link
https://banka-tobe.herokuapp.com

## API Documentation
https://banka-tobe.herokuapp.com/api-docs/




## API endpoints

| HTTP VERB | ENDPOINT                                        | FUNCTIONALITY                                      |
| --------- | ------------------------------------------------| -------------------------------------------------- |
| POST      | api/v2/auth/signup                              | Create a user account                              |
| POST      | api/v2/auth/signup                              | Login a user                                       |
| GET       | api/v2/users                                    | Fetch all user accounts                            |
| GET       | api/v2/users/user/:email                        | Fetch a specific user accounts                     |
| PATCH     | api/v2/users/:email/cashier                     | Update client type from client to cashier          |
| PATCH     | api/v2/users/:email/admin                       | Update client type from cashier to admin           |
| DELETE    | api/v2/users/user/:email                        | Delete a particular user account                   |
| POST      | api/v2/accounts                                 | Create a bank account                              |
| PATCH     | api/v2/accounts/:accountNumber                  | Activate or Deactivate a bank account              |
| GET       | api/v2/accounts                                 | Fetch all bank accounts                            |
| GET       | api/v2/accounts/:accountNumber                  | Fetch a specific bank accounts                     |
| DELETE    | api/v2/accounts/:accountNumber                  | Delete a specific bank accounts                    |
| GET       | api/v2/accounts/status/dormant                  | Fetch all dormant bank accounts                    |
| GET       | api/v2/accounts/status/active                   | Fetch all active bank accounts                     |
| GET       | api/v2/accounts/user/:email                     | Fetch all bank accounts owned by a specific user   |
| GET       | api/v2/transactions/                            | Fetch all transactions                             |
| GET       | api/v2/transactions/:id                         | Fetch a specific transaction                       |
| POST      | api/v2/transactions/:accountNumber/credit       | Credit a specific account number                   |
| POST      | api/v2/transactions/:accountNumber/debit        | Debit a specific account number                    |
| GET       | api/v2/transactions/:accountNumber/transactions | Get all transactions on a specific account number  |



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
