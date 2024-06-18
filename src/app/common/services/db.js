
const { Pool } = require('pg');
//const parseConfig = require('./configParser');

//const config = parseConfig('./parameters.cfg');

//console.log(config.db.db_database); // testing_db
//console.log(config.db.db_user); // postgres
// POSTGRES
//
// "pg": "^8.7.1",
// TABLE SCHEMA = CREATE TABLE customers (firstname text, lastname text); #SET IN init.db file
//
// SO > with SAVE FUNC YOU CAN STORE 2 VALUE (VALUE1, VALUE2)
//
// HOW TO TEST CONNECTION
// docker exec -it POSTGRESSCONTAINER /bin/bash
// psql -h localhost -U postgres
// \c testing_db
// SELECT * FROM customers;
// \q



const db = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'testing_db',
  password: 'admin123',
  port: 5432,
});

function queryDatabase() {
  db.query('SELECT * FROM customers;', (err, res) => {
    if (err) {
      console.error('Błąd podczas wykonania zapytania:', err);
    } else {
      console.log('Wynik zapytania:', res.rows);
    }

    db.end();
  });
}

function addCustomerToDb(firstname, lastname) {
  const query = 'INSERT INTO customers (firstname, lastname) VALUES ($1, $2)';
  const values = [firstname, lastname];
  db.query(query, values, (err, res) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m','POSTGRES: ERROR while adding record', err);
    } else {
      console.log('\x1b[32m%s\x1b[0m','POSTGRES:SUCCESS record added', res.rows);
    }
    db.end();
  });
}

function getAllFromDb() {
  const query = 'SELECT * FROM customers';
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'POSTGRES: ERROR while retrieving records', err);
        reject(err); // Reject the promise with the error
      } else {
        console.log('\x1b[32m%s\x1b[0m', 'POSTGRES: SUCCESS records retrieved', res.rows);
        resolve(res.rows); // Resolve the promise with the result
      }
      db.end();
    });
  });
}

module.exports = {
  queryDatabase,
  addCustomerToDb,
  getAllFromDb
};

