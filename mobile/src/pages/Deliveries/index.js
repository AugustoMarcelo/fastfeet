import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Avatar,
  Welcome,
  WelcomeText,
  Name,
  Content,
  PageTitle,
  Actions,
  ButtonText,
  DeliveryList,
  Card,
  CardTop,
  CardTitle,
  CardBottom,
  DeliveryInfo,
  Label,
  Value,
} from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <Header>
          <Avatar
            source={{
              uri: 'http://api.adorable.io/avatar/68/Marcelo.png',
            }}
          />
          <Welcome>
            <WelcomeText>Bem-vindo de volta,</WelcomeText>
            <Name>Gaspar Antunes</Name>
          </Welcome>
          <TouchableOpacity>
            <Icon name="exit-to-app" size={26} color="#E74040" />
          </TouchableOpacity>
        </Header>
        <Content>
          <PageTitle>Entregas</PageTitle>
          <Actions>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <ButtonText
                style={{
                  color: '#7D40E7',
                  borderBottomWidth: 1,
                  borderColor: '#7D40E7',
                }}
              >
                Pendentes
              </ButtonText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ButtonText>Entregues</ButtonText>
            </TouchableOpacity>
          </Actions>
        </Content>
        <DeliveryList
          data={deliveries}
          keyExtractor={(delivery) => String(delivery.id)}
          renderItem={({ item }) => (
            <Card>
              <CardTop>
                <Icon name="local-shipping" size={24} color="#7D40E7" />
                <CardTitle>Encomenda 01</CardTitle>
              </CardTop>
              <CardBottom>
                <DeliveryInfo>
                  <Label>Data</Label>
                  <Value>14/01/2020</Value>
                </DeliveryInfo>
                <DeliveryInfo>
                  <Label>Cidade</Label>
                  <Value>Caicó</Value>
                </DeliveryInfo>
                <TouchableOpacity>
                  <Text style={{ color: '#7D40E7', fontWeight: 'bold' }}>
                    Ver detalhes
                  </Text>
                </TouchableOpacity>
              </CardBottom>
            </Card>
          )}
        />
      </Container>
    </>
  );
}
