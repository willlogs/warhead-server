const cnslcolors = require('../../../terminalColors').Colors;
const designObj = require('../Machinations/Models/MyDesign');
const Machinations = require('../Machinations/Machinations').Machinations;
const Modes = require('../Machinations/Components/Nodes/Modes');

let GamesCount = 0;

class Game{
    constructor(connections){
        this.connections = connections;
        this.id = GamesCount++;

        this.connections.forEach(c => {
            c.isInGame = true;
        });

        this.Mach = new Machinations(designObj.Nodes, designObj.Connections, this);

        console.log(cnslcolors.FgYellow + "> Game created for 2" + cnslcolors.FgWhite);
    }

    update(){
        let pools = [];
        this.Mach.Nodes.forEach(node => {
            if(node.type == Modes.NodeType.Pool){
                pools.push({
                    id: node.id,
                    amount: node.n.amount,
                });
            }
        });
        
        console.log(pools);
    }
}

module.exports = {Game};