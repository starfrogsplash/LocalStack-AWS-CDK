# LocalStack, AWS-CDK, API-GATEWAY, LAMBDA, SQS, SNS, DYNAMODB

It demonstrates a CDK app with an instance of a stack (`AwsCdkStack`)
Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk bootstrap`      deploy this stack to your default AWS account/region
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk destroy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `awslocal dynamodb list-tables`
cdklocal for localstack

awslocal lambda invoke --function-name AwsCdkStack-helloWorldLambda81908354-5fc8626f outfile.json

`awslocal dynamodb list-tables`
`awslocal lambda list-functions`

`awslocal logs tail /aws/lambda/AwsCdkStack-getDynamo189D0188-c9a72f32`
`awslocal logs tail /aws/lambda/AwsCdkStack-getDynamo189D0188-c9a72f32 --follow`

`aws --endpoint-url=http://localhost:4566 logs tail /aws/lambda/getDynamo --follow`
