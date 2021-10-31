export interface ICustomer {
  id?: number;
  lastName: string;
  firstName: string;
  street: string;
  city: string;
}

export interface IConfig {
  companyName: string;
  street: string;
  city: string;
}

export interface ICheck {
  id?: number;
  customerId: number;
  car: string;
  created: string;
  values: any;
}
