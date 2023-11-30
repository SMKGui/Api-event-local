import React, { useState } from "react";
import "./Header.css";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import MenuBar from "../../assets/images/menubar.png";

const Header = () => {
  const [exibeNavbar, setExibeNavbar] = useState(false);
  //console.log(`Exibe navbar ${exibeNavbar}`);
  return (
    <header className="headerpage">
      <Container>
        <div className="header-flex">
          <img
            src={MenuBar}
            className = 'headerpage__menubar'
            alt="Imagem menu de barras, serve para exibir ou esconder o menu do smarthphone"
            onClick={() => {
              setExibeNavbar(true);
            }}
          />

          <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} />

          <PerfilUsuario />
        </div>
      </Container>
    </header>
  );
};

export default Header;