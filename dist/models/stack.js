"use strict";
const stack = require('mongoose');
const stackSchema = new stack.Schema({
    image: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    }
});
module.exports = stack.model('Stacks', stackSchema);
