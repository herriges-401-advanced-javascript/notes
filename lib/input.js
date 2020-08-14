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
            l: 'list',
            list: 'list',
            d: 'delete',
            delete: 'delete',
        };
        
        let arg = Object.keys(args).filter(arg => argsMap[arg])[0]; // grab array of keys from parameter "args" with Object.key(obj) and filter through that array, returning where the parameter matches with something in argsMap. Because filter returns an array, specify the first index ([0]) and assign that to variable "arg";
        const category = typeof args.l === 'string' || typeof args.list === 'string' ? args.l || args.list : undefined;
        
        return {
            action: argsMap[arg],  // assign action with the property of argsMap with a key of arg that we defined earlier with the filter method
            payload: args[arg],    // assign payload with the property of object args brought in with a parameter with a key of arg that we defined earlier with the filter method
            category,
        }
    }

    valid(){
        if (!this.command.action) { return false; }
        if ( this.command.action === 'add') {
            if(!this.command.payload){
                return false;
            }
            if (typeof this.command.payload === 'boolean'){
                return false;
            }
        }
        if ( this.command.action === 'delete'){
            if(!this.command.payload){
                return false;
            }
        }
        return true;
        
    }
}

module.exports = Input;
