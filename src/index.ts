/*
 * @Date: 2024-05-11 21:46:03
 * @Description:
 */

import type { Plugin, ResolvedConfig } from 'vite'
import type { ViteMockOptions } from './types'
import { createMockServer, requestMiddleware } from './createMockServer'

export function ViteMockServer(opt: ViteMockOptions): Plugin {
  let config: ResolvedConfig

  return {
    name: 'vite:mock',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig
      createMockServer(opt, config)
    },
    configureServer: async ({ middlewares }: { middlewares: any }) => {
      const middleware = await requestMiddleware(opt)

      middlewares.use(middleware)
    },
  }
}
