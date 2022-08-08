"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStack = void 0;
const stackService_1 = require("../services/stackService");
async function addStack(req, res) {
    const stack = req.body;
    const newStack = await (0, stackService_1.createStack)(stack);
    if (newStack)
        return res.status(200).send({ "stack": newStack, "message": "success" });
    return res.status(400).send({ "message": "unable to create stack" });
}
exports.addStack = addStack;
