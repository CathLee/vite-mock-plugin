export interface ViteMockOptions {
    mockPath?: string
    configPath?: string
    ignoreFile?: []
    watchFile?: boolean
    enable?: boolean
    logger?: boolean
    cors?: boolean
}
export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';


export declare interface MockMethod {
    url: string;
    method?: MethodType;
    timeout?: number;
    response: ((opt: { [key: string]: string; body: any; query: any }) => any) | any;
}