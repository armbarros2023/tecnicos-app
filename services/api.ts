import { Client, ServiceOrder, User, Quote, Product } from '../types';
import { db } from './mockDb';

const SIMULATED_LATENCY = 200; // ms

// Helper to simulate async requests and handle potential errors from the mock db
const simulateRequest = <T>(data: T | { error?: string }): Promise<T> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if the object has an error property
            if (data && typeof data === 'object' && 'error' in data && data.error) {
                reject(new Error(data.error));
            } else {
                resolve(data as T);
            }
        }, SIMULATED_LATENCY);
    });
};

const login = (username?: string, password?: string): Promise<User> => {
    const result = db.findUserByCredentials(username, password);
    if (result.error) {
        // Here we pass an object that simulateRequest will reject
        return simulateRequest<User>({ error: result.error });
    }
    // On success, result.user is guaranteed to be a User object
    return simulateRequest(result.user!);
};

const addServiceOrder = (order: Omit<ServiceOrder, 'id' | 'clientName' | 'status'>): Promise<ServiceOrder> => {
    const { order: newOrder, error } = db.addServiceOrder(order);
    if (error) {
        return simulateRequest<ServiceOrder>({ error });
    }
    return simulateRequest(newOrder!);
}

const addQuote = (quote: Omit<Quote, 'id' | 'clientName' | 'quoteNumber' | 'status'>): Promise<Quote> => {
    const { quote: newQuote, error } = db.addQuote(quote);
    if (error) {
        return simulateRequest<Quote>({ error });
    }
    return simulateRequest(newQuote!);
}


export const api = {
    login,
    getClients: (): Promise<Client[]> => simulateRequest(db.getClients()),
    addClient: (client: Omit<Client, 'id'>): Promise<Client> => simulateRequest(db.addClient(client)),
    
    getServiceOrders: (): Promise<ServiceOrder[]> => simulateRequest(db.getServiceOrders()),
    addServiceOrder,

    getUsers: (): Promise<User[]> => simulateRequest(db.getUsers()),
    addUser: (user: Omit<User, 'id' | 'status'>): Promise<User> => simulateRequest(db.addUser(user)),

    getProducts: (): Promise<Product[]> => simulateRequest(db.getProducts()),
    addProduct: (product: Omit<Product, 'id'>): Promise<Product> => simulateRequest(db.addProduct(product)),

    getQuotes: (): Promise<Quote[]> => simulateRequest(db.getQuotes()),
    addQuote,
};