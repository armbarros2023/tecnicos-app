import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import { User, Lock } from '../components/icons/IconComponents';
import Spinner from '../components/ui/Spinner';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedUsername = window.localStorage.getItem('fieldservice_username');
      if (savedUsername) {
        setUsername(savedUsername);
        setRememberMe(true);
        setPassword(''); // Clear password for security if a user is remembered
      } else {
        // No saved user, so set the test defaults
        setUsername('administrador');
        setPassword('112233');
        setRememberMe(true);
      }
    } catch (error) {
      console.warn('Could not manage login credentials', error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(username, password);

      try {
        if (rememberMe) {
          window.localStorage.setItem('fieldservice_username', username);
        } else {
          window.localStorage.removeItem('fieldservice_username');
        }
      } catch (error) {
        console.error('Failed to handle "Remember me" state:', error);
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || "Falha no login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('A funcionalidade de recuperação de senha não está disponível no momento. Por favor, entre em contato com o administrador.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-400 to-blue-800 font-sans">
      <div className="w-full max-w-sm p-4">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-blue-900/40 rounded-full flex items-center justify-center border-2 border-white/20 mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-xl text-white uppercase tracking-[0.3em] font-light">
            Acesso ao Sistema
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
            <Input
              id="username"
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="w-full bg-transparent border-0 border-b border-white/30 py-3 pl-12 text-white placeholder:text-white/70 focus:outline-none focus:ring-0 focus:border-white transition duration-300"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full bg-transparent border-0 border-b border-white/30 py-3 pl-12 text-white placeholder:text-white/70 focus:outline-none focus:ring-0 focus:border-white transition duration-300"
            />
          </div>

          {error && <p className="text-destructive-foreground bg-destructive/80 p-3 rounded-md text-center text-sm">{error}</p>}

          <div className="flex items-center justify-between text-sm font-light">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="h-4 w-4 rounded border-white/50 bg-transparent text-primary focus:ring-primary focus:ring-offset-transparent" 
              />
              <Label htmlFor="remember-me" className="ml-2 text-white/90">
                Lembrar-me
              </Label>
            </div>
            <a href="#" onClick={handleForgotPassword} className="text-white/90 hover:text-white hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <Button 
            type="submit" 
            variant="default"
            disabled={isLoading}
            className="w-full !bg-[#0b2648] hover:!bg-[#113768] !text-white text-base uppercase tracking-widest py-3 transition-all duration-300 shadow-lg rounded-md flex items-center justify-center"
          >
            {isLoading ? <Spinner className="w-6 h-6" /> : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;