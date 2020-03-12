import React from 'react';

import PageHeaderList from '../../components/PageHeaderList';

export default function Deliveries() {
  function handleAddClick() {
    console.tron.log('Mudar de página');
  }

  function handleSearch(text) {
    if (text.length > 3) {
      console.tron.log(text);
    }
  }

  return (
    <PageHeaderList
      pageTitle="Gerenciando encomendas"
      inputPlaceholder="Buscar por encomendas"
      handleClick={handleAddClick}
      handleSearch={handleSearch}
    />
  );
}
