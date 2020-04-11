import React, { useState, useEffect } from 'react';
import { StatusBar, Image, Platform, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

import { Container, Input, Button, ButtonText } from './styles';

export default function Login({ navigation }) {
  const [id, setId] = useState();
  const signed = useSelector((state) => state.auth.signed);

  const dispatch = useDispatch();

  useEffect(() => {
    if (signed) {
      navigation.navigate('App');
    }
  }, [signed]);

  async function handleLogin() {
    if (id) {
      dispatch(signInRequest(id));
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
