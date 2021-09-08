import { Response } from 'express';
import { IRequest, JsonController, JsonResponseDto, Status } from '@rafterjs/api';

export default class HealthController extends JsonController {
  public async index(request: IRequest, response: Response): Promise<void> {
    await this.render(
      request,
      response,
      new JsonResponseDto({
        status: Status.SUCCESS,
        message: 'All services are up',
      }),
    );
  }
}
