import {Stack} from '../models/admin.model'
import { IStack } from '../typings'
export async function createStack(stack: IStack){
    try{
        const newStack = await new Stack(stack).save()
        return newStack ? newStack : null 
    }
    catch(err){ console.log(err.message)}
}