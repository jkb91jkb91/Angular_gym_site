const Memcached = require('memcached');
let memcached = new Memcached('memcached:11211');

// MEMCACHED
//
// "memcached": "^2.2.2",
// HOW TO TEST CONNECTION
// CONNECT TO MEMCACHED SERVICE> telnet localhost 11211   # do it from your host, from inside >> telnet memcached 11211 
// SET VALUE                   > set keykuba 0 900 4    > kuba greg
// GET VALUE                   > get keykuba 
// ESCAPE                      > quit

function addToMemcachedone(name, time) {
    // simple query with only one value
    const mem_key = "key" + name;
    console.log(mem_key);
    memcached.set(mem_key, name, time, (err) => {
      if (err) {
        console.error('Memcached error:', err);
      } else {
        console.log('Value stored successfully');
      }
    });
  }
  
  function addToMemcachedFew(name, lastname, time) {
    // more advanced with 2 values stored
    const mem_key = "key" + name;
    console.log(mem_key);
    
    const valueToStore = { name: name, lastname: lastname };
  
    memcached.set(mem_key, valueToStore, time, (err) => {
      if (err) {
        console.error('Memcached error:', err);
      } else {
        console.log('Value stored successfully');
      }
    });
  }
  
  function getFromMemcached(name, callback) {
    const mem_key = "key" + name;
    console.log(mem_key);
  
    memcached.get(mem_key, (err, data) => {
      if (err) {
        console.error('Memcached error:', err);
        callback(err, null);
      } else {
        console.log('Data retrieved successfully:', data);
        callback(null, data);
      }
    });
  }

module.exports = {
    addToMemcachedFew,
    getFromMemcached
};