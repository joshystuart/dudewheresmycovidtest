import { rafterLambda } from '@rafterjs/lambda';
import { Callback, Context } from 'aws-lambda';
import { logger } from '@rafterjs/logger-plugin';
import { join } from 'path';
import { TestingFacilitiesCronHandler, ITestingFacilitiesCronHandlerRequest } from './TestingFacilitiesCronHandler';

const paths = [join(__dirname, `../{lib,config}/**/`)];

export async function updateTestingFacilities(
  event: ITestingFacilitiesCronHandlerRequest,
  context: Context,
  next: Callback,
): Promise<void> {
  return rafterLambda(
    {
      paths,
      logger,
    },
    (testingFacilitiesCronHandler: TestingFacilitiesCronHandler) => async () => {
      logger.info('Running the updateTestingFacilities lambda');

      await testingFacilitiesCronHandler.handle(event, context, next);
    },
  );
}
