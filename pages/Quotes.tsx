import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { QuoteStatus, Quote } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

const getStatusVariant = (status: QuoteStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case QuoteStatus.Draft:
            return 'secondary';
        case QuoteStatus.Sent:
            return 'default';
        case QuoteStatus.Accepted:
            return 'outline';
        case QuoteStatus.Rejected:
            return 'destructive';
    }
};

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Quotes: React.FC = () => {
    const { quotes, isLoading } = useAppContext();
    const navigate = useNavigate();

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            );
        }

        if (quotes.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Nenhum orçamento encontrado.</p>
                </div>
            );
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nº</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Validade</TableHead>
                        <TableHead className="text-right">Valor Total</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {quotes.map((quote: Quote) => (
                        <TableRow key={quote.id}>
                            <TableCell className="font-medium">{quote.quoteNumber}</TableCell>
                            <TableCell>{quote.clientName}</TableCell>
                            <TableCell>{new Date(quote.quoteDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(quote.validUntil).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">{formatCurrency(quote.total)}</TableCell>
                            <TableCell className="text-center">
                                <Badge variant={getStatusVariant(quote.status)}>
                                    {quote.status}
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
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Orçamentos</h1>
                <Button onClick={() => navigate('/quotes/new')}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Criar Orçamento
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Orçamentos</CardTitle>
                    <CardDescription>Gerencie todos os orçamentos enviados aos clientes.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default Quotes;