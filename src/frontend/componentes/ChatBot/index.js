import React, { useState } from "react";
import styled from "styled-components";
import { FaCommentDots, FaTimes } from "react-icons/fa";

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fdc818;
  border: 2px solid #004a33;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 24px;
  font-family: "Bookochi";
  letter-spacing: 0.22em;
  transition: background 0.3s;

  &:hover {
    background-color: #004a33;
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 270px;
  height: 350px;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #004a33;
  border-left: 1px solid #004a33;
  border-radius: 25px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  font-family: "Bookochi";
  letter-spacing: 0.22em;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background-color: rgb(243, 222, 154);
  color: rgb(0, 0, 0);
  padding: 5px;
  text-align: center;
  font-size: 14px;
  font-family: "Bookochi";
  letter-spacing: 0.22em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #004a33;
  border-radius: 12px 12px 0 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 16px;
  font-family: "Bookochi";
  letter-spacing: 0.22em;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  padding: 8px;
  border-radius: 5px;
  font-size: 12px;
  max-width: 70%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isUser ? "#3F9F81" : "#E38D65")};
  color: ${(props) => (props.isUser ? "white" : "black")};
`;

const ChatFooter = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #004a33;
  padding: 8px;
  background: white;
  border-radius: 12px;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  outline: none;
  font-size: 12px;
  font-family: "Bookochi";
  letter-spacing: 0.22em;
  max-width: 92%;
`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Olá! Qual livro gostaria de avaliar?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // controle do fluxo da conversa
  const [step, setStep] = useState(1);
  const [bookName, setBookName] = useState("");

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && input.trim()) {
      const userMessage = { text: input.trim(), isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
        if (step === 1) {
          // usuário respondeu o livro
          setBookName(userMessage.text);
          setMessages((prev) => [
            ...prev,
            { text: `Entendido! E qual seria sua avaliação para "${userMessage.text}"?`, isUser: false },
          ]);
          setStep(2);
        } else if (step === 2) {
          // usuário respondeu avaliação, manda para backend
          const response = await fetch("http://localhost:5000/api/classificacoesIA/sentimento", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: userMessage.text }),
          });

          if (!response.ok) {
            throw new Error("Erro ao conectar com a API");
          }

          const data = await response.json();

          setMessages((prev) => [
            ...prev,

            {
              text: `Análise do livro "${bookName}":\nSentimento:${data.resultado.sentimento} \nConfiança: ${data.resultado.confianca}`,
              isUser: false,
            },
              
            { text: "Quer avaliar outro livro? Qual livro gostaria de avaliar?", isUser: false },
          ]);
          setStep(1);
          setBookName("");
        }
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          { text: "Erro ao processar sua avaliação.", isUser: false },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)}>
        <FaCommentDots />
      </ChatButton>

      <ChatContainer open={isOpen}>
        <ChatHeader>
          Selah
          <CloseButton onClick={() => setIsOpen(false)}>
            <FaTimes />
          </CloseButton>
        </ChatHeader>

        <ChatMessages>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>
              {msg.text}
            </Message>
          ))}
          {loading && <Message isUser={false}>Analisando seu feedback... ⏳</Message>}
        </ChatMessages>

        <ChatFooter>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSendMessage}
            placeholder="Digite uma mensagem..."
            disabled={loading}
          />
        </ChatFooter>
      </ChatContainer>
    </>
  );
}

export default Chatbot;
