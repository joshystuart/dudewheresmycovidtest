import { Request, Response } from 'express';
import {
  BadRequestError,
  IRequest,
  JsonController,
  JsonErrorResponseDto,
  JsonResponseDto,
  JsonResponseTransformer,
  Status,
} from '@rafterjs/api';
import { ILogger } from '@rafterjs/logger-plugin';
import { Database } from '@dwmc-common/database';
import { CovidTestingLocationsDao } from './testing-facilities/CovidTestingLocationsDao';

type RequestQuery = {
  latitude: number;
  longitude: number;
  state: string;
};

/**
 * This is a way we can adapt the aws lambda and run it locally as an api
 */
export default class CovidTestingFacilitiesController extends JsonController {
  constructor(
    protected readonly jsonResponseTransformer: JsonResponseTransformer,
    protected readonly covidTestingLocationsDao: CovidTestingLocationsDao,
    private readonly database: Database,
    private readonly logger: ILogger,
  ) {
    super(jsonResponseTransformer);
  }

  public async index(request: IRequest & Request<any, any, any, RequestQuery>, response: Response): Promise<void> {
    const { latitude, longitude, state } = request.query;
    this.logger.debug(`Proxying api request through to the lambda helper for ${longitude}, ${latitude}`);

    // TODO validate the request better

    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined' && typeof state !== 'undefined') {
      const data = await this.covidTestingLocationsDao.getTestingFacilities(longitude, latitude, state);
      try {
        await this.render(
          request,
          response,
          new JsonResponseDto({
            data,
            status: Status.SUCCESS,
          }),
        );
      } catch (error) {
        await this.renderError(
          request,
          response,
          new JsonErrorResponseDto({
            errors: [new BadRequestError((error as Error).toString())],
            status: Status.BAD_REQUEST,
          }),
        );
      }
    } else {
      await this.renderError(
        request,
        response,
        new JsonErrorResponseDto({
          errors: [new BadRequestError('Please provide your latitude, longitude and state')],
          status: Status.BAD_REQUEST,
        }),
      );
    }
  }
}
