/*
 * @Date: 2024-05-11 22:43:14
 * @Description: 
 */
export default {
    name: 'user',
    method: 'GET',
    url: '/api/user',
    response: () => {
        return {
            code: 0,
            data: {
                name: 'yosiki',
                age: 18,
            },
        };
    },
};
