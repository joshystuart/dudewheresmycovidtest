import { Callback, Context } from 'aws-lambda';
import { ICovidTestingLocationsHandlerRequest } from './lib/testing-facilities/CovidTestingLocationsHandler';
import { getCovidTestingLocations } from './lib/getCovidTestingLocations';

exports.handler = function lambdaHander(event: ICovidTestingLocationsHandlerRequest, context: Context, next: Callback) {
  getCovidTestingLocations(event, context, next);
};
