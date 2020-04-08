import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import { formatDate } from '../../util/formatDate';

import {
  Container,
  Avatar,
  UserInfo,
  Label,
  Value,
  ButtonLogout,
  ButtonLogoutText,
  Loading,
} from './styles';

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  async function getProfile() {
    setLoading(true);
    const response = await AsyncStorage.getItem('deliveryman');
    setProfile(JSON.parse(response));
    setLoading(false);
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem('deliveryman');
    navigation.navigate('Login');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Avatar
              source={{
                uri: profile
                  ? profile.avatar
                  : 'http://api.adorable.io/avatar/80/Marcelo.png',
              }}
            />
            <UserInfo>
              <Label>Nome completo</Label>
              <Value>{profile.name}</Value>
              <Label>E-mail</Label>
              <Value>{profile.email}</Value>
              <Label>Data de cadastro</Label>
              <Value>{formatDate(profile.createdAt, 'dd/MM/yyyy')}</Value>
            </UserInfo>
            <ButtonLogout onPress={handleLogout}>
              <ButtonLogoutText>Logout</ButtonLogoutText>
            </ButtonLogout>
          </>
        )}
      </Container>
    </>
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
