export enum TransactionStatus {
  Initiated,
  Success,
  Failed,
  Refunded,
  Invalid
}

export interface TransactionType {
  id: number;
  reference: string;
  userId: string;
  status: TransactionStatus;
  amount: number | null;
  tipAmount: number;
  anonymous: boolean | null;
  exchange: number | null;
  currency: string;
  paymentMode: string;
  externalReference: string;
  createdOn: Date;
  lastModifiedOn: Date | null;
  lastModifiedBy: string;
}
