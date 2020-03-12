import React from 'react';

import PageHeaderList from '../../components/PageHeaderList';

export default function Deliveryman() {
  function handleClick() {
    console.tron.log('Página de cadastro');
  }

  function handleSearch(text) {
    if (text.length > 3) {
      console.tron.log(text);
    }
  }

  return (
    <PageHeaderList
      pageTitle="Gerenciando entregadores"
      inputPlaceholder="Buscar por entregadores"
      handleClick={handleClick}
      handleSearch={handleSearch}
    />
  );
}
