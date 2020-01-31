const Node = require('./Node').Node;
const Modes = require('./Modes');

class Converter extends Node{
    constructor(id, index, nMode){
        super(id, index);
        if(nMode == "automatic"){
            this.nmode = Modes.NodeModes.auto;
        }
        else{
            this.nmode = Modes.NodeModes.passive;
        }
        
        this.ppmode = Modes.PushPullMode.pull;
        this.pmode = Modes.PModes.all;
        this.amount = 0;
        this.enabled = true;

        this.init();
    }

    activate(){
        if(this.enabled){
            let efficient = true;
            if(this.pmode == Modes.PModes.amount){
                this.incomingConnections.forEach(c => {
                    if(c.isTransferer){
                        if(c.from.amount < c.amount){
                            efficient = false;
                            break;
                        }
                    }
                });
            }

            if(efficient){
                this.incomingConnections.forEach(c => {
                    c.from.amount -= c.amount;
                    this.amount += c.amount;
                });

                this.connections.forEach(c => {
                    c.activate();
                });
            }
        }
    }

    reverseActivation(){

    }

    effect(amount){
        //nothing!
    }
}

module.exports = { Converter };