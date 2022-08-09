"use strict";
const Stack = require("../models/stack");
const getUserStack = async (id) => {
    const stackName = await Stack.findById(id);
    return stackName.name;
};
module.exports = { getUserStack, };
