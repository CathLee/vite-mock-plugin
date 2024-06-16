/*
 * @Date: 2024-05-11 21:46:03
 * @Description:
 */

import {Plugin, resolveConfig} from 'vite';
import {ViteMockOptions} from './types';
import {createMockServer} from "./createMockServer";

export const ViteMockServer = (opt: ViteMockOptions): Plugin => {
    const config = resolveConfig
    return {
        name: 'vite:mock',
        configResolved: createMockServer(opt,config)
    };
};
