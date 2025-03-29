import { Link, useNavigate } from "react-router-dom";
import perfil from "../../../imagens/perfil.png";
import carrinho from "../../../imagens/carrinho.png";
import styled from "styled-components";

const Icone = styled.li`
  margin-right: 40px;

  img {
    width: 25px;
    height: 25px;
  }
`;

const Icones = styled.ul`
  display: flex;
  align-items: center;
`;

const usuarioEstaLogado = () => {
  return localStorage.getItem("usuarioLogado");
};

const icones = [
  { imagem: carrinho, rota: "/carrinho", id: "header-iconeCarrinho" },
];

function IconesHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("usuarioId"); // Removendo também o ID do usuário
    navigate("/login");
  }

  return (
    <Icones>
      {icones.map((icone, index) => (
        <Link key={index} to={icone.rota} style={{ textDecoration: "none" }}>
          <Icone>
            <img src={icone.imagem} alt="" />
          </Icone>
        </Link>
      ))}

      <Link
        to={usuarioEstaLogado() ? "/dados" : "/login"}
        style={{ textDecoration: "none" }}
      >
        <Icone>
          <img src={perfil} alt="Perfil" />
        </Icone>
      </Link>

      {usuarioEstaLogado() && (
        <Icone id="header-opcaoSair" onClick={handleLogout} style={{ cursor: "pointer", color: "#095F54" }}>
          Sair
        </Icone>
      )}
    </Icones>
  );
}

export default IconesHeader;
