import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Label from '../components/ui/Label';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { parseServiceRequest } from '../services/geminiService';
import { Sparkles } from '../components/icons/IconComponents';
import Spinner from '../components/ui/Spinner';

const CreateServiceOrder: React.FC = () => {
    const { clients, addServiceOrder } = useAppContext();
    const navigate = useNavigate();

    const [clientId, setClientId] = useState(clients[0]?.id || '');
    const [serviceType, setServiceType] = useState('');
    const [location, setLocation] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [notes, setNotes] = useState('');
    const [geminiPrompt, setGeminiPrompt] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleGeminiParse = async () => {
        if (!geminiPrompt) {
            alert("Por favor, descreva a solicitação primeiro.");
            return;
        }
        setIsParsing(true);
        const result = await parseServiceRequest(geminiPrompt);
        if (result) {
            setServiceType(result.serviceType);
            setNotes(result.notes);
        }
        setIsParsing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientId || !serviceType || !location || !scheduledDate) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        setIsSubmitting(true);
        try {
            await addServiceOrder({
                clientId,
                serviceType,
                location,
                scheduledDate: new Date(scheduledDate).toISOString(),
                notes,
            });
            alert('Ordem de Serviço criada com sucesso!');
            navigate('/service-orders');
        } catch (error) {
            alert(`Falha ao criar Ordem de Serviço: ${(error as Error).message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClientId = e.target.value;
        const selectedClient = clients.find(c => c.id === selectedClientId);
        setClientId(selectedClientId);
        if (selectedClient) {
            const fullAddress = `${selectedClient.street}, ${selectedClient.number}, ${selectedClient.neighborhood}, ${selectedClient.city} - ${selectedClient.state}, ${selectedClient.zipCode}`;
            setLocation(fullAddress);
        }
    };
    
    useEffect(() => {
        if (clients.length > 0 && !clientId) {
            const firstClient = clients[0];
            setClientId(firstClient.id);
            const fullAddress = `${firstClient.street}, ${firstClient.number}, ${firstClient.neighborhood}, ${firstClient.city} - ${firstClient.state}, ${firstClient.zipCode}`;
            setLocation(fullAddress);
        }
    }, [clients, clientId]);

    const formDisabled = isParsing || isSubmitting;

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Criar Nova Ordem de Serviço</CardTitle>
                <CardDescription>Preencha os detalhes abaixo para agendar um novo serviço.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset disabled={formDisabled}>
                        <div className="space-y-2">
                            <Label>Descreva a solicitação (Opcional)</Label>
                            <div className="flex items-center space-x-2">
                                <Textarea 
                                    placeholder="Ex: O cliente ligou reclamando que o ar condicionado do escritório principal não está gelando e faz um barulho estranho."
                                    value={geminiPrompt}
                                    onChange={(e) => setGeminiPrompt(e.target.value)}
                                />
                                <Button type="button" onClick={handleGeminiParse} disabled={isParsing} className="self-start">
                                    {isParsing ? <Spinner className="w-5 h-5 mr-2"/> : <Sparkles className="w-5 h-5 mr-2" />}
                                    {isParsing ? 'Analisando...' : 'Analisar com IA'}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Use a IA para preencher o Tipo de Serviço e Observações automaticamente.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="client">Cliente</Label>
                                <Select id="client" value={clientId} onChange={handleClientChange}>
                                    {clients.length === 0 && <option>Carregando clientes...</option>}
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.razaoSocial || client.nomeCompleto}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="service-type">Tipo de Serviço</Label>
                                <Input id="service-type" value={serviceType} onChange={e => setServiceType(e.target.value)} placeholder="Ex: Manutenção Corretiva" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Local da Execução</Label>
                                <Input id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Endereço completo" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="scheduled-date">Data e Hora Agendada</Label>
                                <Input id="scheduled-date" type="datetime-local" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} required />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <Label htmlFor="notes">Observações Técnicas</Label>
                            <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Detalhes técnicos, equipamentos necessários, etc." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="photos">Upload de Fotos (Opcional)</Label>
                            <Input id="photos" type="file" multiple />
                        </div>
                    </fieldset>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => navigate(-1)} disabled={formDisabled}>Cancelar</Button>
                        <Button type="submit" disabled={formDisabled}>
                            {isSubmitting && <Spinner className="w-4 h-4 mr-2"/>}
                            {isSubmitting ? 'Salvando...' : 'Salvar Ordem de Serviço'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateServiceOrder;