import {ViteMockOptions} from "./types";
import type {ResolvedConfig} from 'vite'
import path from "path";
import {bundleRequire} from "bundle-require";
import {isAbsPath} from "./utils";


const getMockConfig = async (opt: ViteMockOptions, config: ResolvedConfig) => {
    const {absConfigPath, absMockPath} = getPath(opt);
    console.log(absConfigPath, absMockPath);
    const {ignore, configPath, logger} = opt
    return await resolveModule(absConfigPath, config);
}

const resolveModule = async (absConfigPath: string, config: ResolvedConfig) => {
    /*
    * we shouldn't just use require(absConfigPath) here,
    * because it's not necessarily a CommonJS module,
    * it could also be a .mjs or even be written in TypeScript
    *  when we use plugins in vite to compile the file
    * */
    const mockData = await bundleRequire(
        {filepath: absConfigPath}
    )
    return mockData.mod
}

const getPath = (opt: ViteMockOptions) => {
    const cwd = process.cwd()
    const {mockPath, configPath} = opt
    const absConfigPath = path.resolve(cwd, configPath || '')
    const absMockPath = isAbsPath(mockPath) ? mockPath : path.resolve(cwd, mockPath || '')
    return {absConfigPath, absMockPath};
}

export const createMockServer = async (
    opt: ViteMockOptions = {mockPath: 'mock', configPath: 'vite.mock.config'},
    config: ResolvedConfig,
) => {
    opt = {
        mockPath: 'mock',
        watchFiles: true,
        configPath: 'vite.mock.config.ts',
        logger: true,
        ...opt
    }
    const mockData = await getMockConfig(opt, config)
    console.log("当前路径：", mockData);


}
