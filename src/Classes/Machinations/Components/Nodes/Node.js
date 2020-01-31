const Modes = require('./Modes');

class Node {
    constructor(id, index){
        this.id = id?id:"empty id";
        this.index = index;
        this.ppmode = Modes.PushPullMode.pull;
        this.pmode = Modes.PModes.any;
        this.amount = 0;
        this.connections = [];
        this.incomingConnections = [];
        this.workingConnections = this.connections;
    }

    init(){
        console.log(this.id + " init " + this.index);
        if(this.ppmode == Modes.PushPullMode.pull){
            this.workingConnections = this.incomingConnections;
        }
        else{
            this.workingConnections = this.connections;
        }
    }

    activate(){
        //let usingConnections = this.ppmode == Modes.PushPullMode.pull ?
        if(this.enabled){
            this.workingConnections.forEach(c => {
                if(c.isTransferer){
                    c.activate();
                }
            });
        }        
    }

    reverseActivation(){

    }

    effect(amount){        
        if(this.enabled){
            this.amount += amount;

            this.effectEvent(amount);
        }
    }
    
    addConnection(c){
        if(!c) return;
        this.connections.push(c);
    }

    addOutGoingConnection(c){
        if(!c) return;
        this.incomingConnections.push(c);
    }
}

module.exports = {
    Node
};