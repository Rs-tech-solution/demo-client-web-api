import { getProductList } from '../Controllers/ProductController.js';
import { Routes } from '../Helpers/Types.js';
import { createControllerRouter } from '../Helpers/Utility.js';

export const baseURL = '/product';

const routes: Routes = {
  'GET /product_list': {
    action: getProductList,
  },
};

export const productRouter = createControllerRouter(routes);
