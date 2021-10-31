import create from 'zustand';
import { IConfig, ICustomer } from '../interfaces/interfaces';

const useStore = create((set) => ({
  selectedCustomer: {
    lastName: 'test',
    firstName: '',
    street: '',
    city: '',
  } as ICustomer,
  setSelectedCustomer: (customer: ICustomer) =>
    set({ selectedCustomer: customer }),

  settings: {
    companyName: '',
    street: '',
    city: '',
  },
  setSettings: (settings: IConfig) => set({ settings }),
}));

export default useStore;
