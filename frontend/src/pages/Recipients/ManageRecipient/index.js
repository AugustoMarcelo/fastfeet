import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import {
  addRecipientRequest,
  updateRecipientRequest,
} from '~/store/modules/recipients/actions';

import Input from '~/components/Form/Input';
import InputMask from '~/components/Form/InputMask';
import { Card, Block2, Block3 } from './styles';
import history from '~/services/history';

import PageHeaderManage from '~/components/PageHeaderManage';

export default function ManageRecipient() {
  const formRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  async function handleSubmitForm() {
    if (id) {
      dispatch(updateRecipientRequest(formRef.current.getData(), id));
    } else {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Campo Nome é obrigatório'),
          street: Yup.string().required('Campo Rua é obrigatório'),
          number: Yup.string().required('Campo Número é obrigatório'),
          city: Yup.string().required('Campo Cidade é obrigatório'),
          state: Yup.string().required('Campo Estado é obrigatório'),
          zipcode: Yup.string().required('Campo CEP é obrigatório'),
        });

        await schema.validate(formRef.current.getData(), {
          abortEarly: false,
        });

        dispatch(addRecipientRequest(formRef.current.getData()));

        formRef.current.reset();
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
  }

  useEffect(() => {
    async function loadRecipient() {
      const { data } = await api.get(`recipients/${id}`);
      formRef.current.setData(data);
    }

    loadRecipient();
  }, [id]);

  return (
    <>
      <PageHeaderManage
        pageTitle="Cadastro de destinatário"
        handleBack={() => history.push('/recipients')}
        handleSave={handleSubmitForm}
      />
      <Card>
        <Form ref={formRef}>
          <Input label="Nome:" name="name" placeholder="Nome do destinatário" />
          <Block2>
            <Input label="Rua:" name="street" placeholder="Rua, Avenida.." />
            <Input label="Número:" name="number" placeholder="123" />
            <Input label="Complemento:" name="complement" placeholder="AP" />
          </Block2>
          <Block3>
            <Input label="Cidade:" name="city" placeholder="Cidade" />
            <Input label="Estado:" name="state" placeholder="Estado" />
            <InputMask
              label="CEP:"
              mask="99999-999"
              name="zipcode"
              placeholder="000000-000"
            />
          </Block3>
        </Form>
      </Card>
    </>
  );
}
