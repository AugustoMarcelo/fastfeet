import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import { Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
