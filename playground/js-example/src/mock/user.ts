/*
 * @Date: 2024-05-11 22:43:14
 * @Description: 
 */
export default () => {
  return [
    {
      url: "/api/createUser",
      method: "post",
      response: ({ body, query }) => {
        console.log("body>>>>>>>>", body);
        console.log("query>>>>>>>>", query);

        return {
          code: 0,
          message: "ok",
          data: { a: 21, "import.meta.url": import.meta.url },
        };
      },
    },
  ];
};
