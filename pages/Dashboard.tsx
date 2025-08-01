import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { OSStatus, ServiceOrder } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusCircle, Phone } from '../components/icons/IconComponents';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StatusCard: React.FC<{ title: string; count: number; color: string }> = ({ title, count, color }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Phone className={`h-4 w-4 text-muted-foreground ${color}`} />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{count}</div>
            <p className="text-xs text-muted-foreground">Ordens de Serviço</p>
        </CardContent>
    </Card>
);

const Dashboard: React.FC = () => {
    const { serviceOrders } = useAppContext();
    const navigate = useNavigate();

    const statusCounts = serviceOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {} as Record<OSStatus, number>);

    const chartData = [
        { name: 'Pendente', count: statusCounts[OSStatus.Pending] || 0, fill: '#f59e0b' },
        { name: 'Em Andamento', count: statusCounts[OSStatus.InProgress] || 0, fill: '#3b82f6' },
        { name: 'Finalizada', count: statusCounts[OSStatus.Completed] || 0, fill: '#22c55e' },
    ];
    
    const recentOrders = [...serviceOrders]
        .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <Button onClick={() => navigate('/service-orders/new')}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Criar Nova OS
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatusCard title="Pendentes" count={statusCounts[OSStatus.Pending] || 0} color="text-amber-500" />
                <StatusCard title="Em Andamento" count={statusCounts[OSStatus.InProgress] || 0} color="text-blue-500" />
                <StatusCard title="Finalizadas" count={statusCounts[OSStatus.Completed] || 0} color="text-green-500" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Visão Geral das OS</CardTitle>
                        <CardDescription>Distribuição das ordens de serviço por status.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip cursor={{fill: 'rgba(125, 125, 125, 0.1)'}}/>
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                     <CardHeader>
                        <CardTitle>Atividades Recentes</CardTitle>
                        <CardDescription>Últimas ordens de serviço agendadas ou atualizadas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map(order => (
                                <div key={order.id} className="flex items-center">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                      <Phone className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{order.serviceType}</p>
                                        <p className="text-sm text-muted-foreground">{order.clientName}</p>
                                    </div>
                                    <div className="ml-auto font-medium text-sm">{new Date(order.scheduledDate).toLocaleDateString()}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;