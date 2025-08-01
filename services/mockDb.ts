import { Client, ServiceOrder, User, Quote, Product, OSStatus, QuoteStatus } from '../types';

// --- IN-MEMORY DATABASE & MOCK DATA ---

let clientsDb: Client[] = [
  { 
    id: 'cli-1', type: 'pessoaJuridica', razaoSocial: 'Tech Solutions & Inovações Ltda.', nomeFantasia: 'Tech Solutions', cnpj: '12.345.678/0001-99', inscricaoEstadual: '111.222.333.444', street: 'Rua das Inovações', number: '123', complement: 'Andar 10', neighborhood: 'Centro', city: 'São Paulo', state: 'SP', zipCode: '01001-000', email: 'contato@techsolutions.com', phone: '(11) 98765-4321', contactName: 'Ana'
  },
  { 
    id: 'cli-2', type: 'pessoaJuridica', razaoSocial: 'João da Silva MEI', nomeFantasia: 'JS Instalações', cnpj: '23.456.789/0001-11', inscricaoEstadual: 'Isento', street: 'Av. Principal', number: '456', complement: 'Loja B', neighborhood: 'Copacabana', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22020-002', email: 'joao.silva@jsinstalacoes.com', phone: '(21) 91234-5678', contactName: 'João da Silva'
  },
  { 
    id: 'cli-3', type: 'pessoaJuridica', razaoSocial: 'Comércio de Alimentos Oliveira Ltda.', nomeFantasia: 'Supermercado Oliveira', cnpj: '98.765.432/0001-22', inscricaoEstadual: '555.666.777.888', street: 'Praça Central', number: '789', complement: '', neighborhood: 'Savassi', city: 'Belo Horizonte', state: 'MG', zipCode: '30130-141', email: 'compras@superoliveira.com', phone: '(31) 95555-4444', contactName: 'Maria Oliveira'
  },
  {
    id: 'cli-4', type: 'pessoaFisica', nomeCompleto: 'Fernanda Costa', cpf: '123.456.789-00', rg: '22.333.444-5', dataNascimento: '1990-05-15', sexo: 'Feminino', street: 'Rua das Flores', number: '50', complement: 'Apto 202', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP', zipCode: '01401-001', email: 'fernanda.costa@email.com', telefoneCelular: '(11) 98888-7777',
  }
];

let usersDb: User[] = [
  { id: 'user-admin', type: 'pessoaFisica', nomeCompleto: 'Administrador do Sistema', username: 'administrador', email: 'admin@fieldservice.com', role: 'Administrador', status: 'Ativo' },
  { id: 'user-1', type: 'pessoaFisica', nomeCompleto: 'Carlos Ferreira', username: 'carlos', email: 'carlos.ferreira@fieldservice.com', phone: '(11) 99999-1111', role: 'Técnico', status: 'Ativo', technicianIdNumber: 'TEC-001', cpf: '111.222.333-44', rg: '12.345.678-9' },
  { id: 'user-2', type: 'pessoaFisica', nomeCompleto: 'Ana Souza', username: 'ana', email: 'ana.souza@fieldservice.com', phone: '(21) 98888-2222', role: 'Técnico', status: 'Ativo', technicianIdNumber: 'TEC-002', cpf: '222.333.444-55', rg: '23.456.789-0' },
  { id: 'user-3', type: 'pessoaFisica', nomeCompleto: 'Mariana Lima', username: 'mariana', email: 'mariana.lima@fieldservice.com', phone: '(31) 97777-3333', role: 'Administrador', status: 'Inativo' },
  { id: 'user-4', type: 'pessoaJuridica', razaoSocial: 'ABC Terceirização de TI', username: 'abc.ti', email: 'contato@abcti.com', phone: '(11) 5555-6666', role: 'Técnico', status: 'Ativo', cnpj: '11.222.333/0001-44' }
];

