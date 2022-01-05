import { Optional } from 'sequelize';
import { AllowNull, Column, DataType, HasMany, Index, Model, Table } from 'sequelize-typescript';
import { TestingWaitTime } from './TestingWaitTime';

// eslint-disable-next-line no-shadow
export enum State {
  ACT = 'VIC',
  NSW = 'NSW',
  NT = 'NT',
  QLD = 'QLD',
  SA = 'SA',
  TAS = 'TAS',
  VIC = 'VIC',
  WA = 'WA',
}

// eslint-disable-next-line no-shadow
export enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED',
  AT_CAPACITY = 'AT_CAPACITY',
}

export interface ITestingFacility {
  id: number;
  site: string;
  type: string;
  details: string;
  ageLimit: string;
  phoneNumber: string;
  website: string;
  availability: string;
  requirements: string;
  address: string;
  suburb: string;
  state: State;
  latitude: number;
  longitude: number;
  currentWaitTime?: number | null;
  currentWaitTimeDescription?: string | null;
  status: Status;
}

export type INewTestingFacility = Optional<ITestingFacility, 'id'>;

@Table
export class TestingFacility extends Model<ITestingFacility, INewTestingFacility> {
  @HasMany(() => TestingWaitTime)
  public testingWaitTimes: TestingWaitTime[];

  @Index({
    name: 'site',
    unique: true,
  })
  @Column({ type: DataType.STRING })
  public site: string;

  @Column({ type: DataType.STRING })
  public type: string;

  @Column({ type: DataType.STRING })
  public details: string;

  @Column({ type: DataType.STRING })
  public ageLimit: string;

  @Column({ type: DataType.STRING })
  public phoneNumber: string;

  @Column({ type: DataType.STRING })
  public website: string;

  @Column({ type: DataType.TEXT })
  public availability: string;

  @Column({ type: DataType.TEXT })
  public requirements: string;

  @Column({ type: DataType.STRING })
  public address: string;

  @Column({ type: DataType.STRING })
  public suburb: string;

  @Column({ type: DataType.STRING })
  public state: State;

  @Column({ type: DataType.FLOAT })
  public latitude: number;

  @Column({ type: DataType.FLOAT })
  public longitude: number;

  @AllowNull
  @Column({ type: DataType.FLOAT })
  public currentWaitTime: number | null;

  @AllowNull
  @Column({ type: DataType.TEXT })
  public currentWaitTimeDescription: string | null;

  @Column({ type: DataType.STRING })
  public status: Status;
}

export default TestingFacility;
