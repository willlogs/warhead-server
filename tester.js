const net = require('net');

const c1 = net.createConnection(3000, '127.0.0.222', () => {
    console.log("connected");
});

const c2 = net.createConnection(3000, '127.0.0.222', () => {
    console.log("connected");
});