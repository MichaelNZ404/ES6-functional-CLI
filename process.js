const closeSession = () => {
    return process.stdin.destroy()
}

const processInput = (bus, input) => {
    switch(input[0].toUpperCase()) { 
        case 'PLACE': { 
            const [x, y, direction] = input[1].split(',');
            const xValid = Number.isInteger(Number(x)) && 0 <= Number(x) && Number(x) <= 5;
            const yValid = Number.isInteger(Number(y)) && 0 <= Number(y) && Number(x) <= 5;
            const dirValid = ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(direction);
            if(xValid && yValid && dirValid){
                bus = [Number(x), Number(y), direction]
            }
            else{
                console.log("Placement invalid: " + input);
            }
            return bus;
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
                        return bus;
                    }
                    case 'SOUTH': {
                        if(bus[0] - 1 < 0){
                            throw "Move not accepted, would move bus out of bounds to position: " + [bus[0] - 1, bus[1], bus[2]];
                        }
                        bus[0] = bus[0] - 1;
                        return bus;
                    }
                    case 'EAST': {
                        if(bus[1] + 1 > 5){
                            throw "Move not accepted, would move bus out of bounds to position: " + [bus[0], bus[1] +1, bus[2]];
                        }
                        bus[1] = bus[1] + 1;
                        return bus;
                    }
                    case 'WEST': {
                        if(bus[1] - 1 < 0){
                            throw "Move not accepted, would move bus out of bounds to position: " + [bus[0], bus[1] - 1, bus[2]];
                        }
                        bus[1] = bus[1] - 1;
                        return bus;
                    }
                }
            }
            catch(error){
                console.error(error)
                return bus;
            }
        }

        case 'LEFT': {
            try{
                if(bus === null){
                    throw "Bus not initialized";
                }
                switch(bus[2].toUpperCase()) { 
                    case 'NORTH': {
                        bus[2] = 'WEST';
                        return bus;
                    }
                    case 'SOUTH': {
                        bus[2] = 'EAST';
                        return bus;
                    }
                    case 'EAST': {
                        bus[2] = 'SOUTH';
                        return bus;
                    }
                    case 'WEST': {
                        bus[2] = 'NORTH';
                        return bus;
                    }
                }
            }
            catch(error){
                console.error(error)
                return bus;
            }
        }

        case 'RIGHT': {
            try{
                if(bus === null){
                    throw "Bus not initialized";
                }
                switch(bus[2].toUpperCase()) { 
                    case 'NORTH': {
                        bus[2] = 'EAST';
                        return bus;
                    }
                    case 'SOUTH': {
                        bus[2] = 'WEST';
                        return bus;
                    }
                    case 'EAST': {
                        bus[2] = 'NORTH';
                        return bus;
                    }
                    case 'WEST': {
                        bus[2] = 'SOUTH';
                        return bus;
                    }
                }
            }
            catch(error){
                console.error(error)
                return bus;
            }
        }

        case 'REPORT': {
            try{
                if(bus === null){
                    throw "Bus not initialized";
                }
            } 
            catch(error){
                console.error(error)
                return bus;
            }
            console.log("Bus is in position: " + bus);
            return bus;
        } 
        default: { 
            console.error("Invalid command: " + input);
            return bus;
        } 
    }
}

module.exports = {processInput, closeSession};