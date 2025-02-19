import { ProductTypeForList } from '../Models/ProductModel.js';
import { executeCommand, executeQuery } from './ConnectionService.js';

enum productQuery {
  GetProductList = 'GetProductList.sql',
}

export const getProductList = async () => {
  const { data } = await executeQuery(productQuery.GetProductList, {});
  return (data as ProductTypeForList[]) || [];
};
