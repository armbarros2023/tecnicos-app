import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Products: React.FC = () => {
    const { products, isLoading } = useAppContext();
    const navigate = useNavigate();

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            );
        }

        if (products.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Nenhum produto encontrado.</p>
                </div>
            );
        }

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-center">Estoque</TableHead>
                        <TableHead className="text-right">Preço de Venda</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product: Product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.sku}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="text-center">{`${product.quantityInStock} ${product.unitOfMeasure}(s)`}</TableCell>
                            <TableCell className="text-right">{formatCurrency(product.sellingPrice)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Produtos</h1>
                <Button onClick={() => navigate('/products/new')}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Novo Produto
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Produtos</CardTitle>
                    <CardDescription>Gerencie seus produtos, peças e estoque.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default Products;