import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './frontend/rotas/Home';
import Favoritos from './frontend/rotas/Favoritos';
import Dados from './frontend/rotas/Dados';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './frontend/rotas/Login';
import Cadastrar from './frontend/rotas/Cadastrar';
import Pedidos from './frontend/rotas/Pedidos';
import Pesquisa from './frontend/rotas/Pesquisa';
import Livro from './frontend/rotas/Livro';
import Carrinho from './frontend/rotas/Carrinho';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100vw;
    max-width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;    
  }


`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/favoritos' element = {<Favoritos />} />
        <Route path='/dados' element = {<Dados />} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/cadastrar' element = {<Cadastrar/>} />
        <Route path='/pedidos' element = {<Pedidos/>} />
        <Route path='/pesquisa' element = {<Pesquisa/>} />
        <Route path='/livro' element = {<Livro/>} />
        <Route path='/carrinho' element = {<Carrinho/>} />
        <Route path='/dados/:id' element = {<Dados />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
