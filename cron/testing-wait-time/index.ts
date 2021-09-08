import { Callback, Context } from 'aws-lambda';
import { updateWaitTimes } from './lib/UpdateWaitTimes';
import { IDhhsVictoriaWebsiteDataEtlHandlerRequest } from './lib/WaitTimeCronHandler';

exports.handler = async function lambdaHander(
  event: IDhhsVictoriaWebsiteDataEtlHandlerRequest,
  context: Context,
  next: Callback,
) {
  return updateWaitTimes(event, context, next);
};
