/*
    Author: Willie
    
    An implementation of machinations for node servers
*/
const Node = require('./Components/Nodes/Node').Node;
const Pool = require('./Components/Nodes/Pool').Pool;
const Source = require('./Components/Nodes/Source').Source;
const Drain = require('./Components/Nodes/Drain').Drain;
const Converter = require('./Components/Nodes/Converter').Converter;

const Transferer = require('./Components/Connections/Transferer').Transferer;
const Effector = require('./Components/Connections/Effector').Effector;

const Modes = require('./Components/Nodes/Modes');

class Machinations{
    constructor(designObj, Game){
        // machinations constructor

        this.Nodes = [];
        this.Connections = [];

        let index = 0;
        designObj.children.forEach(child => {
            if(child.name == "node"){
                child.attributes.index = index++;
                child.attributes.id = child.attributes.caption;
                this.Nodes.push(child.attributes);
            }
            else{
                child.attributes.index = index++;
                this.Connections.push(child.attributes);
            }
        });

        this.Game = Game;

        this.Nodes.forEach(node => {
            switch(node.symbol){
                case Modes.NodeType.Source:
                    node.n = new Source(node.caption, node.index, node.activationMode);
                    break;
                case Modes.NodeType.Pool:
                    node.n = new Pool(node.caption, node.index, node.activationMode, parseInt(node.startingResources));
                    break;
                case Modes.NodeType.Drain:
                    node.n = new Drain(node.caption, node.index, node.activationMode);
                    break;
                case Modes.NodeType.Converter:
                    node.n = new Converter(node.caption, node.index, node.activationMode);
                    break;
                default:
                    node.n = new Node(node.caption, node.index, node.activationMode);
            }
        });

        this.Connections.forEach(c => {
            if(c.type == Modes.Conncetions.Resource){
                // TODO: detect if the node id doesn't exist in nodes
                c.start = parseInt(c.start);
                c.end = parseInt(c.end);

                let from_ = this.Nodes.filter(n => {return n.n.index == c.start;})[0].n;
                let to_ = this.Nodes.filter(n => {return n.n.index == c.end;})[0];
                to_ = to_.n;

                c.c = new Transferer(
                    from_,
                    to_,
                    c.amount,
                    c.id,
                    c.index,
                    c.label
                )
                
                from_.addConnection(c.c);
                to_.addOutGoingConnection(c.c);
            }
        });

        this.Connections.forEach(c => {
            if(c.type == Modes.Conncetions.State){
                // TODO: detect if the node id doesn't exist in nodes                
                let from_ = this.Nodes.filter(n => n.n.index == c.start)[0].n;
                let to_ = this.Nodes.filter(n => n.n.index == c.end);

                if(to_.length > 0){
                    to_ = to_[0].n;
                }
                else{
                    to_ = this.Connections.filter(cc => cc.id == c.to)[0].c;
                }

                c.c = new Effector(
                    from_,
                    to_,
                    c.amount,
                    c.id,
                    c.index,
                    c.label
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
        let pools = [];

        this.Nodes.forEach(node => {
            if(node.n.nmode == Modes.NodeModes.auto){
                node.n.activate();
            }
            if(node.symbol == "Pool"){
                pools.push({
                    id: node.n.id,
                    amount: node.n.amount
                });
            }
        });

        this.Game.update(pools);
    }
}

module.exports = {Machinations};