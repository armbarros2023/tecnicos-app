
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from '@/components/ui/Sonner';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-sky-400 to-blue-800 p-6 font-sans">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;