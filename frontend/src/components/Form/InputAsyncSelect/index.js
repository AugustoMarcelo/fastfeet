import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Select from 'react-select/async';
import { useField } from '@unform/core';

import { InputGroup } from '../Input/styles';
import { Select } from './styles';

export default function InputAsyncSelect({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <InputGroup>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Select
        id={fieldName}
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        noOptionsMessage={() => 'Nenhum registro encontrado'}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span>{error}</span>}
    </InputGroup>
  );
}

InputAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
