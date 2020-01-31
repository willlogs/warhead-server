class Connector{
    constructor(from, to, id = "empty", index){
        this.from = from;
        this.to = to;
        this.id = id;
        this.index = index;
    }
}

module.exports = {Connector};