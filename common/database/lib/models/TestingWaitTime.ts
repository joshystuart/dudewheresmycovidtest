import { Optional } from 'sequelize';
import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { ITestingFacility, TestingFacility } from './TestingFacility';

export interface ITestingWaitTime {
  id: string;
  testingFacility?: ITestingFacility;
  testingFacilityId: number;
  waitTime: number;
}

export type INewTestingWaitTime = Optional<ITestingWaitTime, 'id'>;

@Table
export class TestingWaitTime extends Model<ITestingWaitTime, INewTestingWaitTime> {
  @BelongsTo(() => TestingFacility)
  public testingFacility: ITestingFacility;

  @ForeignKey(() => TestingFacility)
  @Column({ type: DataType.INTEGER })
  public testingFacilityId: number;

  @Column({ type: DataType.FLOAT })
  public waitTime: number;

  @Index({ name: 'created' })
  @CreatedAt
  public createdAt: Date;
}

export default TestingWaitTime;
