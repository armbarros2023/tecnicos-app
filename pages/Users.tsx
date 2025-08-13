import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { User } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

const getStatusVariant = (status: 'Ativo' | 'Inativo'): "default" | "secondary" => {
    switch (status) {
        case 'Ativo':
            return 'default';
        case 'Inativo':
            return 'secondary';
    }
};

const Users: React.FC = () => {
    const { users, isLoading } = useAppContext();
    const navigate = useNavigate();

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            );
        }

        if (users.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
                </div>
            );
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome / Razão Social</TableHead>
                        <TableHead>CPF / CNPJ</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user: User) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.nomeCompleto || user.razaoSocial}</TableCell>
                            <TableCell>{user.cpf || user.cnpj || '---'}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone || '---'}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(user.status)}>
                                    {user.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Usuários e Técnicos</h1>
                 <Button onClick={() => navigate('/users/new')}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Novo Usuário
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Usuários</CardTitle>
                    <CardDescription>Gerencie os usuários, técnicos e empresas parceiras com acesso ao sistema.</CardDescription>
                </CardHeader>
                <CardContent>
                     {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default Users;