import { ControllerAction } from '../Helpers/Types.js';
import { TestType } from '../Models/TestModel.js';
import * as testService from '../Services/TestService.js';

export const getTestData: ControllerAction<{ id: number }, TestType[]> = async (
  context
) => {
  const { id } = context.params;

  return await testService.getAllData(id);
};

export const insertData: ControllerAction<
  { data1: string; data2: string },
  boolean
> = async (context) => {
  const { data1, data2 } = context.params;

  const insertData = [
    {
      data1,
      data2,
    },
  ];

  return await testService.insertData(insertData);
};
