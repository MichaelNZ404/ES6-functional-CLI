var stdin = process.openStdin();

stdin.addListener("data", function(input) {
    let userInput = input.toString().trim();
    let splitInput = userInput.split(' ');
    processInput(splitInput);
});

const processInput = (input) => {
    switch(input[0].toUpperCase()) { 
        case 'PLACE': { 
            break; 
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