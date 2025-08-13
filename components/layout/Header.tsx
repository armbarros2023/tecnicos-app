
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Header: React.FC = () => {
    const { logout } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-20 bg-card border-b border-border flex items-center justify-end px-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-6 w-6"/>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </Button>
                <div className="w-px h-8 bg-border"></div>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                    <LogOut className="w-5 h-5 mr-2" />
                    Sair
                </Button>
            </div>
        </header>
    );
};

export default Header;
