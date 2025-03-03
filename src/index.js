import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './rotas/Home';
import Favoritos from './rotas/Favoritos';
import Dados from './rotas/Dados';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './rotas/Login';
import Cadastrar from './rotas/Cadastrar';
import Pedidos from './rotas/Pedidos';
import Pesquisa from './rotas/Pesquisa';
import Livro from './rotas/Livro';

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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
