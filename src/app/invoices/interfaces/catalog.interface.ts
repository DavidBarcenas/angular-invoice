export interface Catalog {
  _id: string;
  status: Status;
  paymentTerms: string[];
}

export interface Status {
  paid: string;
  pending: string;
  draft: string;
}
