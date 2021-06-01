import { rafterLambda } from '@rafterjs/lambda';
import { Callback, Context } from 'aws-lambda';
import { logger } from '@rafterjs/logger-plugin';
import { join } from 'path';
import {
  CovidTestingLocationsHandler,
  ICovidTestingLocationsHandlerRequest,
} from './testing-facilities/CovidTestingLocationsHandler';

const paths = [join(__dirname, `../{lib,config}/**/`)];

export async function getCovidTestingLocations(
  event: ICovidTestingLocationsHandlerRequest,
  context: Context,
  next: Callback,
): Promise<void> {
  return rafterLambda(
    {
      paths,
      logger,
    },
    (covidTestingLocationsHandler: CovidTestingLocationsHandler) => async () => {
      logger.info('this is the lambda method');

      await covidTestingLocationsHandler.handle(event, context, next);
    },
  );
}
