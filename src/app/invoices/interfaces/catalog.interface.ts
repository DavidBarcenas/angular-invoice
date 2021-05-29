export interface Catalog {
  _id: string;
  status: string[];
  paymentTerms: PaymentTerms[];
}

export interface PaymentTerms {
  id: number;
  name: string;
}
