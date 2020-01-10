const cnslcolors = require('../../../terminalColors').Colors;
const Game = require('../Game/Game').Game;

class ServerManager{
    constructor(maxConnections){
        this.maxConnections = maxConnections;
        this.connections = [];
        this.games = [];

        console.log(cnslcolors.FgGreen + "> Server manager created\n> Max connections: " + this.maxConnections + cnslcolors.FgWhite);
    }

    connect(connection){
        // max connections achieved
        if(this.connections.length > this.maxConnections) return;

        if(this.doesExistInList(connection)){
            console.log("> connection exists in list");
        }
        else{
            this.addToList(connection);
            connection.isInGame = false;
            let length = this.connections.length;
            if(length > 1 && !this.connections[length - 2].isInGame){
                this.games.push(
                    new Game([
                        connection,
                        this.connections[length - 2]
                    ])
                );
            }
        }
    }

    doesExistInList(connection){
        let filteredConnections = this.connections.filter(c => c == connection);
        return filteredConnections.length > 0;
    }

    addToList(connection){
        this.connections.push(connection);
    }
}

module.exports = {ServerManager};