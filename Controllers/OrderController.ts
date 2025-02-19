import { ControllerAction } from '../Helpers/Types.js';
import * as orderService from '../Services/OrderService.js';

export const createOrder: ControllerAction<any, any> = async (
  context
) => {
  const { orderData } = context.params;
  return await orderService.createOrder({...orderData});
};
