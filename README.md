# LocalStack, AWS-CDK, API-GATEWAY, LAMBDA, SQS, SNS, DYNAMODB, DOCKER

# Severless api

It demonstrates a CDK app with an instance of a stack (`AwsCdkStack`)
A serverless api, (`api gateway`, with `lambda` sending and insert data to `dynamo db`)
and an Amazon SQS queue that is subscribed to an Amazon SNS topic.

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

## localstack cdk
* `cdklocal bootstrap`
* `cdklocal deploy`
* `cdklocal destroy`

awslocal lambda invoke --function-name AwsCdkStack-helloWorldLambda81908354-5fc8626f outfile.json

`awslocal dynamodb list-tables`
`awslocal lambda list-functions` - details of the lambda func, policy, runtime etc
`awslocal cloudformation list-stacks`


`awslocal logs tail /aws/lambda/{lambdaFncName}` - lambda logs
e.g awslocal logs tail 
`awslocal logs tail /aws/lambda/AwsCdkStack-getDynamo189D0188-3499c5af`


`awslocal logs tail /aws/lambda/AwsCdkStack-getDynamo189D0188-a03765a7 --follow` - lambda logs follow

`aws --endpoint-url=http://localhost:4566 logs tail /aws/lambda/{lambdaFncName} --follow`

`awslocal logs tail /aws/lambda/AwsCdkStack-getDynamo189D0188-a03765a7 --follow`

`awslocal logs describe-log-groups`


```
docker stats - to show memory usage
```