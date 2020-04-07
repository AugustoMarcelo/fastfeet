import React, { useState } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StepIndicator from 'react-native-step-indicator';

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
  DetailsButtonText,
} from './styles';

export default function Dashboard({ navigation }) {
  const [deliveries] = useState([
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
              uri: 'http://api.adorable.io/avatar/256/Marcelo.png',
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
              <StepIndicator
                labels={['Aguardando retirada', 'Retirada', 'Entregue']}
                stepCount={3}
                currentPosition={2}
                customStyles={{
                  stepIndicatorSize: 12,
                  currentStepIndicatorSize: 12,
                  separatorStrokeWidth: 1,
                  currentStepStrokeWidth: 1,
                  stepStrokeCurrentColor: '#7D40E7',
                  stepStrokeWidth: 1,
                  separatorStrokeFinishedWidth: 1,
                  stepStrokeFinishedColor: '#7D40E7',
                  stepStrokeUnFinishedColor: '#7D40E7',
                  separatorFinishedColor: '#7D40E7',
                  separatorUnFinishedColor: '#7D40E7',
                  stepIndicatorFinishedColor: '#7D40E7',
                  stepIndicatorUnFinishedColor: '#ffffff',
                  stepIndicatorCurrentColor: '#ffffff',
                  stepIndicatorLabelFontSize: 0,
                  currentStepIndicatorLabelFontSize: 0,
                  labelColor: '#999',
                  labelSize: 12,
                  currentStepLabelColor: '#999',
                }}
              />
              <CardBottom>
                <DeliveryInfo>
                  <Label>Data</Label>
                  <Value>14/01/2020</Value>
                </DeliveryInfo>
                <DeliveryInfo>
                  <Label>Cidade</Label>
                  <Value>Caicó</Value>
                </DeliveryInfo>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details')}
                >
                  <DetailsButtonText>Ver detalhes</DetailsButtonText>
                </TouchableOpacity>
              </CardBottom>
            </Card>
          )}
        />
      </Container>
    </>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
