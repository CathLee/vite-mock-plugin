import { MockMethod, ViteMockOptions } from "./types";
import type { ResolvedConfig } from "vite";
import path from "path";
import { bundleRequire, JS_EXT_RE } from "bundle-require";
import { isAbsPath } from "./utils";
import fg from "fast-glob";
import chokidar from "chokidar";

const getMockConfig = async (opt: ViteMockOptions, config: ResolvedConfig) => {
  const { absConfigPath, absMockPath } = getPath(opt);
  const { ignore, configPath, logger } = opt;
  let returnData: MockMethod[] = [];
  if (configPath) {
    returnData = await resolveModule(absConfigPath, config);
    return returnData;
  }
  const mockFiles = fg.sync("**/*.ts", {
    cwd: absMockPath,
  });

  mockFiles.forEach(async (file) => {
    const absFilePath = path.resolve(absMockPath!, file);
    const res = await resolveModule(absFilePath, config);
    returnData.push(res);
  });
  return returnData;
};

// load the mjs file to the default export
// use a random path to avoid import cache
const getOutputFile = (filepath: string, format: string) => {
  const dirname = path.dirname(filepath);
  const basename = path.basename(filepath);
  const randomname = `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;
  return path.resolve(
    dirname,
    `_${basename.replace(
      JS_EXT_RE,
      `.bundled_${randomname}.${format === "esm" ? "mjs" : "cjs"}`
    )}`
  );
};

const resolveModule = async (absConfigPath: string, config: ResolvedConfig) => {
  /*
   * we shouldn't just use require(absConfigPath) here,
   * because it's not necessarily a CommonJS module,
   * it could also be a .mjs or even be written in TypeScript
   *  when we use plugins in vite to compile the file
   * */
  const res = await bundleRequire({ filepath: absConfigPath, getOutputFile });
  return res.mod.default || res.mod;
};

const getPath = (opt: ViteMockOptions) => {
  const cwd = process.cwd();
  const { mockPath, configPath } = opt;
  const absConfigPath = path.resolve(cwd, configPath || "");
  const absMockPath = isAbsPath(mockPath)
    ? mockPath
    : path.resolve(cwd, mockPath || "");
  return { absConfigPath, absMockPath };
};

export let mockData: MockMethod[] = [];

/**
 * @description 遍历mock文件创建mock服务
 * @param opt 配置的mock文件路径
 * @param config vite内部环境配置
 */
export const createMockServer = async (
  opt: ViteMockOptions = { mockPath: "mock" },
  config: ResolvedConfig
) => {
  opt = {
    mockPath: "mock",
    watchFiles: true,
    logger: true,
    ...opt,
  };
  mockData = await getMockConfig(opt, config);
  createWatch(opt, config);
};

export const requestMiddleware = (opt: ViteMockOptions) => {
  const middleware = async (
    req: {
      url?: string;
      method?: string;
    },
    res: {
      end: (arg0: string) => void;
    },
    next: {
      (): void;
    }
  ) => {
    const { url, method } = req;

    const matched = mockData.find((item) => {
      return item.url === url && item.method === method;
    });

    if (matched) {
      const { response } = matched;
      const resData = await response(req);

      res.end(JSON.stringify(resData));
    } else {
      next();
    }
  };
  return middleware;
};
// watch mock file
const createWatch = (opt: ViteMockOptions, config: ResolvedConfig) => {
  const { absConfigPath, absMockPath } = getPath(opt);
  const watchDir = [absMockPath!];
  const watcher = chokidar.watch(watchDir, {
    ignoreInitial: true,
    // ignore files generated by `bundle require`
    ignored: "**/_*.bundled_*.(mjs|cjs)",
  });
  /**
   * use chokidar to watch file change
   * because nodejs fs.watch has some bugs in some platform(eg: macos/centos)
   */
  watcher.on("all", async (event, path) => {
    if (event === "add" || event === "change") {
      mockData = await getMockConfig(opt, config);
    }
  });
};
