import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as Invoice_service from "../lib/invoice_service";

export class InvoiceServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Invoice_service.InvoiceService(this, "Invoices");
  }
}
