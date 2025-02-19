import { ResultSetHeader } from 'mysql2';
import { GenericObject } from '../Helpers/Types.js';
import { applyModel as applyTestModel } from '../Models/TestModel.js';
import { executeQuery, executeCommand } from './ConnectionService.js';

enum testQuery {
  GetAllData = 'GetAllTestDataQuery.sql',
  InsertData = 'AddTestDataQuery.sql',
}

export const getAllData = async (id: number) => {
  // To Run Query:
  const { data } = await executeQuery(testQuery.GetAllData, { id });

  return applyTestModel(data);
};

export const insertData = async (insertData: GenericObject<any>) => {
  // To insert
  const { data } = await executeCommand(testQuery.InsertData, insertData, true);

  return (data as ResultSetHeader).affectedRows > 0 ? true : false;
};
