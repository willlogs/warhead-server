const cnslcolors = require('../../../terminalColors').Colors;

let GamesCount = 0;

class Game{
    constructor(connections){
        this.connections = connections;
        this.id = GamesCount++;

        this.connections.forEach(c => {
            c.isInGame = true;
        });

        console.log(cnslcolors.FgYellow + "> Game created for 2" + cnslcolors.FgWhite);
    }
}

module.exports = {Game};