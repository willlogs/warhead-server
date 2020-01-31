const Connector = require('./Connector').Connector;

class Transferer extends Connector{
    constructor(from, to, amount = 1, id = "empty", index, label){
        super(from, to, id, index);
        this.multiplier = 1;
        this.amount = amount;
        if(label){
            let c = label.charAt(0);
            if(c == '+' || c == '-'){
                let splitByStar = label.split(c);
                this.amount = parseInt(splitByStar[0]);
            }

            let splitByStar = label.split("*");
            if(splitByStar.length > 1){
                this.multiplier = parseInt(splitByStar[0]);
                this.amount = parseInt(splitByStar[1]);
            }
        }else{
            this.amount = amount;
            this.multiplier = 1;
        }
        this.isTransferer = true;
    }

    activate(){
        let change = this.amount * this.multiplier;
        console.log(this.amount);
        this.from.amount -= change;
        this.to.effect(change);
    }

    effect(amount, mamount){
        this.amount += amount;
        this.multiplier += mamount;
    }
}

module.exports = {Transferer};