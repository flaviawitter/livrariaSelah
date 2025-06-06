import React, { useEffect } from 'react'; 
import styled, { keyframes } from 'styled-components';
import { useToast } from '../Context/ToastContext';

const fadein = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const fadeout = keyframes` 
  from { opacity: 1; transform: translateY(0); } 
  to { opacity: 0; transform: translateY(20px); }
`;

const ToastWrapper = styled.div` 
  position: fixed; 
  bottom: 20px; 
  right: 20px; 
  background-color: ${({ type }) => 
    type === 'success' ? '#095F54' : 
    type === 'error' ? '#c0392b' : 
    type === 'warning' ? '#f39c12' : 
    '#333'}; 
  color: white; 
  padding: 16px 24px; 
  border-radius: 8px; 
  font-family: Bookochi;
  letter-spacing: 0.22em; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.2); 
  z-index: 1000000; 
  animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
`;

const Toast = () => {
  const { message, type, toastId, handleClose } = useToast(); // ✅ agora usando "id"

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        handleClose?.(); // esconde o toast após 3s
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, handleClose]);

  if (!message) return null;

  return (
    <ToastWrapper 
      type={type} 
      id={toastId || undefined} // ✅ aplica ID para Cypress
      data-testid={toastId || 'toast'} // ✅ também permite usar data-testid
    >
      {message}
    </ToastWrapper>
  );
};

export default Toast;
