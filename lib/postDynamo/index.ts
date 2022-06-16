import { DynamoDB } from "aws-sdk";

const db = new DynamoDB.DocumentClient({ region: "us-east-1", endpoint: "host.docker.internal:4566" });

export const handler: any = async (
  event: any,
  context: any,
  callback: any): Promise<any> => {

  const body = JSON.parse(event.body);

  console.log('body::', body);

  if (!event.body) {

    return {
      statusCode: 400,
      body: `No Body provided`,
    };
  }

  try {
    const review = await db
      .put({
        TableName: 'CM-Table',
        Item: {
          id: body.id,
          name: body.name,
          createdAt: body.createdAt
        }
      })
      .promise();
    console.log(`Post successful habibi! ${JSON.stringify(review)}`);
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(review),
    };
  } catch (e) {
    console.error("GET failed! ", e);
    return {
      statusCode: 400,
      headers: {},
      body: `Update failed: ${e}`,
    };
  }
}