"use client";
import React, { useState, useMemo } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

// This provider component will wrap your application or parts of it
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the context value to prevent unnecessary re-renders of consuming components
  // The functions are stable, so we don't need to include them in the dependency array
  const value = useMemo(() => ({
    isLoading,
    showLoader: () => setIsLoading(true),
    hideLoader: () => setIsLoading(false),
  }), [isLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};