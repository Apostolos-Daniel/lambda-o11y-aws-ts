import { Handler } from "aws-lambda";
import { setTag } from "../../helpers";

export const handler: Handler = async (event) => {
  console.log("EVENT: \n", JSON.stringify(event, null, 2));

  // set a datadog span custom tag
  setTag("invoice_id", "some_value");

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      Hello: `Invoice 💸`,
    }),
  };

  return response;
};
