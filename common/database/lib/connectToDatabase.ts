import { ILogger } from '@rafterjs/logger-plugin';
import { Database } from './Database';

export function connect(database: Database, logger: ILogger) {
  return async function connectToDatabase(): Promise<void> {
    logger.info(`Connecting to the database`);
    await database.connect();
    await database.sync();
  };
}

export default connect;
