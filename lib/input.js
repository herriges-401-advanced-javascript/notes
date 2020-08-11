'use strict';

const minimist = require('minimist');

function Input() {
    const args = minimist(process.argv.slice(2));

    if ( args.add || args.a ) {
        this.action = 'add';
        this.payload = args.add ? args.add : args.a;
    } else {
        console.log('error- please enter -a or --add as an arg');
    }
}

module.exports = Input;
