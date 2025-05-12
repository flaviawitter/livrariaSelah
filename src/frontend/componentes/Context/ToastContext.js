import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../Toast'; // importa seu componente Toast

// Cria o contexto
const ToastContext = createContext();

// Provider que envolve a aplicação
export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
  const [toastId, setToastId] = useState(null); // ✅ aqui está o estado que faltava

  // função que exibe o toast
  const showToast = useCallback((msg, tipo = 'success', id = null) => {
    setMessage(msg);
    setType(tipo);
    setToastId(id); // ✅ aqui usamos o parâmetro corretamente
  }, []);

  // função para limpar o toast
  const handleClose = () => {
    setMessage('');
    setType('');
    setToastId(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, message, type, toastId, handleClose }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

// Hook para usar o toast
export const useToast = () => useContext(ToastContext);
