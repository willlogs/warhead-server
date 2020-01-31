const cnslcolors = require('../../../terminalColors').Colors;
const designObj = require('../../../utils/design.json');
const Machinations = require('../Machinations/Machinations').Machinations;
const Modes = require('../Machinations/Components/Nodes/Modes');

const fs = require('fs');
const xml = require('xml-reader');

const reader = xml.create();

let GamesCount = 0;
let gameMade = false;

class Game{
    constructor(connections){
        this.connections = connections;
        this.id = GamesCount++;

        this.connections.forEach(c => {
            c.isInGame = true;
        });

        reader.on('done', (data) => {
            // do whatever with the data
            this.Mach = new Machinations(data, this);
            gameMade = true;
        });

        fs.readFile(__dirname + '/../../../utils/design.xml', 'utf8',function(err, data) {
            reader.parse(data);
        });

        console.log(cnslcolors.FgYellow + "> Game created for 2" + cnslcolors.FgWhite);
    }

    update(pools){
        console.log(pools);
    }
}

module.exports = {Game};