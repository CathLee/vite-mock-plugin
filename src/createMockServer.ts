import {MockMethod, ViteMockOptions} from "./types";
import type {ResolvedConfig} from 'vite'
import path from "path";
import {bundleRequire} from "bundle-require";
import {isAbsPath} from "./utils";
import fg from 'fast-glob'


const getMockConfig = async (opt: ViteMockOptions, config: ResolvedConfig) => {
    const {absConfigPath, absMockPath} = getPath(opt);
    const {ignore, configPath, logger} = opt
    console.log(absMockPath)
    let returnData: MockMethod[] = []
    if (configPath) {
        returnData = await resolveModule(absConfigPath, config);
        return returnData
    }
    const mockFiles = fg.sync('**/*.ts', {
        cwd: absMockPath,
    });

    console.log('mockFiles', mockFiles);
    
    mockFiles.forEach(async (file) => {
        const absFilePath = path.resolve(absMockPath!, file)
        const res = await resolveModule(absFilePath, config);
        returnData.push(res)
        console.log('returnData', returnData);
    })
    
    return returnData
}

const resolveModule = async (absConfigPath: string, config: ResolvedConfig) => {
    /*
    * we shouldn't just use require(absConfigPath) here,
    * because it's not necessarily a CommonJS module,
    * it could also be a .mjs or even be written in TypeScript
    *  when we use plugins in vite to compile the file
    * */
    const res = await bundleRequire(
        {filepath: absConfigPath}
    )
    console.log('res.mod。default', res.mod.default);
    console.log('res.mode', res.mod.mod);
    
    return res.mod.default||res.mod
}

const getPath = (opt: ViteMockOptions) => {
    const cwd = process.cwd()
    const {mockPath, configPath} = opt
    const absConfigPath = path.resolve(cwd, configPath || '')
    const absMockPath = isAbsPath(mockPath) ? mockPath : path.resolve(cwd, mockPath || '')
    return {absConfigPath, absMockPath};
}

export let mockData: MockMethod[] = []

/**
 * @description 遍历mock文件创建mock服务
 * @param opt 配置的mock文件路径
 * @param config vite内部环境配置
 */
export const createMockServer = async (
    opt: ViteMockOptions = {mockPath: 'mock'},
    config: ResolvedConfig,
) => {
    opt = {
        mockPath: 'mock',
        watchFiles: true,
        logger: true,
        ...opt
    }
    mockData = await getMockConfig(opt, config)
    console.log('mockData', mockData);
    
}

export const requestMiddleware = (opt: ViteMockOptions) => {
    const middleware = async (req: any, res: any, next: any) => {
        const {url='/api/user', method='GET'} = req
        console.log(mockData);
        
        const matched = mockData.find((item) => {
            console.log('item', item.url, item.method);
                        console.log('url', url, method);
                        
            return item.url === url && item.method === method
        })
        console.log('matched', matched);
        
        
       
        
        if (matched) {
            console.log('matched', matched);
            const {response} = matched
            const resData = await response(req)
            console.log('resData', resData);
            
            res.end(JSON.stringify(resData))
        } else {
            next()
        }
    }
    return middleware
}