let productsDb: Product[] = [
  { id: 'prod-1', sku: 'TEL-001', name: 'Telefone IP Intelbras TIP 125i', description: 'Telefone IP com suporte a 1 conta SIP, PoE e alta qualidade de voz.', category: 'Telefonia', unitOfMeasure: 'unidade', quantityInStock: 25, costPrice: 250.00, sellingPrice: 349.90, supplier: 'Intelbras S/A' },
  { id: 'prod-2', sku: 'CAB-001', name: 'Cabo de Rede CAT6 Furukawa', description: 'Cabo de rede para instalações de alta performance.', category: 'Redes', unitOfMeasure: 'metro', quantityInStock: 500, costPrice: 1.80, sellingPrice: 3.50, supplier: 'Distribuidora Cabos Mil' },
  { id: 'prod-3', sku: 'CEN-001', name: 'Central Telefônica Intelbras Modulare+', description: 'Central PABX analógica para pequenas empresas.', category: 'Telefonia', unitOfMeasure: 'peça', quantityInStock: 5, costPrice: 450.00, sellingPrice: 629.90, supplier: 'Intelbras S/A' },
  { id: 'prod-4', sku: 'SEG-002', name: 'Câmera IP Giga Security GS0246', description: 'Câmera IP Bullet com infravermelho e resolução Full HD.', category: 'Segurança', unitOfMeasure: 'unidade', quantityInStock: 15, costPrice: 280.00, sellingPrice: 419.99, supplier: 'Giga Security' },
  { id: 'prod-5', sku: 'CON-001', name: 'Conector RJ45 CAT6 Blindado', description: 'Conector para montagem de cabos de rede CAT6.', category: 'Redes', unitOfMeasure: 'caixa', quantityInStock: 10, costPrice: 80.00, sellingPrice: 150.00, supplier: 'Distribuidora Cabos Mil' },
];

let serviceOrdersDb: ServiceOrder[] = [
  { id: 'os-001', clientId: 'cli-1', clientName: 'Tech Solutions & Inovações Ltda.', serviceType: 'Manutenção de Servidor', location: 'Rua das Inovações, 123, São Paulo, SP', scheduledDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), notes: 'Verificar performance do servidor principal e fazer limpeza de logs.', status: OSStatus.Pending, technician: 'Carlos' },
  { id: 'os-002', clientId: 'cli-2', clientName: 'João da Silva MEI', serviceType: 'Instalação de Câmeras', location: 'Av. Principal, 456, Rio de Janeiro, RJ', scheduledDate: new Date().toISOString(), notes: 'Instalar 4 câmeras de segurança na área externa da residência.', status: OSStatus.InProgress, technician: 'Ana' },
  { id: 'os-003', clientId: 'cli-3', clientName: 'Comércio de Alimentos Oliveira Ltda.', serviceType: 'Reparo de Rede Wi-Fi', location: 'Praça Central, 789, Belo Horizonte, MG', scheduledDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), notes: 'Sinal de Wi-Fi fraco no segundo andar.', status: OSStatus.Completed, technician: 'Carlos', completedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
];

let quotesDb: Quote[] = [
    { id: 'qt-001', quoteNumber: 'ORC-0001', clientId: 'cli-1', clientName: 'Tech Solutions & Inovações Ltda.', quoteDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(), validUntil: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(), items: [ { id: 'item-1', description: 'Instalação e configuração de 10 câmeras de segurança Intelbras Full HD', quantity: 1, unitPrice: 4500 }, { id: 'item-2', description: 'Licença anual de software de monitoramento', quantity: 1, unitPrice: 800 }, ], subtotal: 5300, discount: 150, total: 5150, observations: 'Infraestrutura de cabos não inclusa.', commercialConditions: 'Garantia de 12 meses para equipamentos. Pagamento em 3x no boleto.', status: QuoteStatus.Sent, },
    { id: 'qt-002', quoteNumber: 'ORC-0002', clientId: 'cli-4', clientName: 'Fernanda Costa', quoteDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), validUntil: new Date(new Date().setDate(new Date().getDate() + 28)).toISOString(), items: [ { id: 'item-3', description: 'Consultoria e configuração de rede Wi-Fi Mesh', quantity: 1, unitPrice: 600 }, ], subtotal: 600, discount: 0, total: 600, observations: 'Visita técnica para análise do ambiente e recomendação de equipamentos.', commercialConditions: 'Pagamento via PIX na conclusão do serviço.', status: QuoteStatus.Draft, }
];

