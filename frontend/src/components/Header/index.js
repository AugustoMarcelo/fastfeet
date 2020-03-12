import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  ContentLeft,
  ContentRight,
  Logo,
  Navigation,
} from './styles';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <Container>
      <ContentLeft>
        <Logo>
          <img src={logo} height={25} width={135} alt="FastFeet Logo" />
        </Logo>
        <Navigation>
          <li>
            <Link to="/deliveries">Encomendas</Link>
          </li>
          <li>
            <Link to="/deliveryman">Entregadores</Link>
          </li>
          <li>
            <Link to="/recipients">Destinatários</Link>
          </li>
          <li>
            <Link to="/problems">Problemas</Link>
          </li>
        </Navigation>
      </ContentLeft>
      <ContentRight>
        <strong>Admin FastFeet</strong>
        <button type="button">sair do sistema</button>
      </ContentRight>
    </Container>
  );
}
