# lambda-o11y-aws-ts
An example configuration for lambda observability in aws using typescript

## Tech

This example uses TypeScript, NodeJS, Lambda and CDK. 

## Purpose

The purpose of this example is to demonstrate native AWS observability for serverless.

## Getting Started

### Prerequisites

- NodeJS
- AWS CLI
- npm

### Installation

1. Install NodeJS - https://nodejs.org/en/download/

*Note* - You will need to install NodeJS version 14 or higher. A handy way to manage NodeJS versions is to use `nvm`. Set your machine to use the LTS version by running `nvm use no
de --lts`.

2. Install AWS CLI - https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

*Note* - You will need to configure your AWS CLI with your AWS account credentials.

To configure your AWS CLI, run the following command:

```bash
aws configure
```

3. Install CDK - https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

## Create a lambda using CDK

Create a CDK app using https://docs.aws.amazon.com/cdk/v2/guide/serverless_example.html. 

Create a cdk app by running the following command:

```bash
mkdir InvoiceService
cd IncomeService
cdk init app --language typescript
```

## Invoke a lambda function locally

Invoke the lamba function locally by running the following command:
