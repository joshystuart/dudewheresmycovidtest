import { join } from 'path';
import { ILogger } from '@rafterjs/logger-plugin';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { NonNullFindOptions } from 'sequelize/types/lib/model';
import { IDatabaseConfig } from '../config/config';
import { TestingFacility } from './models/TestingFacility';
import { TestingWaitTime } from './models/TestingWaitTime';

export type IFindOneOptions<M extends Model> = Omit<NonNullFindOptions<M['_attributes']>, 'rejectOnEmpty'>;

export class Database {
  private readonly db: Sequelize;

  constructor(private readonly config: IDatabaseConfig, private readonly logger: ILogger) {
    const { host, port, username, password, database } = config.database;
    this.db = new Sequelize({
      host,
      database,
      port,
      username,
      password,
      models: [join(__dirname, './models/*.js')],
      dialect: 'postgres',
      logging: (message) => logger.debug(message),
    });
  }

  public async connect(): Promise<void> {
    this.logger.info(`Starting db...`, this.config.database);
    this.db.addModels([TestingFacility, TestingWaitTime]);
    await this.db.authenticate();
  }

  public async sync(): Promise<void> {
    this.logger.info(`Syncing db...`);
    await this.db.sync();
  }

  public async disconnect(): Promise<void> {
    this.logger.info(`Shutting down db...`);
    await this.db.close();
  }

  public async create<M extends Model>(model: M): Promise<M> {
    return model.save();
  }

  public async update<M extends Model>(model: M): Promise<M> {
    return model.save();
  }

  public async findById<M extends Model>(modelType: ModelCtor<M>, id: string): Promise<M | undefined> {
    const model = await modelType.findOne({ where: { id } });

    if (model) {
      return model;
    }

    return undefined;
  }

  public async findOne<M extends Model>(modelType: ModelCtor<M>, options: IFindOneOptions<M>): Promise<M | undefined> {
    const model = await modelType.findOne({
      ...options,
      rejectOnEmpty: false,
    });

    if (model) {
      return model;
    }

    return undefined;
  }
}

export default Database;
