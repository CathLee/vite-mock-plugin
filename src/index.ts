/*
 * @Date: 2024-05-11 21:46:03
 * @Description: 
 */

import { createMockServerPlugin } from "./createMockServerPlugin";

export function createMockServer (opt){
    return {
        configureServer:createMockServerPlugin(opt)
    }
}
