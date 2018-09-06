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
                console.log("Placement successful: " + input);
            }
            else{
                console.log("Placement invalid: " + input);
            }
        } 
        case 'MOVE': { 
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