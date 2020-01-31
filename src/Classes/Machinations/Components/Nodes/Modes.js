const NodeModes = {
    passive: 0,
    auto: 1,
    start: 2,
};

const PModes = {
    any: 0,
    all: 1,
}

const PushPullMode = {
    push: 0,
    pull: 1,
}

const Sequence = 1;

const NodeType = {
    Source: "Source",
    Pool: "Pool",
    Drain : "Drain",
    Converter : "Converter",
}

const Conncetions = {
    Resource: "Resource Connection",
    State: "State Connection",
}

module.exports = {
    NodeModes,
    PModes,
    PushPullMode,
    Sequence,
    NodeType,
    Conncetions,
};