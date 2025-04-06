import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../Toast'; // importa seu componente Toast

// Cria o contexto
const ToastContext = createContext();

// Provider que envolve a aplicação
export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  const showToast = useCallback((msg, tipo = 'success') => {
    setMessage(msg);
    setType(tipo);
  }, []);

  // Limpa o toast após a exibição
  const handleClose = () => {
    setMessage('');
    setType('');
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} type={type} onClose={handleClose} />
    </ToastContext.Provider>
  );
};

// Hook para usar o toast
export const useToast = () => useContext(ToastContext);
