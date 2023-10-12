import { handler } from "../../handlers/get-invoice/main";
import { Context } from "aws-lambda";

describe("get-invoice handler", () => {

it("returns a 200 status code", async () => {
    const event = {};
    const context: Context = {} as Context;
    const callback = null;
    const response = await handler(event, context, () => callback);
    expect(response.statusCode).toEqual(200);
});

it("returns a body with a 'Hello' property", async () => {
    const event = {};
    const context: Context = {} as Context;
    const callback = null;
    const response = await handler(event, context, () => callback);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("Hello");
});

it("returns a body with a 'Hello' property containing 'Invoice'", async () => {
    const event = {};
    const context: Context = {} as Context;
    const callback = null;
    const response = await handler(event, context, () => callback);
    const body = JSON.parse(response.body);
    expect(body.Hello).toContain("Invoice 💸");
});
});