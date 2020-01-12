const Modes = require('../Components/Nodes/Modes');

// TODO: add all properties so we can define them all here
const Nodes = [
    {
        id: "pool1",
        type: Modes.NodeType.Pool,
    },
    {
        id: "pool2",
        type: Modes.NodeType.Pool,
    },
    {
        id: "source1",
        type: Modes.NodeType.Source,
    },

];

const Connections = [
    {
        tr: true,
        amount: 1,
        id: "tr0",
        to: "pool1",
        from: "source1",
    },
    {
        tr: true,
        amount: 3,
        id: "tr1",
        to: "pool2",
        from: "source1",
    },
    {
        tr: false,
        amount: 1,
        id: "e0",
        to: "tr0",
        from: "pool1",
    }
]

module.exports = {Nodes, Connections};