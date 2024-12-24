/*
 * @Date: 2024-06-16 11:18:58
 * @Description:
 */
export interface ViteMockOptions {
  mockPath?: string
  configPath?: string
  ignore?: []
  watchFiles?: boolean
  enable?: boolean
  logger?: boolean
  cors?: boolean
}
export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch'

export interface MockMethod {
  url: string
  method?: MethodType
  timeout?: number
  response:
    | ((opt: { [key: string]: string, body: any, query: any }) => any)
    | any
  rawResponse?: boolean
  statusCode?: number
}

export interface CreateMock {
  mockPath?: string
  configPath?: string
  ignoreFiles?: string[]
  ignore?: RegExp | ((fileName: string) => boolean)
  watchFiles?: boolean
  localEnabled?: boolean
}
