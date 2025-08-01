import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
    BarChart3, Phone, Building2, LayoutDashboard, ChevronDown, Package, Users, Notebook, LogOut
} from '../icons/IconComponents';
import { useAppContext } from '../../hooks/useAppContext';
import Button from '../ui/Button';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAppContext();

    const [openSections, setOpenSections] = useState({
        os: false,
        cadastros: false,
        orcamentos: false,
    });

    useEffect(() => {
        setOpenSections({
            os: location.pathname.startsWith('/service-orders'),
            cadastros: location.pathname.startsWith('/clients') || location.pathname.startsWith('/products') || location.pathname.startsWith('/users'),
            orcamentos: location.pathname.startsWith('/quotes'),
        });
    }, [location.pathname]);

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
            isActive ? 'text-primary font-semibold' : 'text-gray-300 hover:text-white'
        }`;

    const topLevelLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 text-gray-200 hover:bg-slate-700 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-primary text-white' : 'text-gray-300'
        }`;
    
    const sectionButtonClasses = "flex items-center justify-between w-full px-4 py-3 text-gray-200 hover:bg-slate-700 rounded-lg transition-colors duration-200";

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-slate-700 px-4">
        <Phone className="w-8 h-8 text-primary" />
        <h1 className="text-lg font-bold ml-2 text-center">Tecnicos em Telefonia</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div>
            <button onClick={() => toggleSection('cadastros')} className={sectionButtonClasses} aria-expanded={openSections.cadastros}>
                <span className="flex items-center">
                    <Building2 className="w-5 h-5 mr-3" />
                    Cadastros
                </span>
                <ChevronDown className={`w-5 h-5 transform transition-transform duration-200 ${openSections.cadastros ? 'rotate-180' : ''}`} />
            </button>
            {openSections.cadastros && (
                <div className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
                     <NavLink to="/clients" className={navLinkClasses}>
                        <span>Clientes</span>
                    </NavLink>
                    <NavLink to="/products" className={navLinkClasses}>
                        <span>Produtos</span>
                    </NavLink>
                     <NavLink to="/users" className={navLinkClasses}>
                        <span>Usuários</span>
                    </NavLink>
                </div>
            )}
        </div>
        
        <div>
            <button onClick={() => toggleSection('orcamentos')} className={sectionButtonClasses} aria-expanded={openSections.orcamentos}>
                <span className="flex items-center">
                    <Notebook className="w-5 h-5 mr-3" />
                    Orçamentos
                </span>
                <ChevronDown className={`w-5 h-5 transform transition-transform duration-200 ${openSections.orcamentos ? 'rotate-180' : ''}`} />
            </button>
            {openSections.orcamentos && (
                <div className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
                     <NavLink to="/quotes/new" className={navLinkClasses}>
                        <span>Criar Orçamento</span>
                    </NavLink>
                    <NavLink to="/quotes" className={navLinkClasses}>
                        <span>Listar Orçamentos</span>
                    </NavLink>
                </div>
            )}
        </div>
        
        <div>
            <button onClick={() => toggleSection('os')} className={sectionButtonClasses} aria-expanded={openSections.os}>
                <span className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    Ordens de Serviço
                </span>
                <ChevronDown className={`w-5 h-5 transform transition-transform duration-200 ${openSections.os ? 'rotate-180' : ''}`} />
            </button>
            {openSections.os && (
                <div className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
                    <NavLink to="/service-orders/new" className={navLinkClasses}>
                        <span>Nova OS</span>
                    </NavLink>
                    <NavLink to="/service-orders" className={navLinkClasses}>
                        <span>Listar OS</span>
                    </NavLink>
                </div>
            )}
        </div>

        <NavLink to="/reports" className={topLevelLinkClasses}>
          <BarChart3 className="w-5 h-5 mr-3" />
          Relatórios
        </NavLink>

        <NavLink to="/dashboard" className={topLevelLinkClasses}>
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