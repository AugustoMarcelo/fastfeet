import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  padding: 50px 30px;

  form {
    button {
      background: #7d40e7;
      border-radius: 4px;
      width: 100%;
      height: 45px;
      color: #fff;
      border: none;
      font-weight: bold;
      transition: background 0.2s;

      &[disabled] {
        cursor: not-allowed;
        background: #bbb;
        color: #888;

        svg {
          animation: ${rotate} 2s linear infinite;
        }
      }

      &:hover:not([disabled]) {
        background: ${darken(0.08, '#7d40e7')};
      }
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
