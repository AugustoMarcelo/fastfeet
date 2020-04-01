import styled from 'styled-components';
import { darken } from 'polished';

export const LabelContainer = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ddd;
    border-radius: 50%;
    height: 160px;
    width: 160px;
    transition: border-color 0.2s;

    span {
      font-size: 16px;
      color: #ddd;
      font-weight: bold;
      transition: color 0.2s;
    }

    svg {
      transition: fill 0.2s;
    }

    &:hover {
      border-color: ${darken(0.1, '#ddd')};

      svg {
        fill: ${darken(0.1, '#ddd')};
      }

      span {
        color: ${darken(0.1, '#ddd')};
      }
    }
  }

  input {
    display: none;
  }
`;
