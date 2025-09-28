import { createContext } from 'react';
const initialContext = {
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
};

export const LoadingContext = createContext(initialContext);