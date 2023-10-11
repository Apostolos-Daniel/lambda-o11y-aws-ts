import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";

// For AWS CDK v2
import { Datadog } from "datadog-cdk-constructs-v2";

export class InvoiceService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "InvoiceStore");

    const handler = new lambda.Function(this, "InvoiceHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("handlers/get-invoice"),
      handler: "main.handler",
      environment: {
        BUCKET: bucket.bucketName,
      },
    });

    bucket.grantReadWrite(handler);

    const api = new apigateway.RestApi(this, "Invoices-api", {
      restApiName: "Invoice Service",
      description: "This service serves Invoices.",
    });

    const getInvoicesIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    });

    api.root.addMethod("GET", getInvoicesIntegration); // GET /
    const Invoice = api.root.addResource("{id}");

    const InvoiceIntegration = new apigateway.LambdaIntegration(handler);

    Invoice.addMethod("POST", InvoiceIntegration); // POST /{id}
    Invoice.addMethod("GET", InvoiceIntegration); // GET /{id}
    Invoice.addMethod("DELETE", InvoiceIntegration); // DELETE /{id}

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: 98,
      extensionLayerVersion: 49,
      site: "datadoghq.eu",
      env: "sandbox",
      service: "invoice-service",
      version: "version-todo",
      apiKey: process.env.DD_API_KEY,
  });
    datadog.addLambdaFunctions([handler])
  }
}
