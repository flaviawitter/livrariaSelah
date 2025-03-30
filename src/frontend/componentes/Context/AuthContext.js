import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser && storedUser !== "undefined") { // Garante que não seja 'undefined'
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao fazer parse do usuário salvo:", error);
        localStorage.removeItem("user"); // Remove dados corrompidos
      }
    }
  }, []);
  
  
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Armazena o objeto completo
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
