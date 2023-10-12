import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log("EVENT: \n", JSON.stringify(event, null, 2));

  // set a datadog span custom tag
  // const span = tracer.scope().active();
  //span.setTag("custom_tag", "custom_value");

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      Hello: `Invoice 💸`,
    }),
  };

  return response;
};
