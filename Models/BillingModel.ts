export interface BillingType {
  transactionId: number;
  userId: string;
  phoneNumber: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  address: string;
  displayName: string;
  notes: string;
  indianNationality: boolean | null;
  createdOn: Date | null;
}
