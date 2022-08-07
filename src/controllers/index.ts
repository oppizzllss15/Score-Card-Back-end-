import {Request, Response} from 'express'
import { createStack } from '../services/stackService';
import { IStack } from "../typings";

export async function addStack(req: Request, res: Response) {
    const stack: IStack = req.body
    const newStack = await createStack(stack);
    if(newStack) return res.status(200).send({"stack": newStack, "message": "success"})
    return res.status(400).send({"message": "unable to create stack"})
}
