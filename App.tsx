import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { useAppContext } from './hooks/useAppContext';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateServiceOrder from './pages/CreateServiceOrder';
import ServiceOrderList from './pages/ServiceOrderList';
import Clients from './pages/Clients';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import Products from './pages/Products';
import Quotes from './pages/Quotes';
import CreateQuote from './pages/CreateQuote';
import CreateClient from './pages/CreateClient';
import CreateUser from './pages/CreateUser';
import CreateProduct from './pages/CreateProduct';
import Spinner from './components/ui/Spinner';
import SplashScreen from './pages/SplashScreen';

const AppRoutes: React.FC = () => {
    const { isLoggedIn, isLoading, error } = useAppContext();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <Spinner className="w-10 h-10 text-primary" />
            </div>
        );
    }

    if (error) {
         return (
            <div className="flex flex-col items-center justify-center h-screen bg-destructive/10 text-destructive text-center p-4">
                <h2 className="text-xl font-bold mb-2">Ocorreu um Erro</h2>
                <p>{error}</p>
                <p className="mt-4 text-sm text-muted-foreground">Por favor, atualize a página ou tente novamente mais tarde.</p>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/service-orders" element={<ServiceOrderList />} />
                <Route path="/service-orders/new" element={<CreateServiceOrder />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/new" element={<CreateClient />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<CreateProduct />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/new" element={<CreateUser />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/quotes/new" element={<CreateQuote />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MainLayout>
    );
};

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate app loading time
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return <SplashScreen />;
  }

  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
