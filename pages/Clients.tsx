import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

const Clients: React.FC = () => {
    const { clients, isLoading } = useAppContext();
    const navigate = useNavigate();

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            );
        }

        if (clients.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Nenhum cliente encontrado.</p>
                </div>
            );
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome / Razão Social</TableHead>
                        <TableHead>CPF / CNPJ</TableHead>
                        <TableHead>Cidade/UF</TableHead>
                        <TableHead>Telefone Principal</TableHead>
                        <TableHead>E-mail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map(client => (
                        <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.razaoSocial || client.nomeCompleto}</TableCell>
                            <TableCell>{client.cnpj || client.cpf}</TableCell>
                            <TableCell>{`${client.city}/${client.state}`}</TableCell>
                            <TableCell>{client.phone || client.telefoneCelular}</TableCell>
                            <TableCell>{client.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };
    
    return (
         <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Clientes</h1>
                 <Button onClick={() => navigate('/clients/new')}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Novo Cliente
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                    <CardDescription>Gerencie as informações dos seus clientes.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default Clients;