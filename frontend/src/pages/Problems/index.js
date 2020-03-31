import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import PageHeaderList from '~/components/PageHeaderList';
import DropdownMenu from '~/components/Dropdown';
import { EmptyContent } from '~/components/styles/Table';
import Modal from '~/components/Modal';
import { Table } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState('');

  const modalRef = useRef(null);

  const loadProblems = useCallback(async () => {
    const response = await api.get('deliveries/problems', {
      params: {
        q: query,
      },
    });
    setProblems(response.data.rows);
  }, [query]);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  function handleSearch(text) {
    setQuery(text);
  }

  async function handleCancelDelivery(id) {
    const result = window.confirm('Deseja realmente cancelar a encomenda?');

    if (result) {
      try {
        await api.put(`problem/${id}/cancel-delivery`);

        setProblems(problems.filter(problem => problem.delivery.id !== id));

        toast.success('Encomenda cancelada com sucesso');
      } catch (err) {
        toast.error('Não foi possível cancelar a encomenda. Tente mais tarde.');
      }
    }
  }

  const content = data => {
    return <div>{data}</div>;
  };

  function handleViewProblem(problem) {
    modalRef.current.setModalContent(content(problem.description));
    modalRef.current.show();
  }

  return (
    <>
      <PageHeaderList
        pageTitle="Problemas na entrega"
        inputPlaceholder="Buscar por encomendas"
        handleSearch={handleSearch}
      />
      {problems.length ? (
        <Table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td>{`#${problem.delivery.id}`}</td>
                <td>{problem.description}</td>
                <td>
                  <DropdownMenu
                    onView={() => handleViewProblem(problem)}
                    onDelete={() => handleCancelDelivery(problem.id)}
                    deleteLabel="Cancelar encomenda"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyContent>Nenhuma encomenda com problemas</EmptyContent>
      )}
      <Modal ref={modalRef} modalTitle="Visualizar problema" />
    </>
  );
}
