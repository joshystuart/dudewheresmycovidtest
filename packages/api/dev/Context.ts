/* eslint-disable @typescript-eslint/no-empty-function */
import { Context } from 'aws-lambda';

// a dummy context to use locally
export const context: Context = {
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '',
  done(error?: Error, result?: any): void {},
  fail(error: Error | string): void {},
  getRemainingTimeInMillis(): number {
    return 0;
  },
  succeed(message: any, object?: any): void {},
};
