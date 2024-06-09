import bodyParser from 'koa-bodyparser';
import { createMockServer } from './createMockServer';

export const createMockServerPlugin = (opt)=>{
    return ({app})=>{
        app.use(bodyParser())
        createMockServer(opt)
        // todos:完成mock request中间件
    }
}