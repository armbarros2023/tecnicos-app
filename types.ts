export enum OSStatus {
  Pending = 'Pendente',
  InProgress = 'Em Andamento',
  Completed = 'Finalizada',
  Canceled = 'Cancelada',
}

export type ClientType = 'pessoaFisica' | 'pessoaJuridica';
export type UserType = 'pessoaFisica' | 'pessoaJuridica';

export interface Client {
  id: string;
  type: ClientType;
  
  // Common Fields
  email: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;

  // Pessoa Jurídica Fields (optional)
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  site?: string;
  contactName?: string;
  phone?: string; // Main phone for PJ

  // Pessoa Física Fields (optional)
  nomeCompleto?: string;
  dataNascimento?: string;
  sexo?: 'Masculino' | 'Feminino' | 'Outro';
  cpf?: string;
  rg?: string;
  telefoneResidencial?: string;
  telefoneCelular?: string; // Main phone for PF
}


export interface ServiceOrder {
  id: string;
  clientId: string;
  clientName: string;
  serviceType: string;
  location: string;
  scheduledDate: string;
  notes: string;
  status: OSStatus;
  technician?: string;
  photos?: string[];
  completedTasks?: string[];
  clientSignature?: string;
  completedAt?: string;
}

export interface User {
  id: string;
  type: UserType;
  username?: string;
  email: string;
  role: 'Administrador' | 'Técnico';
  status: 'Ativo' | 'Inativo';
  phone?: string;
  
  // Pessoa Jurídica fields
  razaoSocial?: string;
  cnpj?: string;

  // Pessoa Física fields
  nomeCompleto?: string;
  technicianIdNumber?: string;
  cpf?: string;
  rg?: string;
}

export enum QuoteStatus {
  Draft = 'Rascunho',
  Sent = 'Enviado',
  Accepted = 'Aceito',
  Rejected = 'Rejeitado',
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Quote {
  id: string;
  clientId: string;
  clientName: string;
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  items: QuoteItem[];
  subtotal: number;
  discount: number;
  total: number;
  observations: string;
  commercialConditions: string;
  status: QuoteStatus;
}

export type UnitOfMeasure = 'unidade' | 'caixa' | 'peça' | 'metro' | 'outro';
export type ProductCategory = 'Telefonia' | 'Redes' | 'Segurança' | 'Manutenção' | 'Outros';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: ProductCategory;
  unitOfMeasure: UnitOfMeasure;
  quantityInStock: number;
  costPrice: number;
  sellingPrice: number;
  supplier?: string;
}