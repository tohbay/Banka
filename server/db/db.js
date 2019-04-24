import client from '../connectDB';

const createTables = () => {
  const tables = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS accounts CASCADE;
  DROP TABLE IF EXISTS transactions CASCADE;

  CREATE TABLE users(
    id serial NOT NULL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    isAdmin BOOLEAN
  );

  CREATE TABLE accounts(
    id serial NOT NULL PRIMARY KEY,
    accountNumber BIGINT NOT NULL UNIQUE,
    createdOn TIMESTAMP NOT NULL,
    owneremail VARCHAR NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    balance FLOAT NOT NULL
  );

  CREATE TABLE transactions(
    id serial NOT NULL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL,
    type TEXT NOT NULL,
    accountNumber BIGINT NOT NULL,
    cashier serial NOT NULL,
    amount BIGINT NOT NULL,
    oldBalance FLOAT NOT NULL,
    newBalance FLOAT NOT NULL
  );
  `;

  return client.query(tables)
    .then((res) => {
      console.log('All tables were created successfully!');
      return process.exit();
    })
    .catch((err) => {
      console.log('Error occured while creating the tables: ', err);
      client.end();
      return process.exit();
    });
};


export default createTables();
