"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStack = void 0;
const admin_model_1 = require("../models/admin.model");
async function createStack(stack) {
    try {
        const newStack = await new admin_model_1.Stack(stack).save();
        return newStack ? newStack : null;
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.createStack = createStack;
