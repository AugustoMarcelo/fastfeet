import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FaSpinner } from 'react-icons/fa';

import { signInRequest } from '~/store/modules/auth/actions';

import Input from '~/components/Form/Input';

import logo from '~/assets/logo.png';
import { Container, Card, Logo } from './styles';

export default function Login() {
  const formRef = useRef(null);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      dispatch(signInRequest(email, password));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Card>
        <Logo>
          <img src={logo} width={250} alt="FastFeet" />
        </Logo>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="E-mail:"
            placeholder="example@email.com"
          />
          <Input
            name="password"
            type="password"
            label="Senha:"
            placeholder="*******"
          />
          <button type="submit" disabled={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner size={20} color="#fff" />
            ) : (
              'Entrar no sistema'
            )}
          </button>
        </Form>
      </Card>
    </Container>
  );
}
