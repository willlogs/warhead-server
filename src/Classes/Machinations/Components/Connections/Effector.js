const Connector = require('./Connector').Connector;

class Effector extends Connector{
    constructor(from, to, amount = 1, id = "empty", index, label){
        super(from, to, id, index);
        if(label){
            let c = label.charAt(0);
            if(c == '+' || c == '-'){
                let splitByStar = label.split(c);
                splitByStar = splitByStar[1].split("m");
                if(splitByStar.length > 1){
                    // if it had m
                    this.mamount = splitByStar[0];
                }
                else{
                    this.amount = splitByStar[0];
                    this.mamount = 0;
                }
            }
        }
        else{
            this.amount = amount;
            this.mamount = 0;
        }
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
        this.to.effect(this.amount * delta, this.mamount);
    }

    effect(amount){
        this.amount += amount;
    }
}

module.exports = {Effector};