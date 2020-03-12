import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  box-shadow: 0 1px 2px #ddd;
`;

export const ContentLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #ddd;
`;

export const Navigation = styled.ul`
  display: flex;

  li {
    margin-right: 10px;

    a {
      text-transform: uppercase;
      color: #999;
      font-weight: bold;
      transition: color 0.2s;
    }
  }
`;

export const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 6px 0;

  strong {
    color: #666;
  }

  button {
    color: #ee4d64;
    background: transparent;
    border: 0;
    transition: color 0.2s;
  }
`;
