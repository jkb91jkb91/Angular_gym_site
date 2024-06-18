
const amqp = require('amqplib');

const rmq_config = {
    host: "my_rb",
    user: "user",
    password: "password",
    port: "5672",
    vh: "my_vhost"
  };

  // RABBITMQ
  //
  // "amqplib": "^0.8.0"
  // HOW TO TEST CONNECTION
  // GO INTO ANGULAR UBUNTU CONTAINER > docker exec -it ANGULAR_CONTAINER /bin/bash
  // INSTALL amqp tools               > apt-get update > apt-get install amqp-tools 
  // amqp-declare-queue -u amqp://user:password@my_rb:5672/my_vhost -q moja_kolejka
  // amqp-publish -u amqp://user:password@my_rb:5672/my_vhost -r moja_kolejka -b 'Testowa wiadomosc’
  //
  // GO INTO RABBITMQ CONTAINER       > docker exec -it RABBITMQ_CONTAINER /bin/bash
  // check ques                       > rabbitmqctl list_queues -p my_vhost
  // GET QUEUE                        > rabbitmqadmin --username=user --password=password get queue=moja_kolejka --vhost=my_vhost
  // DELETE QUEUE                     > rabbitmqadmin --username=user --password=password -V my_vhost delete queue name=moja_kolejka
  

async function createQueueAndSendMessages(queueName, message1, message2) {
  try {
    const conn = await amqp.connect({
      protocol: 'amqp',
      hostname: rmq_config.host,
      port: parseInt(rmq_config.port),
      username: rmq_config.user,
      password: rmq_config.password,
      vhost: rmq_config.vh,
    });

    const channel = await conn.createChannel();
    await channel.assertQueue(queueName, {
      durable: true,
    });

    const batchMessage = `${message1},${message2}`;
    channel.sendToQueue(queueName, Buffer.from(batchMessage));
    console.log('\x1b[32m%s\x1b[0m',`RABBITMQ:SUCCESS create queue: ${queueName}, message: ${batchMessage}`);

    await channel.close();
    await conn.close();
  } catch (error) {
    console.error('Error in createQueueAndSendMessages:', error);
  }
}

async function consumeQueueAndSaveToDb(queueName) {
  try {
    const conn = await amqp.connect({
      protocol: 'amqp',
      hostname: rmq_config.host,
      port: parseInt(rmq_config.port),
      username: rmq_config.user,
      password: rmq_config.password,
      vhost: rmq_config.vh,
    });

    const channel = await conn.createChannel();
    await channel.assertQueue(queueName, {
      durable: true,
    });

    return new Promise((resolve, reject) => {
      channel.consume(queueName, (msg) => {
        if (msg) {
          const messageContent = msg.content.toString();
          const [firstname, lastname] = messageContent.split(',');
          console.log('\x1b[32m%s\x1b[0m','RABBITMQ:SUCCESS consume:', firstname,lastname);
          resolve([firstname, lastname]);
          channel.ack(msg);
          channel.close();
          conn.close();
        }
      }, {
        noAck: false
      });
    });

    console.log(`Oczekiwanie na wiadomości w kolejce: ${queueName}. Aby wyjść, naciśnij CTRL+C`);
  } catch (error) {
    console.error('Error in consumeQueueAndSaveToDb:', error);
    reject(error); 
  }
}

module.exports = {
    createQueueAndSendMessages,
    consumeQueueAndSaveToDb
};