import React, { useState } from 'react';
import { StatusBar, Image, Platform, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Input, Button, ButtonText } from './styles';

export default function Login({ navigation }) {
  const [id, setId] = useState(null);

  async function handleLogin() {
    if (id) {
      try {
        const response = await api.get(`/deliveryman/${id}/sessions`);

        const { avatar, ...deliveryman } = response.data;
        const user = {
          ...deliveryman,
          avatar: avatar.url,
        };

        if (deliveryman) {
          await AsyncStorage.setItem('deliveryman', JSON.stringify(user));
          navigation.navigate('App');
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

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
