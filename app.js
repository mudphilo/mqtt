const mqtt = require('mqtt')
const { v4: uuidv4 } = require('uuid')

/***
 * Browser
 * This document explains how to use MQTT over WebSocket with the ws and wss protocols.
 * EMQX's default port for ws connection is 8083 and for wss connection is 8084.
 * Note that you need to add a path after the connection address, such as /mqtt.
 */
var url = 'mqtt://159.223.125.165:1883/mqtt'

//url = 'wss://feeds.stakersbet.com/mqtt'

//url = 'ws://broker.emqx.io:8083/mqtt'
/***
 * Node.js
 * This document explains how to use MQTT over TCP with both mqtt and mqtts protocols.
 * EMQX's default port for mqtt connections is 1883, while for mqtts it is 8883.
 */
// const url = 'mqtt://broker.emqx.io:1883'

// Create an MQTT client instance
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'feeds',
    password: 'feeds',
    protocolVersion: 5,
}

const client  = mqtt.connect(url, options)

console.log('wants to connect ')

client.on('connect', function () {

    console.log('Connected')

    // Subscribe to a topic
    var topic = 'feeds/#';

    client.subscribe(topic, function (err) {
        if (!err) {
            // Publish a message to a topic
            //client.publish('test', 'Hello mqtt')
            console.log('subscribed to '+topic)
        }
    })

})

client.on('reconnect', function () {

    console.log('Reconnecting...')
})

client.on('disconnect', function (packet) {
    console.log(packet)
})

client.on('offline', function () {

    console.log('offline')
})

client.on('close', function () {

    console.log('Disconnected')
})

client.on('error', function (error) {

    console.log(error)
})
// Receive messages
client.on('message', function (topic, message) {

    // message is Buffer
    var object = JSON.parse(message.toString())
    console.log(topic+" | "+message);

    //client.end()

})