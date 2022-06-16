import { DynamoDB } from "aws-sdk";

const db = new DynamoDB.DocumentClient({ region: "us-east-1", endpoint: "host.docker.internal:4566" });

export const handler: any = async (
    event: any,
    context: any,
    callback: any): Promise<any> => {

    try {
      const review = await db
        .scan({
          TableName: 'CM-Table',
        })
        .promise();
      console.log(`Scan complete habibi! ${JSON.stringify(review)}`);
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