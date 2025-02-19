export interface NgoType {
  id: number;
  name: string;
  description: string;
  createdOn: Date | null;
  createdBy: string;
  lastModifiedOn: Date | null;
  lastModifiedBy: string;
  website: string;
  shortDesc: string;
  code: string;
  isFcraEnabled: boolean;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
}
