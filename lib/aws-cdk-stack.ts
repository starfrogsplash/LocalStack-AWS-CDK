import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs';

export class AwsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'AwsCdkQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'AwsCdkTopic');
    topic.addSubscription(new subs.SqsSubscription(queue));

      const table = new dynamodb.Table(this, 'CM-Table', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
        sortKey: {name: 'createdAt', type: dynamodb.AttributeType.STRING},
        readCapacity: 1,
        writeCapacity: 1,
        tableName: 'CM-Table'
      });

     const lambdaHello = new NodejsFunction(this, 'helloWorldLambda', {
        entry: './lib/helloWorldLambda/index.ts', 
        handler: 'handler'
      });

      const lambdadbGet = new NodejsFunction(this, 'getDynamo', {
        entry: './lib/getDynamo/index.ts', 
        handler: 'handler', 
      });


      table.grantReadData(lambdadbGet);

      const api = new RestApi(this,'api',{})

      const lambdaIntegration = new LambdaIntegration(lambdaHello)
      const lambdaIntegrationA = new LambdaIntegration(lambdadbGet)
      
      const lambdaResource = api.root.addResource('hello')
      lambdaResource.addMethod("GET", lambdaIntegration)

      const lambdaResourceA = api.root.addResource('dynamo')
      lambdaResourceA.addMethod("GET", lambdaIntegrationA)

      new CfnOutput(this, "table name 👉", { value: `${table.tableName}` })
      new CfnOutput(this, "table arn 👉", { value: `${table.tableArn}` })
      new CfnOutput(this, "Hello-Endpoint", { value: `http://localhost:4566/restapis/${api.restApiId}/prod/_user_request_${lambdaResource.path}` })
      new CfnOutput(this, "Dynamo-Endpoint", { value: `http://localhost:4566/restapis/${api.restApiId}/prod/_user_request_${lambdaResourceA.path}` })
  }
}


