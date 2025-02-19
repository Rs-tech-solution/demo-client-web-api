import { createOrder } from '../Controllers/OrderController.js';
import { Routes } from '../Helpers/Types.js';
import { createControllerRouter } from '../Helpers/Utility.js';

export const baseURL = '/orders';

const routes: Routes = {
  'POST /create_order': {
    action: createOrder,
  },
};

export const orderRouter = createControllerRouter(routes);
