import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [idCliente, setIdCliente] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedIdCliente = localStorage.getItem("idCliente");
        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
                if (storedIdCliente) {
                    setIdCliente(storedIdCliente);
                }
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("idCliente");
            }
        }
    }, []);
    
    const login = (userData, id) => {
      if (user && user.id !== userData.id) {
        logout();
        }

      if (!userData) {
         console.error("Tentativa de login falhou: dados inválidos");
         return;
      }

      console.log("Armazenando usuário no contexto:", userData);
      console.log("Armazenando ID no contexto:", id);
      setUser(userData);
      setIdCliente(id);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("idCliente", id);
   };
    
    const logout = () => {
        setUser(null);
        setIdCliente(null);
        localStorage.removeItem("user");
        localStorage.removeItem("idCliente");
        localStorage.removeItem("usuarioLogado");
    };

    return (
        <AuthContext.Provider value={{ user, idCliente, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
   const { user, idCliente, login, logout } = useContext(AuthContext);

   return { user, idCliente, login, logout };
};