const Modes = require('./Modes');

class Node {
    constructor(id){
        this.id = id?id:"empty id";
        this.nmode = Modes.NodeModes.passive;
        this.ppmode = Modes.PushPullMode.pull;
        this.connections = [];
    }

    init(){

    }

    activate(){
        
    }

    reverseActivation(){

    }

    effect(amount){

    }
    
    addConnection(c){
        this.connections.push(c);
        return this;
    }
}

module.exports = {
    Node
};