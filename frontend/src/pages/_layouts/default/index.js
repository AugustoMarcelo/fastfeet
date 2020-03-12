import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import { Container, Content } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
