/*
    Author: Willie
    
    This is the class that manages the connections to the server
*/

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

            // TODO: dynamic game allocation for n connections
            // static game creation for each 2 connections
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

    // checks if the connection exists in the list
    doesExistInList(connection){
        let filteredConnections = this.connections.filter(c => c == connection);
        return filteredConnections.length > 0;
    }

    // adds connection to the list
    addToList(connection){
        this.connections.push(connection);
    }
}

module.exports = {ServerManager};