import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { InputGroup } from './styles';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputGroup>
      {label && <label>{label}</label>}
      <input ref={inputRef} {...rest} defaultValue={defaultValue} />
    </InputGroup>
  );
}
