import create from 'zustand';
import { IConfig, ICustomer, ICheck } from '../interfaces/interfaces';

const useStore = create((set) => ({
  selectedCustomer: {
    lastName: 'test',
    firstName: '',
    street: '',
    city: '',
  } as ICustomer,
  setSelectedCustomer: (customer: ICustomer) =>
    set({ selectedCustomer: customer }),

  selectedCheck: {
    car: '',
    values: {},
  } as ICheck,
  setSelectedCheck: (check: ICheck) => set({ selectedCheck: check }),

  settings: {
    companyName: '',
    street: '',
    city: '',
  },
  setSettings: (settings: IConfig) => set({ settings }),
}));

export default useStore;
