/*
 * @Date: 2024-05-11 22:43:14
 * @Description:
 */
export default {
  name: 'user',
  method: 'GET',
  url: '/api/idols',
  response: () => {
    return {
      code: 0,
      data: [
        {
          name: 'BwooYouxi',
          age: 18,
        },
        {
          name: 'LiYue',
          age: '24',
        },
      ],
    }
  },
}
