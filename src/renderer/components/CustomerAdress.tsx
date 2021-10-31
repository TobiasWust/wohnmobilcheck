import { ICustomer } from '../interfaces/interfaces';

const CustomerAdress = ({ customer }: { customer: ICustomer }) => {
  return (
    <div>
      <h3>Kunde</h3>
      <p>
        {`${customer.firstName} ${customer.lastName}`}
        <br />
        {customer.street}
        <br />
        {customer.city}
      </p>
    </div>
  );
};

export default CustomerAdress;
