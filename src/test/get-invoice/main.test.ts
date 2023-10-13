import { handler } from "../../handlers/get-invoice/main";
import { Context } from "aws-lambda";
import { setTag } from '../../helpers';
jest.mock('../../helpers');

describe("get-invoice handler", () => {

    const event = {};
    const context: Context = {} as Context;
    const callback = null;
    beforeAll(() => {
        jest.resetAllMocks();
    });

    it("returns a 200 status code", async () => {
        const response = await handler(event, context, () => callback);
        expect(response.statusCode).toEqual(200);
    });

    it("returns a body with a 'Hello' property", async () => {
        const response = await handler(event, context, () => callback);
        const body = JSON.parse(response.body);
        expect(body).toHaveProperty("Hello");
    });

    it("returns a body with a 'Hello' property containing 'Invoice'", async () => {
        const response = await handler(event, context, () => callback);
        const body = JSON.parse(response.body);
        expect(body.Hello).toContain("Invoice");
    });

    it("sets a custom tag on the datadog span", async () => {
        const response = await handler(event, context, () => callback);
        expect(setTag).toHaveBeenCalledWith('invoice_id', "some_value");
    });
});
