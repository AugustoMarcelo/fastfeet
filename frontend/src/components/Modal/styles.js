import styled from 'styled-components';
import { darken } from 'polished';

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px #00000033;
  min-width: 450px;
  padding: 20px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    font-weight: bold;
    text-transform: uppercase;

    button {
      border: 0;
      background: transparent;

      svg {
        transition: fill 0.2s;
      }

      &:hover {
        svg {
          fill: ${darken(0.15, '#bbb')};
        }
      }
    }
  }
`;
