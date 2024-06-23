export default [
    {
        url: '/api/createUser',
        method: 'post',
        response: ({ body }) => {
            console.log('body>>>>>>>>', body)
            return {
                code: 1,
                message: 'ok',
                message: 'ok',
                data: null,
            }
        },
    },
]
