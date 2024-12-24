/*
 * @Date: 2024-05-11 22:42:03
 * @Description: 模拟生产环境上的某些测试环境
 */
import Mock from 'mockjs'

export function createProdMockServer(mockList: []) {
  for (const { url, method, response, timeout } of mockList) {
    setupMock(timeout)
  }
}

// Configure Mock.js global mode to simulate the effect of interface latency
function setupMock(timeout = 0) {
  if (timeout) {
    Mock.setup(timeout)
  }
}
