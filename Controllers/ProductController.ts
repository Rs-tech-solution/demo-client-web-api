import { ProductTypeForList } from '../Models/ProductModel.js';
import { ControllerAction } from '../Helpers/Types.js';
import * as productService from '../Services/ProductService.js';

export const getProductList: ControllerAction<
  any,
  ProductTypeForList[]
> = async () => {
  return await productService.getProductList();
};
