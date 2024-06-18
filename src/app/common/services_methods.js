
const crypto = require('crypto');

const { createQueueAndSendMessages } = require('./services/rabbitmq.js');
const { consumeQueueAndSaveToDb } = require('./services/rabbitmq.js');
const { addToMemcachedFew } = require('./services/memcached.js');
const { getFromMemcached } = require('./services/memcached.js');
const { queryDatabase } = require('./services/db.js');
const { addCustomerToDb } = require('./services/db.js');
const { getAllFromDb } = require('./services/db.js');

// MAIN FUNCTIONS
function save(name,lastname) {
  //1 RABBITMQ > CREATE QUEUE AND MESSAGE
  //2 CONSUME FROM RABBITMQ AND SAVE IN DATABASE

  //USE RANDOM STRING TO NAME QUEUE
  const randomString = require('crypto').randomBytes(32).toString('hex');
  //CREATE QUEUE
  createQueueAndSendMessages(randomString, name, lastname);
  //CONSUME QUEUE
  consumeQueueAndSaveToDb(randomString)
  .then(([firstname, lastname]) => {
      //UPDATE POSTGRESS
      addCustomerToDb(firstname, lastname)
  })
  .catch((error) => {
    console.error('ERROR:', error);
  });
}

function get(name) {
  //1 GET FROM MEMCACHED IF STORED
  //  IF NOT IN MEMCACHED THEN >
  //2 GET FROM DATABASE
  //3 PUT INTO MEMCACHED
}

function getAllRecords(callback) {
  const LISTA = [];
  getAllFromDb((err, result) => {
    if (err) {
      console.error('Error:', err);
      callback(err, null);  
    } else {
      LISTA.push(...result);
      callback(null, LISTA);
    }
  });
}




module.exports = {
  save,
  get,
  getAllRecords
};



// TESTING
//
// MEMCACHED
// addToMemcachedOne('bartek',900)
// addToMemcachedFew('bartek','greg',900)
// getFromMemcached('bartek')
//
// RABBITMQ
// createQueueAndSendMessage('moja_kolejka', 'Smieszna wiadomość');
// consumeMessages('moja_kolejka');
//
// POSTGRES
// queryDatabase()
// addCustomerToDb('klaudia','podw')


save('piri','dssssdf')
//getAll()