export interface TaxExemptionType {
  id: number;
  recieptNumber: string;
  userId: string;
  email: string;
  address: string;
  name: string;
  panNumber: string;
  financialYear: string;
  createdOn: Date;
  lastModifiedOn: Date | null;
  lastModifiedBy: string;
}
