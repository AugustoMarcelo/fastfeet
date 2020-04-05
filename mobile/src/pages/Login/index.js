import React, { useState } from 'react';
import { StatusBar, Image, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Input, Button, ButtonText } from './styles';

export default function Login() {
  const [id, setId] = useState(null);

  async function handleLogin() {
    if (id) {
      try {
        const response = await api.get(`/deliverymen/${id}/sessions`);

        const deliveryman = response.data;

        if (deliveryman) {
          await AsyncStorage.setItem('deliveryman', deliveryman);
        }
      } catch (error) {
        ToastAndroid.show('Entregador não encontrado', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Você precisa informar o ID', ToastAndroid.LONG);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container behavior="padding" enabled={Platform.OS === 'ios'}>
        <Image source={logo} width={244} height={48} />
        <Input
          keyboardType="numeric"
          placeholder="Informe seu ID de cadastro"
          value={id}
          onChangeText={setId}
        />
        <Button onPress={handleLogin}>
          <ButtonText>Entrar no sistema</ButtonText>
        </Button>
      </Container>
    </>
  );
}
