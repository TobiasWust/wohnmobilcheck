import { useState } from 'react';
import { ICustomer } from '../interfaces/interfaces';

const useSelectedCustomer = () => {
  const selectedCustomer = useState<ICustomer>({
    lastName: 'test',
    firstName: '',
    street: '',
    city: '',
  });
  return selectedCustomer;
};

export default useSelectedCustomer;
