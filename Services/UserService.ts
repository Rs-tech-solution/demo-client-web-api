import { ResultSetHeader } from 'mysql2';
import { executeQuery, executeCommand } from './ConnectionService.js';
import {
  CreateUserType,
  UpdateUserType,
  MinUserType,
} from '../Models/UserModel.js';

enum userQuery {
  GetUserById = 'GetUserByIdQuery.sql',
  GetUserTransactions = 'GetUserTransactionsQuery.sql',
  CreateUser = 'CreateUserQuery.sql',
  UpdateUser = 'UpdateUserQuery.sql',
}

export const getUser = async (id: string) => {
  const { data } = await executeQuery(userQuery.GetUserById, { id });

  return (data as MinUserType[])[0] || null;
};

export const createUser = async (userData: CreateUserType) => {
  const { data } = await executeCommand(userQuery.CreateUser, [userData], true);

  return (data as ResultSetHeader).affectedRows > 0;
};

export const updateUser = async (userData: UpdateUserType) => {
  const { data } = await executeCommand(userQuery.UpdateUser, userData);

  return (data as ResultSetHeader).affectedRows > 0;
};
