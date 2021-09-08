/* eslint-disable import/named,@typescript-eslint/no-empty-function */
// @ts-ignore
import { handler } from './index';

export const context = {
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

const next = (data: any) => {
  console.log(data);
};

handler({}, context, next);
