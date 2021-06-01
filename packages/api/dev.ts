import { Server } from '@rafterjs/api';
import { logger } from '@rafterjs/logger-plugin';
import { join } from 'path';

/**
 * This file is an entry point for local development. It will run the code in an express api rather than as
 * an AWS lambda entry point
 */
const paths = [join(__dirname, `{lib,config,dev}/**/`)];
const server = new Server({ paths });

async function run(): Promise<void> {
  try {
    logger.info(`Starting the simple rafter api`);
    await server.start();
  } catch (error) {
    logger.error(error);
    await server.stop();
    process.exit(1);
  }
}

run();
