/*
 * @Date: 2024-06-23 11:05:50
 * @Description:
 */
export default () => {
  return [
    {
      url: '/api/createUser',
      method: 'post',
      response: () => {
        return {
          code: 0,
          message: 'ok',
          data: { 'a': 21, 'import.meta.url': '/api/createUser' },
        }
      },
    },
  ]
}
