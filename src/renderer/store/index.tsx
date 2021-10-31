import create from 'zustand';
import { IConfig, ICustomer, ICheck } from '../interfaces/interfaces';

const useStore = create((set) => ({
  customers: [] as ICustomer[],
  setCustomers: (customers: ICustomer[]) => set({ customers }),

  checks: [] as ICheck[],
  setChecks: (checks: ICheck[]) => set({ checks }),

  selectedCustomer: {
    lastName: '',
    firstName: '',
    street: '',
    city: '',
  } as ICustomer,
  setSelectedCustomer: (customer: ICustomer) =>
    set({ selectedCustomer: customer }),
  resetSelectedCustomer: () =>
    set({
      selectedCustomer: {
        lastName: '',
        firstName: '',
        street: '',
        city: '',
      },
    }),

  selectedCheck: {
    car: '',
    values: {},
  } as ICheck,
  setSelectedCheck: (check: ICheck) => set({ selectedCheck: check }),
  resetSelectedCheck: () => set({ selectedCheck: { car: '', values: {} } }),

  settings: {
    companyName: '',
    street: '',
    city: '',
    phone: '',
    mail: '',
  },
  setSettings: (settings: IConfig) => set({ settings }),
}));

export default useStore;