const USER_PASSWORDS = new Map<string | undefined, string>([
    ['administrador', '112233'],
    ['carlos', '123'],
    ['ana', '123'],
    ['mariana', '123'],
    ['abc.ti', '123'],
]);

// --- DB LOGIC ---
export const db = {
    findUserByCredentials: (username?: string, password?: string): { user?: User; error?: string } => {
        if (!username || !password) return { error: 'Usuário e senha são obrigatórios.' };
        const user = usersDb.find(u => u.username === username);
        const expectedPassword = user ? USER_PASSWORDS.get(user.username) : undefined;
        if (user && expectedPassword === password) {
            if (user.status === 'Inativo') return { error: 'Este usuário está inativo e não pode acessar o sistema.' };
            return { user };
        }
        return { error: 'Usuário ou senha inválidos.' };
    },
    getClients: (): Client[] => clientsDb,
    addClient: (client: Omit<Client, 'id'>): Client => {
        const newClient: Client = { ...client, id: `cli-${Date.now()}` } as Client; // Cast because Omit doesn't guarantee all fields are present for union type
        clientsDb.unshift(newClient);
        return newClient;
    },
    getServiceOrders: (): ServiceOrder[] => serviceOrdersDb,
    addServiceOrder: (order: Omit<ServiceOrder, 'id' | 'clientName' | 'status'>): { order?: ServiceOrder; error?: string } => {
        const client = clientsDb.find(c => c.id === order.clientId);
        if (!client) return { error: "Cliente não encontrado" };
        const newOrder: ServiceOrder = { 
            ...order, 
            id: `os-${Date.now()}`, 
            clientName: client.razaoSocial || client.nomeCompleto || 'Cliente Desconhecido', 
            status: OSStatus.Pending,
        };
        serviceOrdersDb.unshift(newOrder);
        return { order: newOrder };
    },
    getUsers: (): User[] => usersDb,
    addUser: (user: Omit<User, 'id' | 'status'> & { password?: string }): User => {
        const newUser: User = { ...user, id: `user-${Date.now()}`, status: 'Ativo' };
        if (newUser.username && user.password) {
            USER_PASSWORDS.set(newUser.username, user.password);
        }
        delete (newUser as Partial<User & {password?: string}>).password;
        usersDb.unshift(newUser);
        return newUser;
    },
    getProducts: (): Product[] => productsDb,
    addProduct: (product: Omit<Product, 'id'>): Product => {
        const newProduct = { ...product, id: `prod-${Date.now()}` };
        productsDb.unshift(newProduct);
        return newProduct;
    },
    getQuotes: (): Quote[] => quotesDb,
    addQuote: (quoteData: Omit<Quote, 'id' | 'clientName' | 'quoteNumber' | 'status'>): { quote?: Quote; error?: string } => {
        const client = clientsDb.find(c => c.id === quoteData.clientId);
        if (!client) return { error: "Cliente não encontrado" };
        const newQuote: Quote = { 
            ...quoteData, 
            id: `qt-${Date.now()}`, 
            quoteNumber: `ORC-${String(quotesDb.length + 1).padStart(4, '0')}`, 
            clientName: client.razaoSocial || client.nomeCompleto || 'Cliente Desconhecido', 
            status: QuoteStatus.Draft,
        };
        quotesDb.unshift(newQuote);
        return { quote: newQuote };
    }
};
