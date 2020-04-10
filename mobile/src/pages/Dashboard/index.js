import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StepIndicator from 'react-native-step-indicator';

import { formatDate } from '../../util/formatDate';

import api from '../../services/api';

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

import { Loading } from '../Profile/styles';

export default function Dashboard({ navigation }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState({
    pending: true,
    delivered: false,
  });

  async function loadDeliveries() {
    let response;
    if (filter.pending) {
      response = await api.get(`deliveryman/${profile.id}/pending`);
    } else {
      response = await api.get(`deliveryman/${profile.id}/deliveries`);
    }
    setDeliveries(response.data.rows);
  }

  async function getProfile() {
    setLoading(true);
    try {
      const response = await AsyncStorage.getItem('deliveryman');
      setProfile(JSON.parse(response));
    } catch (error) {
      navigation.navigate('Login');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (profile.id) {
      loadDeliveries();
    }
  }, [profile]);

  useEffect(() => {
    getProfile();
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem('deliveryman');
    navigation.navigate('Login');
  }

  function getPosition(item) {
    if (item.end_date) return 3;
    if (item.start_date) return 2;
    return 1;
  }

  function handleGetPending() {
    setFilter({
      delivered: false,
      pending: true,
    });
  }

  function handleGetDelivered() {
    setFilter({
      pending: false,
      delivered: true,
    });
  }

  useEffect(() => {
    loadDeliveries();
  }, [filter]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Header>
              <Avatar
                source={{
                  uri: profile
                    ? profile.avatar
                    : 'http://api.adorable.io/avatar/256/Marcelo.png',
                }}
              />
              <Welcome>
                <WelcomeText>Bem-vindo de volta,</WelcomeText>
                <Name>{profile.name}</Name>
              </Welcome>
              <TouchableOpacity onPress={handleLogout}>
                <Icon name="exit-to-app" size={26} color="#E74040" />
              </TouchableOpacity>
            </Header>
            <Content>
              <PageTitle>Entregas</PageTitle>
              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={handleGetPending}
                >
                  <ButtonText
                    style={
                      filter.pending && {
                        color: '#7D40E7',
                        borderBottomWidth: 1,
                        borderColor: '#7D40E7',
                      }
                    }
                  >
                    Pendentes
                  </ButtonText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGetDelivered}>
                  <ButtonText
                    style={
                      filter.delivered && {
                        color: '#7D40E7',
                        borderBottomWidth: 1,
                        borderColor: '#7D40E7',
                      }
                    }
                  >
                    Entregues
                  </ButtonText>
                </TouchableOpacity>
              </Actions>
            </Content>
            <DeliveryList
              data={deliveries}
              keyExtractor={(delivery) => String(delivery.id)}
              ListFooterComponent={loading && <Loading />}
              ListEmptyComponent={
                <Card
                  style={{
                    padding: 10,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#666' }}>
                    Nenhuma entrega encontrada...
                  </Text>
                </Card>
              }
              renderItem={({ item }) => (
                <Card>
                  <CardTop>
                    <Icon name="local-shipping" size={24} color="#7D40E7" />
                    <CardTitle>{item.product}</CardTitle>
                  </CardTop>
                  <StepIndicator
                    labels={['Aguardando retirada', 'Retirada', 'Entregue']}
                    stepCount={3}
                    currentPosition={getPosition(item)}
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
                      <Value>{formatDate(item.createdAt, 'dd/MM/yyyy')}</Value>
                    </DeliveryInfo>
                    <DeliveryInfo>
                      <Label>Cidade</Label>
                      <Value>{item.recipient.city}</Value>
                    </DeliveryInfo>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Details', { delivery: item })
                      }
                    >
                      <DetailsButtonText>Ver detalhes</DetailsButtonText>
                    </TouchableOpacity>
                  </CardBottom>
                </Card>
              )}
            />
          </>
        )}
      </Container>
    </>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
