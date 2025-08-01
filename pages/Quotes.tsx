import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusCircle } from '../components/icons/IconComponents';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { QuoteStatus, Quote } from '../types';
import Spinner from '../components/ui/Spinner';

const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
        case QuoteStatus.Draft:
            return 'bg-gray-100 text-gray-800 border-gray-200';
        case QuoteStatus.Sent:
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case QuoteStatus.Accepted:
            return 'bg-green-100 text-green-800 border-green-200';
        case QuoteStatus.Rejected:
            return 'bg-red-100 text-red-800 border-red-200';
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
                    <Spinner className="w-8 h-8 text-primary" />
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
            <div className="border rounded-lg">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nº</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cliente</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Validade</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Valor Total</th>
                                <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {quotes.map((quote: Quote) => (
                                <tr key={quote.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{quote.quoteNumber}</td>
                                    <td className="p-4 align-middle">{quote.clientName}</td>
                                    <td className="p-4 align-middle">{new Date(quote.quoteDate).toLocaleDateString()}</td>
                                    <td className="p-4 align-middle">{new Date(quote.validUntil).toLocaleDateString()}</td>
                                    <td className="p-4 align-middle text-right">{formatCurrency(quote.total)}</td>
                                    <td className="p-4 align-middle text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(quote.status)}`}>
                                            {quote.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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