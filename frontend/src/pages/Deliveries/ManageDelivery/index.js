import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import {
  addDeliveryRequest,
  updateDeliveryRequest,
} from '~/store/modules/deliveries/actions';

import PageHeaderManage from '~/components/PageHeaderManage';
import Input from '~/components/Form/Input';
import InputAsyncSelect from '~/components/Form/InputAsyncSelect';

import { Card, InputGroup } from './styles';

export default function ManageDelivery() {
  const formRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  async function handleSubmitForm() {
    if (id) {
      dispatch(updateDeliveryRequest(formRef.current.getData(), id));
    } else {
      try {
        const schema = Yup.object().shape({
          recipient_id: Yup.string().required('Selecione um destinatário'),
          deliveryman_id: Yup.string().required('Selecione um entregador'),
          product: Yup.string().required('Informe o produto'),
        });

        await schema.validate(formRef.current.getData(), {
          abortEarly: false,
        });

        dispatch(addDeliveryRequest(formRef.current.getData()));

        formRef.current.setErrors({});
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

  const loadRecipients = async value => {
    let options = [];
    if (value !== '') {
      const response = await api.get('recipients', {
        params: {
          q: value,
        },
      });

      options = response.data.rows.map(recipient => ({
        value: recipient.id,
        label: recipient.name,
      }));

      return options;
    }

    return [];
  };

  const loadDeliveryman = async value => {
    let options = [];
    if (value !== '') {
      const response = await api.get('deliverymen', {
        params: {
          q: value,
        },
      });

      options = response.data.rows.map(deliveryman => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      return options;
    }

    return [];
  };

  useEffect(() => {
    async function loadRecipient() {
      if (!id) return;

      const { data } = await api.get(`deliveries/${id}`);
      console.tron.log(data);
      formRef.current.setData(data);
    }

    loadRecipient();
  }, [id]);

  return (
    <>
      <PageHeaderManage
        handleBack={() => history.push('/deliveries')}
        handleSave={handleSubmitForm}
        pageTitle="Cadastro de encomendas"
      />
      <Card>
        <Form ref={formRef}>
          <InputGroup>
            <InputAsyncSelect
              name="recipient_id"
              label="Destinatário:"
              loadOptions={loadRecipients}
              placeholder="Selecione um destinatário..."
            />
            <InputAsyncSelect
              name="deliveryman_id"
              label="Entregador:"
              loadOptions={loadDeliveryman}
              placeholder="Selecione um entregador..."
            />
          </InputGroup>
          <Input
            name="product"
            label="Nome do produto:"
            placeholder="Descrição do produto..."
          />
        </Form>
      </Card>
    </>
  );
}
