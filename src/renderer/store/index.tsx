import create from 'zustand';
import { ICustomer } from '../interfaces/interfaces';

const useStore = create((set) => ({
  selectedCustomer: {
    lastName: 'test',
    firstName: '',
    street: '',
    city: '',
  } as ICustomer,
  setSelectedCustomer: (customer: ICustomer) =>
    set({ selectedCustomer: customer }),
}));

export default useStore;
