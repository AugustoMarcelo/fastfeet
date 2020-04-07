import React from 'react';
import { StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  Card,
  CardTop,
  CardTitle,
  Label,
  Value,
  DeliveryDate,
  Actions,
  Action,
  ActionText,
} from './styles';

export default function DeliveryDetails({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <HeaderExtented />
        <Content>
          <ContentOverlap>
            <Card>
              <CardTop>
                <Icon name="local-shipping" size={24} color="#7D40E7" />
                <CardTitle>Informações da Entrega</CardTitle>
              </CardTop>
              <Label>Destinatário</Label>
              <Value>Ludwig Van Beethoven</Value>
              <Label>Endereço de entrega</Label>
              <Value>Rua Beethoven, 1729, Diadema - SP, 09960-580</Value>
              <Label>Produto</Label>
              <Value style={{ marginBottom: 0 }}>Yamaha SX7</Value>
            </Card>
            <Card>
              <CardTop>
                <Icon name="event" size={24} color="#7D40E7" />
                <CardTitle>Situação da Entrega</CardTitle>
              </CardTop>
              <Label>Status</Label>
              <Value>Pendente</Value>
              <DeliveryDate>
                <View>
                  <Label>Data de Retirada</Label>
                  <Value style={{ marginBottom: 0 }}>14/01/2020</Value>
                </View>
                <View>
                  <Label>Data de Entrega</Label>
                  <Value style={{ marginBottom: 0 }}>--/--/</Value>
                </View>
              </DeliveryDate>
            </Card>
            <Actions>
              <Action
                style={{ borderRightColor: '#e5e5e5', borderRightWidth: 1 }}
                onPress={() => navigation.navigate('RegisterProblem')}
              >
                <Icon name="highlight-off" size={22} color="#E74040" />
                <ActionText>Informar Problema</ActionText>
              </Action>
              <Action
                style={{ borderRightColor: '#e5e5e5', borderRightWidth: 1 }}
                onPress={() => navigation.navigate('Problems')}
              >
                <Icon name="info-outline" size={22} color="#E7BA40" />
                <ActionText>Visualizar Problemas</ActionText>
              </Action>
              <Action onPress={() => navigation.navigate('ConfirmDelivery')}>
                <MCIcon name="check-circle-outline" size={22} color="#7D40E7" />
                <ActionText>Confirmar Entrega</ActionText>
              </Action>
            </Actions>
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
