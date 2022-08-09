const Stack = require("../models/stack");

const getUserStack = async (id: string) => {
    const stackName = await Stack.findById(id)
    return stackName.name
}

module.exports = {getUserStack,}