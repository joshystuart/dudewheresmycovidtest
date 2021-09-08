import { rafterLambda } from '@rafterjs/lambda';
import { Callback, Context } from 'aws-lambda';
import { logger } from '@rafterjs/logger-plugin';
import { join } from 'path';
import { IDhhsVictoriaWebsiteDataEtlHandlerRequest, WaitTimeCronHandler } from './WaitTimeCronHandler';

const paths = [join(__dirname, `../{lib,config}/**/`)];

export async function updateWaitTimes(
  event: IDhhsVictoriaWebsiteDataEtlHandlerRequest,
  context: Context,
  next: Callback,
): Promise<void> {
  return rafterLambda(
    {
      paths,
      logger,
    },
    (waitTimeCronHandler: WaitTimeCronHandler) => async () => {
      logger.info('Running the updateWaitTimes lambda');

      await waitTimeCronHandler.handle(event, context, next);
    },
  );
}
