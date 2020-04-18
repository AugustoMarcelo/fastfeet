import styled from 'styled-components';
import { darken } from 'polished';
import { Table as TableStyle } from '~/components/styles/Table';

export const Table = styled(TableStyle)`
  @media only screen and (max-width: 850px) {
    td {
      &:nth-of-type(1):before {
        content: 'ID';
        font-weight: bold;
      }
      &:nth-of-type(2):before {
        content: 'Destinatário';
        font-weight: bold;
      }
      &:nth-of-type(3):before {
        content: 'Entregador';
        font-weight: bold;
      }
      &:nth-of-type(4):before {
        content: 'Cidade';
        font-weight: bold;
      }
      &:nth-of-type(5):before {
        content: 'Estado';
        font-weight: bold;
      }
      &:nth-of-type(6):before {
        content: 'Status';
        font-weight: bold;
      }
      &:nth-of-type(7):before {
        content: 'Ações';
        font-weight: bold;
      }
    }
  }
`;

export const Delivery = styled.div`
  display: flex;
  flex-direction: column;

  color: #666;

  > strong {
    color: initial;
  }

  .recipient {
    border-bottom: 1px solid #eee;

    p {
      margin-bottom: 5px;
    }
  }

  > strong {
    margin: 10px 0;
  }

  .data {
    border-bottom: 1px solid #eee;

    div {
      margin-bottom: 5px;
    }
  }

  img {
    margin: 15px 0;
    text-align: center;
    width: 250px;
    align-self: center;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FilterActions = styled.ul`
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;

  button {
    border: 0;
    background: transparent;
    padding: 10px;
    font-weight: bold;
  }

  li {
    button {
      color: #999;
      transition: all 0.2s;
    }

    &:hover {
      button {
        color: ${darken(0.15, '#999')};
      }
    }
  }

  li.active {
    button {
      color: #7d40e7;
      border-bottom: 2px solid #7d40e7;
      transition: all 0.2s;
    }

    &:hover {
      button {
        color: ${darken(0.15, '#7d40e7')};
        border-color: ${darken(0.15, '#7d40e7')};
      }
    }
  }
`;
