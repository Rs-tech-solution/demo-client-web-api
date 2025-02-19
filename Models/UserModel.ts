import { QueryResult } from '../Helpers/Types.js';

export interface UserType {
  id: number;
  name: string;
  email: string;
  phoneNumer: string;
  imageSrc: string;
  createdOn: Date;
  createdBy: string;
  lastModifiedOn: Date;
  lastModifiedBy: string;
}

export type MinUserType = {
  id: number;
  name: string;
  email: string;
  phoneNumer: string;
};

export interface CreateUserType {
  name: string;
  email: string;
  phoneNumer: string;
  createdBy: string;
}

export interface UpdateUserType {
  id: number;
  name?: string;
  email?: string;
  phoneNumer?: string;
  lastModifiedBy: string;
}

export const MinUserModel = (queryResult: UserType): MinUserType => ({
  id: queryResult.id,
  name: queryResult.name,
  email: queryResult.email,
  phoneNumer: queryResult.phoneNumer,
});

export const applyMinUserModel = (data: QueryResult): MinUserType[] => {
  return (data as UserType[]).map(MinUserModel);
};
