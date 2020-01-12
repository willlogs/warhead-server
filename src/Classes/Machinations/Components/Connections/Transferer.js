const Connector = require('./Connector').Connector;

class Transferer extends Connector{
    constructor(from, to, amount = 1, id = "empty"){
        super(from, to, id);
        this.amount = amount;
        this.isTransferer = true;
    }

    activate(){
        console.log("effecting by transferer");
        this.to.effect(this.amount);
    }

    effect(amount){
        this.amount += amount;
    }
}

module.exports = {Transferer};