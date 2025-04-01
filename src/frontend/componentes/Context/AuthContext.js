import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);
  
  
const login = (userData) => {
    if (!userData) {
      console.error("Tentativa de login falhou: dados inválidos");
      return;
    }
    console.log("Armazenando usuário no contexto:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
