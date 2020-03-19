import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  ContentLeft,
  ContentRight,
  Logo,
  Navigation,
} from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedMenus, setSelectedMenus] = useState({
    deliveries: '',
    deliveryman: '',
    recipients: '',
    problems: '',
  });

  useEffect(() => {
    const endpoint = location.pathname.split('/').filter(char => {
      return char !== '';
    });

    switch (`/${endpoint[0]}`) {
      case '/deliveries':
        setSelectedMenus({ deliveries: 'active' });
        break;
      case '/deliveryman':
        setSelectedMenus({ deliveryman: 'active' });
        break;
      case '/recipients':
        setSelectedMenus({ recipients: 'active' });
        break;
      default:
        setSelectedMenus({ problems: 'active' });
        break;
    }
  }, [location]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <ContentLeft>
        <Logo>
          <img src={logo} height={26} width={135} alt="FastFeet Logo" />
        </Logo>
        <Navigation>
          <li>
            <Link to="/deliveries" className={`${selectedMenus.deliveries}`}>
              Encomendas
            </Link>
          </li>
          <li>
            <Link to="/deliveryman" className={`${selectedMenus.deliveryman}`}>
              Entregadores
            </Link>
          </li>
          <li>
            <Link to="/recipients" className={`${selectedMenus.recipients}`}>
              Destinatários
            </Link>
          </li>
          <li>
            <Link to="/problems" className={`${selectedMenus.problems}`}>
              Problemas
            </Link>
          </li>
        </Navigation>
      </ContentLeft>
      <ContentRight>
        <strong>{profile.name}</strong>
        <button type="button" onClick={handleLogout}>
          sair do sistema
        </button>
      </ContentRight>
    </Container>
  );
}
