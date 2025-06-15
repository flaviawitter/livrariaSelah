import React, { useState } from "react";
import styled from "styled-components";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import { buscarLivrosPorTermo } from "../../serviços/livros";

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
    { text: "Olá! Digite o nome de um livro para avaliarmos.", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && input.trim()) {
      const userInput = input.trim();
      const userMessage = { text: userInput, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const livros = await buscarLivrosPorTermo(userInput);

        if (livros.length === 0) {
          setMessages((prev) => [
            ...prev,
            { text: "Desculpe, não encontrei esse livro no banco. Tente outro nome.", isUser: false },
          ]);
        } else {
          const livroParaIA = livros[0].titulo;
          
          const respostaIA = await fetch("http://localhost:5000/api/classificacoesGemini/avaliar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ livro: livroParaIA })
          }).then(res => res.json());

          setMessages((prev) => [
            ...prev,
            { text: respostaIA.resposta, isUser: false },
          ]);
        }
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          { text: "Erro ao buscar ou avaliar o livro. Tente novamente.", isUser: false },
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
          {loading && <Message isUser={false}>Buscando informações... ⏳</Message>}
        </ChatMessages>

        <ChatFooter>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSendMessage}
            placeholder="Digite o nome do livro..."
            disabled={loading}
          />
        </ChatFooter>
      </ChatContainer>
    </>
  );
}

export default Chatbot;
