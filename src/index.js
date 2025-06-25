import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './frontend/rotas/Home';
import Favoritos from './frontend/rotas/Favoritos';
import Dados from './frontend/rotas/Dados';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './frontend/rotas/Login';
import Cadastrar from './frontend/rotas/Cadastrar';
import Pesquisa from './frontend/rotas/Pesquisa';
import Livro from './frontend/rotas/Livro';
import Carrinho from './frontend/rotas/Carrinho';
import HomeAdministrador from './frontend/rotas/HomeAdministrador';
import PedidosAdm from './frontend/rotas/PedidosAdm';
import Relatorio from './frontend/rotas/Relatorio'
import ClientesAdm from './frontend/rotas/ClientesAdm'
import PedidosCliente from './frontend/rotas/PedidosCliente'
import CuponsCliente from './frontend/rotas/CuponsCliente'
import ResumoPedido from './frontend/rotas/ResumoPedido'
import { AuthProvider } from "../src/frontend/componentes/Context/AuthContext";
import { ToastProvider } from '../src/frontend/componentes/Context/ToastContext';
import Toast from '../src/frontend/componentes/Toast';
import Detalhes from './frontend/rotas/DetalhesPedido';
import DetalhesAdm from './frontend/rotas/DetalhesPedidoAdm';


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
  <ToastProvider>
    <AuthProvider>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/favoritos' element = {<Favoritos />} />
        <Route path='/dados' element = {<Dados />} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/cadastrar' element = {<Cadastrar/>} />
        <Route path='/detalhes' element = {<Detalhes/>} />
        <Route path='/pesquisa' element = {<Pesquisa/>} />
        <Route path='/livro/:id' element = {<Livro/>} />
        <Route path='/carrinho' element = {<Carrinho/>} />
        <Route path='/dados/:id' element = {<Dados />} />
        <Route path='/adm' element = {<HomeAdministrador />} />     
        <Route path='/pedidosadm' element = {<PedidosAdm />} />        
        <Route path='/relatorio' element = {<Relatorio />} />              
        <Route path='/clientesadm' element = {<ClientesAdm />} />   
        <Route path='/pedidoscliente' element = {<PedidosCliente />} /> 
        <Route path='/cuponscliente' element = {<CuponsCliente />} />  
        <Route path='/resumo' element = {<ResumoPedido />} /> 
        <Route path='/detalhesadm' element = {<DetalhesAdm/>} />

      </Routes>

      <Toast />

    </BrowserRouter>
    </AuthProvider>
    </ToastProvider>
);
