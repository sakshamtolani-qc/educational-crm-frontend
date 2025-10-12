import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/utils/tooltip';
import { Toaster } from '@/utils/toaster';
import { Toaster as Sonner } from '@/utils/sonner';
import { Login } from './pages/LoginPage/LoginPage';
import { Footer } from '@/components/Footer/Footer';

// -------------------- Loading Context --------------------
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingCount: number;
  incrementLoading: () => void;
  decrementLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;

  const setIsLoading = (loading: boolean) => setLoadingCount(loading ? 1 : 0);
  const incrementLoading = () => setLoadingCount((prev) => prev + 1);
  const decrementLoading = () => setLoadingCount((prev) => Math.max(0, prev - 1));

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, loadingCount, incrementLoading, decrementLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

// -------------------- Layout --------------------
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoading();
  const [hasLoaderInDOM, setHasLoaderInDOM] = useState(false);

  useEffect(() => {
    const checkForLoaders = () => {
      const loaderSelectors = ['.page-loader', '.loader', '.loading', '[role="status"]'];
      const hasAnyLoader = loaderSelectors.some((selector) =>
        document.querySelector(selector)
      );
      setHasLoaderInDOM(hasAnyLoader);
    };

    const observer = new MutationObserver(() => setTimeout(checkForLoaders, 50));
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-loading', 'role'],
    });

    return () => observer.disconnect();
  }, []);

  const shouldHideFooter = isLoading || hasLoaderInDOM;

  return (
    <>
      <main className={shouldHideFooter ? 'min-h-screen' : ''}>{children}</main>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

// -------------------- App --------------------
const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LoadingProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
