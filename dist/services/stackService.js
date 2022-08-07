"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStack = void 0;
const index_1 = require("../models/index");
async function createStack(stack) {
    try {
        const newStack = await new index_1.Stack(stack).save();
        return newStack ? newStack : null;
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.createStack = createStack;
