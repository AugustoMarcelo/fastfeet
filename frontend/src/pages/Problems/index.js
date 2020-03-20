import React, { useState, useEffect, useCallback } from 'react';

import api from '~/services/api';

import PageHeaderList from '~/components/PageHeaderList';
import DropdownMenu from '~/components/Dropdown';
import { EmptyContent } from '~/components/styles/Table';
import { Table } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState('');

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
                    onView={() => {}}
                    onDelete={() => {}}
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
    </>
  );
}
