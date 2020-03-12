import React from 'react';

import PageHeaderList from '../../components/PageHeaderList';

export default function Recipients() {
  function handleClick() {
    console.tron.log('Abrir página de cadastro');
  }

  function handleSearch(text) {
    console.tron.log(text);
  }

  return (
    <PageHeaderList
      pageTitle="Gerenciando destinatários"
      inputPlaceholder="Buscar por destinatários"
      handleClick={handleClick}
      handleSearch={handleSearch}
    />
  );
}
