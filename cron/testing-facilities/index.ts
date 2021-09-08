import { Callback, Context } from 'aws-lambda';
import { updateTestingFacilities } from './lib/updateTestingFacilities';
import { ITestingFacilitiesCronHandlerRequest } from './lib/TestingFacilitiesCronHandler';

exports.handler = async function lambdaHander(
  event: ITestingFacilitiesCronHandlerRequest,
  context: Context,
  next: Callback,
) {
  return updateTestingFacilities(event, context, next);
};
