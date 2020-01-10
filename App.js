const cnslcolors = require('./terminalColors').Colors;

const net = require('net');
const PORT = 3000;

const ServerManager = require('./src/Classes/ServerManager/Manager');
const serverManager = new ServerManager.ServerManager(2);

const server = net.createServer((c) => {
    console.log(cnslcolors.FgBlue + "> new connection" + cnslcolors.FgWhite);
    serverManager.connect(c);
});

server.on('error', (err) => {
    console.log('\n\n' + err + '\n\n');
});

server.listen(PORT, '127.0.0.222', () => {
    console.log("listening on port: " + PORT);
});