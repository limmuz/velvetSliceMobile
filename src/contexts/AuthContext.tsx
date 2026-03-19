import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipagem do utilizador que vem da base de dados (Backend)
interface User {
  id: string;
  name: string;
  email: string;
}

// Tipagem do contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

// Criação do Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, pass: string) => {
    // 100% REAL - Sem Mocks!
    try {
      // ATENÇÃO: No emulador Android, o 'localhost' do computador é o IP 10.0.2.2
      // Se estiveres a testar num telemóvel físico, deves colocar o IP da tua máquina na rede Wi-Fi (ex: 192.168.1.X)
      const apiUrl = 'http://10.0.2.2:8080/api/login'; 

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, senha: pass }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação. Verifica as tuas credenciais.');
      }

      // Recebe os dados reais da base de dados do teu Spring Boot
      const data = await response.json();
      
      setUser({ 
        id: data.id, 
        name: data.nome, // Confirma se no teu backend a propriedade é "nome" ou "name"
        email: data.email
      });

    } catch (error) {
      console.error("Erro na comunicação com a API real:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar noutros ecrãs
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};