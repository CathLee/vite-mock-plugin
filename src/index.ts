/*
 * @Date: 2024-05-11 21:46:03
 * @Description:
 */

import {Plugin, resolveConfig, ResolvedConfig} from 'vite';
import {ViteMockOptions} from './types';
import {createMockServer, requestMiddleware} from "./createMockServer";

export const ViteMockServer = (opt: ViteMockOptions): Plugin => {
    let config: ResolvedConfig;
    
    return {
        name: 'vite:mock',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
            createMockServer(opt, config);
        },
        configureServer: async ({middlewares}) => {
            const middleware = await requestMiddleware(opt);
            console.log(middleware);
            
            middlewares.use(middleware);
        }
    };
};
