import { QueryResult } from '../Helpers/Types.js';

export type TestType = {
  id: number;
  data1: string;
  data2: string;
};

export const TestModel = (queryResult: TestType) => ({
  id: queryResult.id,
  data1: queryResult.data1,
  data2: queryResult.data2,
});

export const applyModel = (data: QueryResult) => {
  return (data as TestType[]).map(TestModel);
};
