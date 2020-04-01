import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import {
  addDeliverymanRequest,
  updateDeliverymanRequest,
} from '~/store/modules/deliveryman/actions';

import Input from '~/components/Form/Input';
import InputFile from '~/components/Form/InputFile';
import { Card } from './styles';
import history from '~/services/history';

import PageHeaderManage from '~/components/PageHeaderManage';

export default function ManageRecipient() {
  const formRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  async function handleSubmitForm() {
    if (id) {
      dispatch(updateDeliverymanRequest(formRef.current.getData(), id));
    } else {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Campo Nome é obrigatório'),
          email: Yup.string().required('Campo E-mail é obrigatório'),
        });

        await schema.validate(formRef.current.getData(), {
          abortEarly: false,
        });

        dispatch(addDeliverymanRequest(formRef.current.getData()));

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
      if (!id) return;

      const { data } = await api.get(`deliverymen/${id}`);
      formRef.current.setData(data);
    }

    loadRecipient();
  }, [id]);

  return (
    <>
      <PageHeaderManage
        pageTitle="Cadastro de entregadores"
        handleBack={() => history.push('/deliveryman')}
        handleSave={handleSubmitForm}
      />
      <Card>
        <Form ref={formRef}>
          <InputFile name="avatar_id" />
          <Input label="Nome:" name="name" placeholder="Nome do entregador" />
          <Input
            label="E-mail:"
            type="email"
            name="email"
            placeholder="example@email.com"
          />
        </Form>
      </Card>
    </>
  );
}
