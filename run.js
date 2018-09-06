// Init stdin listener
const stdin = process.openStdin();
stdin.addListener("data", function(input) {
    processInput(input.toString().trim().split(' '));
});

let bus = null

const processInput = (input) => {
    switch(input[0].toUpperCase()) { 
        case 'PLACE': { 
            const [x, y, direction] = input[1].split(',');
            const xValid = Number.isInteger(Number(x)) && 0 <= Number(x) && Number(x) <= 5;
            const yValid = Number.isInteger(Number(y)) && 0 <= Number(y) && Number(x) <= 5;
            const dirValid = ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(direction);
            if(xValid && yValid && dirValid){
                bus = [Number(x), Number(y), direction]
                console.log("Bus set to: " + bus);
            }
            else{
                console.log("Placement invalid: " + input);
            }
            break;
        } 

        case 'MOVE': {
            try{
                if(bus === null){
                    throw "Bus not initialized";
                }
                switch(bus[2].toUpperCase()) { 
                    case 'NORTH': {
                        if(bus[0] + 1 > 5){
                            throw "Move not accepted, would move bus out of bounds to position: " + [bus[0] + 1, bus[1], bus[2]];
                        }
                        bus[0] = bus[0] + 1;
                        console.log("Bus moved " + bus[2] + " to position: " + bus);
                        break;
                    }
                    case 'SOUTH': {
                        if(bus[0] - 1 < 0){
                            throw "Move not accepted, would move bus out of bounds to position: " + [bus[0] - 1, bus[1], bus[2]];
                        }
                        bus[0] = bus[0] - 1;
                        console.log("Bus moved " + bus[2] + " to position: " + bus);
                        break;
                    }
                    case 'EAST': {
                        if(bus[1] + 1 > 5){
                            throw "Move not accepted, would move bus out of bounds to position: " + [bus[0], bus[1] +1, bus[2]];
                        }
                        bus[1] = bus[1] + 1;
                        console.log("Bus moved " + bus[2] + " to position: " + bus);
                        break;
                    }
                    case 'WEST': {
                        if(bus[1] - 1 < 0){
                            throw "Move not accepted, would move bus out of bounds to position: " + [bus[0], bus[1] - 1, bus[2]];
                        }
                        bus[1] = bus[1] - 1;
                        console.log("Bus moved " + bus[2] + " to position: " + bus);
                        break;
                    }
                }
            }
            catch(error){
                console.error(error)
            }
            break;
        }

        case 'LEFT': { 
            break; 
        }
        case 'RIGHT': { 
            break; 
        } 
        case 'REPORT': { 
            break; 
        } 
        default: { 
            console.log("Invalid command: " + input);
            break; 
        } 
    }
}