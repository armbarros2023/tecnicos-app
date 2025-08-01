
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FileText } from '../components/icons/IconComponents';

const Reports: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Relatórios</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Relatórios e KPIs</CardTitle>
                    <CardDescription>Exporte dados e analise a performance do seu time.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center h-64 space-y-4">
                     <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                       <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">Em breve</h3>
                    <p className="text-muted-foreground">A funcionalidade de relatórios detalhados e exportação estará disponível em breve.</p>
                    <Button variant="outline" onClick={() => alert('Exportação indisponível no MVP.')}>Exportar (PDF)</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Reports;