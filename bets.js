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

var REPLY_PREFIX = "sbe"; // use this if you would like to process bets from different companies using different applications

const client  = mqtt.connect(url, options)

console.log('wants to connect ')

client.on('connect', function () {

    console.log('Connected')

    // subscribe to accepted bets topic

    var betsTopic = REPLY_PREFIX+"/bet/#";
    client.subscribe(betsTopic, function (err) {

        if (!err) {
            // Publish a message to a topic
            //client.publish('test', 'Hello mqtt')
            console.log('subscribed to '+betsTopic)
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

var bet = {
    bet_id: "1",
    source: 1,
    profile_id: 1,
    ip_address: "3.45.12.34",
    stake: 10.56,
    reply_prefix: REPLY_PREFIX,
    bets: [
        {
            event_id: 12345678,
            event_type: "match",
            event_prefix: "sr",
            sport_id: 1,
            producer_id: 1,
            market_id: 1,
            outcome_id: "1",
            specifier: "",
            odds: 1.56,
        },
        {
            event_id: 12345679,
            event_type: "match",
            event_prefix: "sr",
            sport_id: 1,
            producer_id: 1,
            market_id: 2,
            outcome_id: "1",
            specifier: "",
            odds: 1.78,
        }
    ]
}

var sendBetsToMTSTopic = "mts/bet/pending"

// Send a test message with QoS of 0 to the testtopic
client.publish(sendBetsToMTSTopic, JSON.stringify(bet), { qos: 0, retain: false }, function (error) {

    if (error) {

        console.log(error)

    } else {

        console.log('Published')
    }

});

bet = {
    bet_id: "3",
    source: 1,
    profile_id: 1,
    ip_address: "3.45.12.34",
    stake: 10.56,
    reply_prefix: REPLY_PREFIX,
    bets: [
        {
            event_id: 12345678,
            event_type: "match",
            event_prefix: "sr",
            sport_id: 1,
            producer_id: 1,
            market_id: 1,
            outcome_id: "1",
            specifier: "",
            odds: 1.56,
        },
        {
            event_id: 12345679,
            event_type: "match",
            event_prefix: "sr",
            sport_id: 1,
            producer_id: 1,
            market_id: 2,
            outcome_id: "1",
            specifier: "",
            odds: 1.78,
        }
    ]
}

client.publish(sendBetsToMTSTopic, JSON.stringify(bet), { qos: 0, retain: false }, function (error) {

    if (error) {

        console.log(error)

    } else {

        console.log('Published')
    }

});

var cancelledBet = {
    bet_id: "3",
    code: 101,
    reply_prefix: REPLY_PREFIX,
}

var sendCancelBetsToMTSTopic = "mts/bet/cancel"

// Send a test message with QoS of 0 to the testtopic
client.publish(sendCancelBetsToMTSTopic, JSON.stringify(cancelledBet), { qos: 0, retain: false }, function (error) {

    if (error) {

        console.log(error)

    } else {

        console.log('Published')
    }
});

var cashoutBet = {
    bet_id: "2",
    source: 1,
    profile_id: 1,
    ip_address: "3.45.12.34",
    stake: 10.56,
    reply_prefix: REPLY_PREFIX,
    bets: [
        {
            event_id: 12345678,
            event_type: "match",
            event_prefix: "sr",
            sport_id: 1,
            producer_id: 1,
            market_id: 1,
            outcome_id: "1",
            specifier: "",
            odds: 1.56,
        },
        {
            event_id: 12345679,
            event_type: "match",
            event_prefix: "sr",
            sport_id: 1,
            producer_id: 1,
            market_id: 2,
            outcome_id: "1",
            specifier: "",
            odds: 1.78,
        }
    ]
}

var sendCashoutBetsToMTSTopic = "mts/bet/cashout"

// Send a test message with QoS of 0 to the testtopic
client.publish(sendCashoutBetsToMTSTopic, JSON.stringify(cashoutBet), { qos: 0, retain: false }, function (error) {

    if (error) {

        console.log(error)

    } else {

        console.log('Published')
    }
});



