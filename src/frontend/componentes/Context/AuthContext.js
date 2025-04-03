import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [idCliente, setIdCliente] = useState(null);

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
    
    const login = (userData, id) => {
        if (!userData) {
            console.error("Tentativa de login falhou: dados inválidos");
            return;
        }
        console.log("Armazenando usuário no contexto:", userData);
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
    };

    return (
        <AuthContext.Provider value={{ user, idCliente, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};