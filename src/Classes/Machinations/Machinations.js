/*
    Author: Willie
    
    An implementation of machinations for node servers
*/
const Pool = require('./Components/Nodes/Pool').Pool;
const Source = require('./Components/Nodes/Source').Source;

const Transferer = require('./Components/Connections/Transferer').Transferer;
const Effector = require('./Components/Connections/Effector').Effector;

const Modes = require('./Components/Nodes/Modes');

class Machinations{
    constructor(Nodes, Connections, Game){
        // machinations constructor
        this.Nodes = Nodes;
        this.Connections = Connections;
        this.Game = Game;

        Nodes.forEach(node => {
            switch(node.type){
                case Modes.NodeType.Source:
                    node.n = new Source(node.id);
                    break;
                case Modes.NodeType.Pool:
                    node.n = new Pool(node.id);
                    break;
            }
        });

        Connections.forEach(c => {
            if(c.tr){
                // TODO: detect if the node id doesn't exist in nodes
                let from_ = Nodes.filter(n => n.id == c.from)[0].n;

                c.c = new Transferer(
                    from_,
                    Nodes.filter(n => n.id == c.to)[0].n,
                    c.amount,
                    c.id
                )
                
                from_.addConnection(c.c);
            }
        });

        Connections.forEach(c => {
            if(!c.tr){
                // TODO: detect if the node id doesn't exist in nodes                
                let from_ = Nodes.filter(n => n.id == c.from)[0].n;

                let to_ = Nodes.filter(n => n.id == c.to)[0];
                if(to_){
                    to_ = to_[0];
                }
                else{
                    to_ = Connections.filter(cc => cc.id == c.to)[0].c;
                }

                c.c = new Effector(
                    from_,
                    to_,
                    c.amount,
                    c.id,
                )

                from_.addConnection(c.c);
            }
        });

        this.init();
    }

    init(){
        setInterval(() => {
            this.update();
        }, Modes.Sequence * 1000);
    }

    update(){
        this.Nodes.forEach(node => {
            if(node.n.nmode == Modes.NodeModes.auto){
                node.n.activate();
            }
        });

        this.Game.update();
    }
}

module.exports = {Machinations};