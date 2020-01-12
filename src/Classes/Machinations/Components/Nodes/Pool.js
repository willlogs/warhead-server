const Node = require('./Node').Node;
const Modes = require('./Modes');

class Pool extends Node{
    constructor(id){
        super(id);
        this.ppmode = Modes.PushPullMode.pull;
        this.nmode = Modes.NodeModes.passive;
        this.enabled = true;

        this.amount = 0;

        console.log("new pool created");
        this.init();
    }

    init(){
    }

    activate(){
        if(this.enabled){
            
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

    effectEvent(delta){
        this.connections.forEach(c => {
            if(!c.isTransferer){
                c.activate(delta);
            }
        })
    }
}

module.exports = { Pool };