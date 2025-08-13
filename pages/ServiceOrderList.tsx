import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { OSStatus, ServiceOrder } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

const getStatusVariant = (status: OSStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case OSStatus.Pending:
            return 'secondary';
        case OSStatus.InProgress:
            return 'default';
        case OSStatus.Completed:
            return 'outline';
        case OSStatus.Canceled:
            return 'destructive';
    }
};

const ServiceOrderList: React.FC = () => {
    const { serviceOrders, isLoading } = useAppContext();
    const navigate = useNavigate();

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            );
        }

        if (serviceOrders.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Nenhuma ordem de serviço encontrada.</p>
                </div>
            );
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>OS ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Data Agendada</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {serviceOrders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id.toUpperCase()}</TableCell>
                            <TableCell>{order.clientName}</TableCell>
                            <TableCell>{order.serviceType}</TableCell>
                            <TableCell>{new Date(order.scheduledDate).toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(order.status)}>
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">Ver Detalhes</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Ordens de Serviço</h1>
                 <Button onClick={() => navigate('/service-orders/new')}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Criar Nova OS
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Todas as Ordens</CardTitle>
                    <CardDescription>Visualize e gerencie todas as ordens de serviço.</CardDescription>
                </CardHeader>
                <CardContent>
                   {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default ServiceOrderList;