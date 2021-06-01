import { Request, Response } from 'express';
import {
  BadRequestError,
  IJsonResponseData,
  IRequest,
  JsonController,
  JsonErrorResponseDto,
  JsonResponseDto,
  JsonResponseTransformer,
  Status,
} from '@rafterjs/api';
import { ILogger } from '@rafterjs/logger-plugin';
import {
  CovidTestingLocationsHandler,
  ICovidTestingLocationsHandlerRequest,
} from '../lib/testing-facilities/CovidTestingLocationsHandler';
import { context } from './Context';

type RequestQuery = {
  latitude: number;
  longitude: number;
};

/**
 * This is a way we can adapt the aws lambda and run it locally as an api
 */
export default class CovidTestingFacilitiesController extends JsonController {
  constructor(
    protected readonly jsonResponseTransformer: JsonResponseTransformer,
    protected readonly covidTestingLocationsHandler: CovidTestingLocationsHandler,
    private readonly logger: ILogger,
  ) {
    super(jsonResponseTransformer);
  }

  public async index(request: IRequest & Request<any, any, any, RequestQuery>, response: Response): Promise<void> {
    const { latitude, longitude } = request.query;
    this.logger.debug(`Proxying api request through to the lambda helper for ${longitude}, ${latitude}`);

    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
      const event: ICovidTestingLocationsHandlerRequest = {
        latitude,
        longitude,
      };

      await this.covidTestingLocationsHandler.handle(event, context, (error, data) => {
        if (error) {
          const errorMessage = error instanceof Error ? error.message : error.toString();
          this.renderError(
            request,
            response,
            new JsonErrorResponseDto({
              errors: [new BadRequestError(errorMessage)],
              status: Status.BAD_REQUEST,
            }),
          );
        } else {
          this.render(
            request,
            response,
            new JsonResponseDto({
              data: data?.data,
              status: Status.SUCCESS,
            }),
          );
        }
      });
    } else {
      this.renderError(
        request,
        response,
        new JsonErrorResponseDto({
          errors: [new BadRequestError('Please provide your latitude and longitude')],
          status: Status.BAD_REQUEST,
        }),
      );
    }
  }
}
