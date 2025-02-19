import { createPool } from 'mysql2';
import { GenericObject } from '../Helpers/Types.js';
import { getQuery, getQueryValuesArray } from '../Helpers/Sql.js';

const readDBConfig = {
  database: process.env.READ_DB_NAME,
  user: process.env.READ_DB_USER,
  password: process.env.READ_DB_PASSWORD,
  host: process.env.READ_DB_HOST,
  port: +process.env.READ_DB_PORT,
  decimalNumbers: true,
  // ssl: process.env.DB_SSLMODE,
};

const writeDBConfig = {
  database: process.env.WRITE_DB_NAME,
  user: process.env.WRITE_DB_USER,
  password: process.env.WRITE_DB_PASSWORD,
  host: process.env.WRITE_DB_HOST,
  port: +process.env.WRITE_DB_PORT,
  // ssl: process.env.DB_SSLMODE,
};

const readPool = createPool(readDBConfig);
const writePool = createPool(writeDBConfig);

export const executeQuery = async (
  queryFileName: string,
  values?: GenericObject<any>
) => {
  const queryString = await getQuery(queryFileName);

  const valuesArray = getQueryValuesArray(queryFileName, values);

  const connection = await readPool.promise().getConnection();
  const [data, fields] = await connection.query(queryString, valuesArray);

  connection.release();

  return {
    data,
    fields,
  };
};

export const executeCommand = async (
  queryFileName: string,
  values?: GenericObject<any>,
  isBulkInsert: boolean = false
) => {
  const queryString = await getQuery(queryFileName, isBulkInsert);

  const valuesArray = getQueryValuesArray(queryFileName, values, isBulkInsert);

  const connection = await writePool.promise().getConnection();
  const [data, fields] = await connection.query(queryString, valuesArray);

  connection.release();

  return {
    data,
    fields,
  };
};
