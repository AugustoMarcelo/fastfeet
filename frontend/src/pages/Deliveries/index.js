import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import PageHeaderList from '~/components/PageHeaderList';
import DropdownMenu from '~/components/Dropdown';
import Pagination from '~/components/Pagination';
import { EmptyContent } from '~/components/styles/Table';
import { Table } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });

  function getStatus(delivery) {
    if (delivery.canceled_at) {
      return {
        class: 'canceled',
        text: 'Cancelada',
      };
    }

    if (delivery.end_date) {
      return {
        class: 'delivered',
        text: 'Entregue',
      };
    }

    if (delivery.start_date) {
      return {
        class: 'withdrawn',
        text: 'Retirada',
      };
    }

    return {
      class: 'pending',
      text: 'Pendente',
    };
  }

  async function loadDeliveries() {
    const { limit, page } = pagination;
    const response = await api.get('/deliveries', {
      params: {
        page,
        limit,
        q: query,
      },
    });

    setDeliveries(
      response.data.rows.map(deliv => ({
        ...deliv,
        status: getStatus(deliv),
      }))
    );
  }

  useEffect(() => {
    loadDeliveries();
  }, [query]);

  useEffect(() => {
    loadDeliveries();
  }, [pagination]);

  function handleAddClick() {
    console.tron.log('Mudar de página');
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
        pageTitle="Gerenciando encomendas"
        inputPlaceholder="Buscar por encomendas"
        handleClick={handleAddClick}
        handleSearch={handleSearch}
      />
      {deliveries.length ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(delivery => (
              <tr key={delivery.id}>
                <td>{`#${delivery.id}`}</td>
                <td>{delivery.recipient.name}</td>
                <td className="deliveryman">
                  <img
                    src={`https://ui-avatars.com/api/?size=32&rounded=true&name=${delivery.deliveryman.name}`}
                    alt="Avatar"
                  />
                  {delivery.deliveryman.name}
                </td>
                <td>{delivery.recipient.city}</td>
                <td>{delivery.recipient.state}</td>
                <td>
                  <span className={`status ${delivery.status.class}`}>
                    {delivery.status.text}
                  </span>
                </td>
                <td>
                  <DropdownMenu
                    onEdit={() => alert('Saindo da página')}
                    onDelete={() => alert('Deletando usuário')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyContent>Nenhuma encomenda encontrada</EmptyContent>
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={
          deliveries.length === 0 || deliveries.length < pagination.limit
        }
      />
    </>
  );
}
