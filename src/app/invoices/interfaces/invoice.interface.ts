export interface Invoice {
  _id?         : string;
  createdAt    : string;
  paymentDue   : string;
  description  : string;
  paymentTerms : number;
  clientName   : string;
  clientEmail  : string;
  status       : string;
  senderAddress: Address;
  clientAddress: Address;
  items        : Item[];
  total        : number;
  __v?         : number;
}

export interface Address {
  street  : string;
  city    : string;
  postCode: string;
  country : string;
}

export interface Item {
  name    : string;
  quantity: number;
  price   : number;
  total   : number;
}
