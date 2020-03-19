import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import PageHeaderList from '../../components/PageHeaderList';
import DropdownMenu from '~/components/Dropdown';
import Pagination from '~/components/Pagination';
import { EmptyContent } from '~/components/styles/Table';
import { Table } from './styles';

export default function Recipients() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [query, setQuery] = useState('');
  const [recipients, setRecipients] = useState([]);

  async function loadRecipients() {
    const response = await api.get('recipients');
    console.tron.log(response.data.rows);
    setRecipients(response.data.rows);
  }

  useEffect(() => {
    loadRecipients();
  }, []);

  function handleClick() {
    console.tron.log('Abrir página de cadastro');
  }

  function handleSearch(text) {
    setQuery(text);
  }

  useEffect(() => {
    loadRecipients();
  }, [query]);

  useEffect(() => {
    loadRecipients();
  }, [pagination]);

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
        pageTitle="Gerenciando destinatários"
        inputPlaceholder="Buscar por destinatários"
        handleClick={handleClick}
        handleSearch={handleSearch}
      />
      {recipients.length ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipient => (
              <tr key={recipient.id}>
                <td>{`#${recipient.id}`}</td>
                <td>{recipient.name}</td>
                <td>{`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}</td>
                <td>
                  <DropdownMenu onEdit={() => {}} onDelete={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyContent>Nenhum destinatário encontrado</EmptyContent>
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={
          recipients.length === 0 || recipients.length < pagination.limit
        }
      />
    </>
  );
}
