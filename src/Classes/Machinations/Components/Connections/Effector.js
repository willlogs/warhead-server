const Connector = require('./Connector').Connector;

class Effector extends Connector{
    constructor(from, to, amount = 1, id = "empty"){
        super(from, to, id);
        this.amount = amount;
        this.isTransferer = false;
        this.activator = 0;

        this.init();
    }

    init(){
        // TODO: activation and reverse activation mode of effectors
        if(this.activator != 0){
            this.to.enabled = false;
        }
    }

    activate(delta){
        console.log("effecting by transferer");
        this.to.effect(this.amount * delta);
    }

    effect(amount){
        this.amount += amount;
    }
}

module.exports = {Effector};