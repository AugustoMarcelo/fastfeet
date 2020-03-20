import React, { useState, useEffect, useCallback } from 'react';

import api from '~/services/api';

import PageHeaderList from '~/components/PageHeaderList';
import Pagination from '~/components/Pagination';
import DropdownMenu from '~/components/Dropdown';
import { EmptyContent } from '~/components/styles/Table';
import { Table } from './styles';

export default function Deliveryman() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [query, setQuery] = useState('');
  const [deliveryman, setDeliveryman] = useState([]);

  const loadDeliveryman = useCallback(async () => {
    const response = await api.get('deliverymen', {
      params: {
        ...pagination,
        q: query,
      },
    });
    setDeliveryman(response.data.rows);
  }, [pagination, query]);

  useEffect(() => {
    loadDeliveryman();
  }, [loadDeliveryman]);

  function handleClick() {
    console.tron.log('Página de cadastro');
  }

  function handleSearch(text) {
    setQuery(text);
  }

  function handleNextPage() {
    const { page } = pagination;
    setPagination({
      ...pagination,
      page: page + 1,
    });
  }

  function handlePreviousPage() {
    const { page } = pagination;
    setPagination({
      ...pagination,
      page: page - 1,
    });
  }

  return (
    <>
      <PageHeaderList
        pageTitle="Gerenciando entregadores"
        inputPlaceholder="Buscar por entregadores"
        handleClick={handleClick}
        handleSearch={handleSearch}
      />
      {deliveryman.length ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveryman.map(man => (
              <tr key={man.id}>
                <td>{`#${man.id}`}</td>
                <td className="deliveryman">
                  <img
                    src={
                      man.avatar.url ||
                      `https://ui-avatars.com/api/?size=32&rounded=true&name=${man.name}`
                    }
                    alt="Avatar"
                  />
                </td>
                <td>{man.name}</td>
                <td>{man.email}</td>
                <td>
                  <DropdownMenu onEdit={() => {}} onDelete={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyContent>Nenhum entregador encontrado</EmptyContent>
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={
          deliveryman.length === 0 || deliveryman.length < pagination.limit
        }
      />
    </>
  );
}
