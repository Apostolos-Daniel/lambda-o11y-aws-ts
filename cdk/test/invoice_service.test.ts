import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import * as CdkApp from "../../cdk/invoice_service-stack";

// https://docs.aws.amazon.com/cdk/v2/guide/testing.html

let app: cdk.App;
let stack: cdk.Stack;
// setup test before tests with jest
beforeAll(() => {
  app = new cdk.App();
  stack = new CdkApp.InvoiceServiceStack(app, "MyTestStack");
});

// checks the stack and checks the bucket xyz exists
test("Bucket created", () => {
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::S3::Bucket", {});
});

test("GetInvoice Function created with environment set", () => {
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Lambda::Function", {
    Handler: '/opt/nodejs/node_modules/datadog-lambda-js/handler.handler'// this is because Datadog wwraps the original handler
  });
});

test("GetInvoice Function has Read/Write permissions to the bucket", () => {
  // THEN
  const template = Template.fromStack(stack);

  // 1. Given the role exists, does the role have the appropriate permissions?
  template.hasResourceProperties(
    "AWS::IAM::Role",
    Match.objectEquals({
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "sts:AssumeRole",
            Effect: "Allow",
            Principal: {
              Service: "lambda.amazonaws.com",
            },
          },
        ],
      },
      ManagedPolicyArns: [
        {
          "Fn::Join": [
            "",
            [
              "arn:",
              { Ref: "AWS::Partition" },
              ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
            ],
          ],
        },
      ],
    }),
  );

  // 2. Does the function have a service role linked to it?
  template.hasResourceProperties("AWS::Lambda::Function", {
    Role: Match.objectLike({
      "Fn::GetAtt": Match.arrayWith([
        Match.stringLikeRegexp("InvoiceHandlerServiceRole.*"),
        "Arn",
      ]),
    }),
  });
});

test("API Gateway created", () => {
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::ApiGateway::RestApi", {
    Name: "Invoice Service",
  });
});

test("GetInvoice function is attached to API Gateway", () => {
  // THEN
  const template = Template.fromStack(stack);

  template.allResources("AWS::ApiGateway::Deployment", {
    Properties: Match.objectLike({
      Description: "This service serves Invoices.",
      RestApiId: Match.objectLike({
        Ref: Match.stringLikeRegexp("Invoicesapi.*"),
      }),
    }),
    DependsOn: Match.arrayWith([
      Match.stringLikeRegexp("Invoicesapi.*"),
    ]),
  });
});


describe('DataDog CDK Integration', () => {

  test('All functions have DataDog env vars configured correctly', () => {
    // THEN
    const template = Template.fromStack(stack);

    template.allResourcesProperties('AWS::Lambda::Function', {
      Environment: Match.objectLike({
        Variables: Match.objectLike({
          DD_LAMBDA_HANDLER: "main.handler",
          DD_TRACE_ENABLED: "true",
          DD_SERVERLESS_LOGS_ENABLED: "true",
          DD_CAPTURE_LAMBDA_PAYLOAD: "true",
          DD_ENV: "sandbox",
          DD_SERVICE: "invoice-service",
          DD_VERSION: "version-todo",
          DD_SITE: "datadoghq.eu",
        })
      })
    });
  });

  test('All functions are decorated with the DataDog lambda integration', () => {
    // THEN
    const template = Template.fromStack(stack);

    template.allResourcesProperties('AWS::Lambda::Function', {
      Layers:
        Match.arrayWith([
          Match.objectLike({
            "Fn::Join": Match.arrayWith([
              "",
              Match.arrayWith(
                [
                  "arn:aws:lambda:",
                  { "Ref": "AWS::Region" },
                  ":464622532012:layer:Datadog-Extension:49"
                ]
              )
            ])
          })
        ])
    })
  });

});