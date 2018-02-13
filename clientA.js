#!/usr/bin/env node
var dgram = require('dgram');

// based on http://www.bford.info/pub/net/p2pnat/index.html



var socket = dgram.createSocket('udp4');

var conf = require('./conf')

socket.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    try{
    	var publicEndpointB = JSON.parse(message);
    	sendMessageToB(publicEndpointB.address, publicEndpointB.port);
    }catch(err) {}
});

function sendMessageToS () {

	var message = new Buffer('A');
	socket.send(message, 0, message.length, conf.port, conf.host, function (err, nrOfBytesSent) {
	    if (err) return console.log(err);
	    console.log('UDP message sent to ' + conf.host +':'+ conf.port);
	    // socket.close();
	});
}

sendMessageToS();

var counter = 0;
function sendMessageToB (address, port) {
	if(counter == 5) return;
	var message = new Buffer(counter++ + ': Hello B!');
	socket.send(message, 0, message.length, port, address, function (err, nrOfBytesSent) {
	    if (err) return console.log(err);
	    console.log('UDP message sent to B:', address +':'+ port);

	    setTimeout(function () {
	    	sendMessageToB(address, port);
	    }, 2000);
	});
}


