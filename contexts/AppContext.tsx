import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Client, ServiceOrder, User, Quote, Product } from '../types';
import { api } from '../services/api';

export interface AppContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  login: (username?: string, password?: string) => Promise<void>;
  logout: () => void;
  clients: Client[];
  serviceOrders: ServiceOrder[];
  users: User[];
  quotes: Quote[];
  products: Product[];
  addServiceOrder: (order: Omit<ServiceOrder, 'id' | 'clientName' | 'status'>) => Promise<void>;
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'status'>) => Promise<void>;
  addQuote: (quote: Omit<Quote, 'id' | 'clientName' | 'quoteNumber' | 'status'>) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('fieldservice_isLoggedIn') === 'true');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [clients, setClients] = useState<Client[]>([]);
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const [clientsData, serviceOrdersData, usersData, productsData, quotesData] = await Promise.all([
            api.getClients(),
            api.getServiceOrders(),
            api.getUsers(),
            api.getProducts(),
            api.getQuotes(),
        ]);
        setClients(clientsData);
        setServiceOrders(serviceOrdersData);
        setUsers(usersData);
        setProducts(productsData);
        setQuotes(quotesData);
    } catch (e) {
        setError("Falha ao carregar os dados iniciais do aplicativo.");
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
        fetchData();
    } else {
        setIsLoading(false);
    }
  }, [isLoggedIn, fetchData]);

  const login = useCallback(async (username?: string, password?: string) => {
    const user = await api.login(username, password);
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('fieldservice_isLoggedIn', 'true');
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('fieldservice_isLoggedIn');
    setClients([]);
    setServiceOrders([]);
    setUsers([]);
    setProducts([]);
    setQuotes([]);
  }, []);

  const addServiceOrder = useCallback(async (order: Omit<ServiceOrder, 'id' | 'clientName' | 'status'>) => {
    await api.addServiceOrder(order);
    setServiceOrders(await api.getServiceOrders());
  }, []);

  const addClient = useCallback(async (clientData: Omit<Client, 'id'>) => {
    await api.addClient(clientData);
    setClients(await api.getClients());
  }, []);

  const addUser = useCallback(async (userData: Omit<User, 'id' | 'status'>) => {
    await api.addUser(userData);
    setUsers(await api.getUsers());
  }, []);
  
  const addQuote = useCallback(async (quoteData: Omit<Quote, 'id' | 'clientName' | 'quoteNumber' | 'status'>) => {
    await api.addQuote(quoteData);
    setQuotes(await api.getQuotes());
  }, []);

  const addProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    await api.addProduct(productData);
    setProducts(await api.getProducts());
  }, []);

  const value = {
    isLoggedIn,
    currentUser,
    login,
    logout,
    clients,
    serviceOrders,
    users,
    quotes,
    products,
    addServiceOrder,
    addClient,
    addUser,
    addQuote,
    addProduct,
    isLoading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};