export interface OrdersType {
  id: number;                  
  campaignId: number;          
  transactionId: number; 
  amount: number;
  createdOn: Date;             
  lastModifiedOn: Date | null; 
}
