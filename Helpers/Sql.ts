import fs from 'fs/promises';
import path from 'path';
import { GenericObject } from './Types.js';
import {
  getQueryVariablesOrderedByPosition,
  replaceQueryVariablesWtihPlaceholder,
  toCamelCase,
} from './Utility.js';

const SqlRootFolder = 'Queries';
const SqlQueryMap = new Map<
  string,
  {
    query: string;
    variables: string[];
  }
>();

const importSql = async (sql: string) => {
  const queryBuffer = await fs.readFile(
    path.normalize(`${SqlRootFolder}/${sql}`)
  );
  const query = queryBuffer.toString();

  const variableOrderedByPositionArray =
    getQueryVariablesOrderedByPosition(query);
  const queryWithPlaceholder = replaceQueryVariablesWtihPlaceholder(
    query,
    variableOrderedByPositionArray
  );

  SqlQueryMap.set(sql, {
    query: queryWithPlaceholder,
    variables: variableOrderedByPositionArray.map(toCamelCase),
  });
};

export const getQuery = async (sql: string, isBulkInsert: boolean = false) => {
  if (!SqlQueryMap.has(sql)) {
    await importSql(sql);
  }

  let query = SqlQueryMap.get(sql).query;

  if (isBulkInsert) {
    const tempQuery = query.toLowerCase();
    return query.substring(0, tempQuery.lastIndexOf('values') + 5) + ' ?;';
  }

  return query;
};

export const getQueryValuesArray = (
  sql: string,
  data: GenericObject<any>,
  isBulkInsert: boolean = false
) => {
  const variableOrderedByPositionArray = SqlQueryMap.get(sql).variables;

  if (isBulkInsert) {
    const returnData = Object.values(data).map((value: any) => {
      return variableOrderedByPositionArray.map((variable) => value[variable]);
    });

    return [returnData];
  }
  return variableOrderedByPositionArray.map((variable) => data[variable]);
};
