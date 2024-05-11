/*
 * @Date: 2024-05-11 22:12:35
 * @Description: 使用connect中间件实时监听开发环境的mock数据，可在chorme中查看到请求
 */
export async function createMockServer(
  opt: any = { mockPath: "mock", ignoreFile: [], configPath:'vite.mock.config' }
) {
     opt = {
        mockPath:'mock',
        ignoreFile:[],
        watchFile:true,
        ...opt
    }
}
