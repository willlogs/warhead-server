const Node = require('./Node').Node;
const Modes = require('./Modes');

class Source extends Node{
    constructor(id, index, nMode){
        super(id, index);
        if(nMode == "automatic"){
            this.nmode = Modes.NodeModes.auto;
        }
        else{
            this.nmode = Modes.NodeModes.passive;
        }
        this.ppmode = Modes.PushPullMode.push;
        this.enabled = true;
        this.amount = Infinity;
        
        this.init();
    }

    reverseActivation(){

    }

    effect(amount){
        //nothing!
    }
}

module.exports = { Source };