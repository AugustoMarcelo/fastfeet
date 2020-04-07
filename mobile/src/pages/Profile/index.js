import React from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  Avatar,
  UserInfo,
  Label,
  Value,
  ButtonLogout,
  ButtonLogoutText,
} from './styles';

export default function Profile() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <Avatar
          source={{ uri: 'http://api.adorable.io/avatar/80/Marcelo.png' }}
        />
        <UserInfo>
          <Label>Nome completo</Label>
          <Value>Gaspar Antues</Value>
          <Label>E-mail</Label>
          <Value>example@rocketseat.com.br</Value>
          <Label>Data de cadastro</Label>
          <Value>10/01/2020</Value>
        </UserInfo>
        <ButtonLogout>
          <ButtonLogoutText>Logout</ButtonLogoutText>
        </ButtonLogout>
      </Container>
    </>
  );
}
