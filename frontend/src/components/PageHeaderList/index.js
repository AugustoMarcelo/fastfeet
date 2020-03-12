import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdSearch } from 'react-icons/md';

import InputIcon from '../InputIcon';
import { Container, Title, Actions } from './styles';

export default function PageHeaderList({
  pageTitle,
  inputPlaceholder,
  handleClick,
  handleSearch,
}) {
  return (
    <Container>
      <Title>{pageTitle}</Title>
      <Actions>
        <InputIcon
          icon={MdSearch}
          type="text"
          placeholder={inputPlaceholder}
          onChange={e => handleSearch(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          <MdAdd size={18} color="#fff" />
          Cadastrar
        </button>
      </Actions>
    </Container>
  );
}

PageHeaderList.propTypes = {
  pageTitle: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
