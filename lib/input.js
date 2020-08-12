'use strict';

const minimist = require('minimist');

class Input {
    constructor() {
      
        const args = minimist(process.argv.slice(2));
        this.command = this.parse(args);
      
    }

    parse(args){
        
        let argsMap = {
            a: 'add',
            add: 'add',
        };

        let arg = Object.keys(args).filter(arg => argsMap[arg])[0]; // grab array of keys from parameter "args" with Object.key(obj) and filter through that array, returning where the parameter matches with something in argsMap. Because filter returns an array, specify the first index ([0]) and assign that to variable "arg";
        return {
            action: argsMap[arg],  // assign action with the property of argsMap with a key of arg that we defined earlier with the filter method
            payload: args[arg],    // assign payload with the property of object args brought in with a parameter with a key of arg that we defined earlier with the filter method
        }
    }

    valid(){
        if( typeof this.command.payload !== 'boolean'){ // checks for whether payload is true/whether user actually typed anything for it. if the conditional resolves to true (if this.command.payload is not a boolean) return the conditional below
            return !!(this.command.action && this.command.payload); // in the class code JB used double bang here but I don't know why we need to do type conversion here as it seems to work normally w/out the double bang. *edit still can't envision an instance where it might matter to have the double bang but apparently it might come up and also it's kind of convention for vailidator functions to return booleans
        }
    }
}

module.exports = Input;
