import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

export default class BaseRepository {
  private _mapper: DataMapper;

  constructor() {
    this._mapper = new DataMapper({
      client: new DynamoDB({ region: process.env.REGION || 'us-east-1' }),
      tableNamePrefix: `${process.env.STAGE}.`,
    });
  }

  get mapper(): DataMapper {
    return this._mapper;
  }
}
