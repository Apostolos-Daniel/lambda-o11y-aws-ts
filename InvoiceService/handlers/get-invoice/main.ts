import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log("EVENT: \n", JSON.stringify(event, null, 2));

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      Hello: `Invoice 💸`,
    }),
  };

  return response;
};
