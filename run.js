const {processInput} = require('./process');

let bus = null

// Init stdin listener
const stdin = process.openStdin();
stdin.addListener("data", function(input) {
    bus = processInput(bus, input.toString().trim().split(' '));
});