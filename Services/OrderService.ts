import { ResultSetHeader } from 'mysql2';
import { executeCommand, executeQuery } from './ConnectionService.js';
enum orderQuery {
  CreateUserForOrder = 'CreateUserForOrderQuery.sql',
  FindUserId = 'FindUserIdQuery.sql',
  CreateTransaction = 'CreateTransactionQuery.sql',
  CreateOrder = 'CreateOrderQuery.sql',
}

export const createOrder = async (orderData: any) => {

  let user_id = null;
  const { data: user } = await executeQuery(orderQuery.FindUserId,{
    email: orderData.email,
    phoneNumber: orderData.number,
  })

   if((user as any)[0].id){
     user_id = (user as any)[0].id;
   }
   if(!user_id){
    const { data: userId } = await executeCommand(orderQuery.CreateUserForOrder, {
      name: orderData.firstName + ' ' + orderData.lastName,
      email: orderData.email,
      phoneNumber: orderData.number,
      isGuest: 0,
      createdOn: new Date(),
    });
    if((userId as ResultSetHeader).affectedRows > 0){
      user_id = (userId as ResultSetHeader).insertId
    }
   }
 

  if (user_id) {
    const { data: transactionId } = await executeCommand(
      orderQuery.CreateTransaction,
      {
        userId: user_id,
        amount: orderData.totalAmount,
        tipAmount: orderData.tip,
        currency: orderData.currency,
        anonymous: orderData.donateAnonymously ? 1 : 0,
        exchange: 1.0,
        reference: '',
        status: 0,
        createdOn: new Date(),
      }
    );

    if ((transactionId as ResultSetHeader).affectedRows > 0) {
      const { data } = await executeCommand(orderQuery.CreateOrder, {
        transactionId: (transactionId as ResultSetHeader).insertId,
        campaignId: orderData.campaignId,
        amount: orderData.totalAmount,
        createdOn: new Date(),
      });
      return (data as ResultSetHeader).affectedRows > 0 ? true : false;
    }
  }
};
