import React, { useState, useEffect, useCallback, useRef } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import PageHeaderList from '~/components/PageHeaderList';
import DropdownMenu from '~/components/Dropdown';
import Pagination from '~/components/Pagination';
import Modal from '~/components/Modal';
import { EmptyContent } from '~/components/styles/Table';
import { Table, Delivery } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });

  const modalRef = useRef(null);

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

  const loadDeliveries = useCallback(async () => {
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
  }, [pagination, query]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

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

  const content = delivery => {
    return (
      <Delivery>
        <div className="recipient">
          <p>{delivery.recipient.street}</p>
          <p>
            {delivery.recipient.city} - {delivery.recipient.state}
          </p>
          <p>{delivery.recipient.zipcode}</p>
        </div>
        <strong>Datas</strong>
        <div className="data">
          <div className="item">
            <strong>Retirada:</strong> {delivery.start_date}
          </div>
          <div className="item">
            <strong>Entrega:</strong> {delivery.end_date}
          </div>
        </div>
        <strong>Assinatura do destinatário</strong>
        {delivery.signature && (
          <img src={delivery.signature.url} alt="Assinatura do destinatário" />
        )}
      </Delivery>
    );
  };

  function handleViewDelivery(delivery) {
    modalRef.current.setModalContent(content(delivery));
    modalRef.current.show();
  }

  return (
    <>
      <PageHeaderList
        pageTitle="Gerenciando encomendas"
        inputPlaceholder="Buscar por encomendas"
        handleClick={() => history.push('/deliveries/create')}
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
                    src={
                      delivery.deliveryman.avatar.url ||
                      `https://ui-avatars.com/api/?size=32&rounded=true&name=${delivery.deliveryman.name}`
                    }
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
                    onView={() => handleViewDelivery(delivery)}
                    onEdit={() => {}}
                    onDelete={() => {}}
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
      <Modal ref={modalRef} modalTitle="Informações da Encomenda" />
    </>
  );
}
