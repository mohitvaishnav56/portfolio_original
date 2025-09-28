import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

// This custom hook is the clean way to access the context
export const useLoading = () => {
  const context = useContext(LoadingContext);

  // Throw an error if the hook is used outside of a LoadingProvider
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  return context;
};  