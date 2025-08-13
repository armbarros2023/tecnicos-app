import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Phone, Building2, LayoutDashboard, ChevronDown, Package, Users, Notebook, LogOut } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAppContext();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const getNavLinkClass = (isActive: boolean) =>
        cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'w-full justify-start',
            isActive ? 'text-white bg-primary/20' : 'text-gray-300 hover:text-white hover:bg-slate-700'
        );

    const getTopLevelLinkClass = (isActive: boolean) =>
        cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full justify-start px-4 py-3 text-base',
            isActive ? 'bg-primary text-white' : 'text-gray-300 hover:text-white hover:bg-slate-700'
        );

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-slate-700 px-4">
        <Phone className="w-8 h-8 text-primary" />
        <h1 className="text-lg font-bold ml-2 text-center">Tecnicos em Telefonia</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Collapsible open={location.pathname.startsWith('/clients') || location.pathname.startsWith('/products') || location.pathname.startsWith('/users')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-4 py-3">
              <span className="flex items-center">
                <Building2 className="w-5 h-5 mr-3" />
                Cadastros
              </span>
              <ChevronDown className="w-5 h-5" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
            <NavLink to="/clients" className={({ isActive }) => getNavLinkClass(isActive)}>
              <span>Clientes</span>
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => getNavLinkClass(isActive)}>
              <span>Produtos</span>
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => getNavLinkClass(isActive)}>
              <span>Usuários</span>
            </NavLink>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={location.pathname.startsWith('/quotes')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-4 py-3">
              <span className="flex items-center">
                <Notebook className="w-5 h-5 mr-3" />
                Orçamentos
              </span>
              <ChevronDown className="w-5 h-5" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
            <NavLink to="/quotes/new" className={({ isActive }) => getNavLinkClass(isActive)}>
              <span>Criar Orçamento</span>
            </NavLink>
            <NavLink to="/quotes" className={({ isActive }) => getNavLinkClass(isActive)}>
              <span>Listar Orçamentos</span>
            </NavLink>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={location.pathname.startsWith('/service-orders')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-4 py-3">
              <span className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                Ordens de Serviço
              </span>
              <ChevronDown className="w-5 h-5" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
            <NavLink to="/service-orders/new" className={({ isActive }) => getNavLinkClass(isActive)}>
              <span>Nova OS</span>
            </NavLink>
            <NavLink to="/service-orders" className={({ isActive }) => getNavLinkClass(isActive)}>
              <span>Listar OS</span>
            </NavLink>
          </CollapsibleContent>
        </Collapsible>

        <NavLink to="/reports" className={({ isActive }) => getTopLevelLinkClass(isActive)}>
          <BarChart3 className="w-5 h-5 mr-3" />
          Relatórios
        </NavLink>

        <NavLink to="/dashboard" className={({ isActive }) => getTopLevelLinkClass(isActive)}>
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
      </nav>
      <div className="mt-auto px-4 py-4 border-t border-slate-700">
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700 px-4 py-3 rounded-lg mb-2 text-base">
            <LogOut className="w-5 h-5 mr-3" />
            Sair
        </Button>
        <p className="text-xs text-slate-500 text-center">© 2024 Tecnicos em Telefonia</p>
      </div>
    </aside>
  );
};

export default Sidebar;