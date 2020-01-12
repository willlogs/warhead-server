const Node = require('./Node').Node;
const Modes = require('./Modes');

class Source extends Node{
    constructor(id){
        super(id);
        this.ppmode = Modes.PushPullMode.push;
        this.nmode = Modes.NodeModes.auto;
        this.enabled = true;

        console.log("new source created");
        this.init();
    }

    activate(){
        if(this.enabled){
            console.log("source activated");
            this.connections.forEach(c => {
                if(c.isTransferer){
                    console.log("calling transferer");
                    c.activate();
                }
            });
        }
    }

    reverseActivation(){

    }
}

module.exports = { Source };