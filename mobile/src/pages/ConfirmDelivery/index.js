import React, { useState } from 'react';
import { StatusBar, View, Text, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

import api from '../../services/api';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  Card,
  ButtonCapture,
  ButtonSend,
  ButtonSendText,
} from './styles';

export default function ConfirmDelivery({ navigation, route }) {
  const { id } = route.params;
  const [photo, setPhoto] = useState({});

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Aguardando...</Text>
    </View>
  );

  async function takePicture(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    setPhoto({
      uri: data.uri,
      type: 'image/jpeg',
      originalname: `user_signature_delivery_id_${id}.jpg`,
    });
  }

  async function handleSubmitSignature() {
    const data = new FormData(); // eslint-disable-line
    data.append('file', {
      uri: photo.uri,
      type: photo.type,
      originalname: photo.originalname,
    });

    const response = await api.post('files', data, {
      headers: {
        accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
    });

    const { id: signature_id } = response.data;

    if (response.status === 201) {
      const result = await api.put(`deliveries/${id}/end`, { signature_id });

      if (result.status === 200) {
        ToastAndroid.show('Encomenda entregue com sucesso', ToastAndroid.LONG);
        navigation.navigate('Dashboard');
      }
    } else {
      ToastAndroid.show(
        'Não foi possível confirmar a entrega. Tente novamente.',
        ToastAndroid.LONG
      );
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <HeaderExtented />
        <Content>
          <ContentOverlap>
            <Card>
              <RNCamera
                style={{
                  flex: 1,
                }}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={{
                  title: 'Permissão para usar a câmera',
                  message:
                    'Este aplicativo necessita da sua autorização para usar a câmera',
                  buttonPositive: 'OK',
                  buttonNegative: 'Cancelar',
                }}
              >
                {({ camera, status }) => {
                  if (status !== 'READY') return <PendingView />;
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <ButtonCapture onPress={() => takePicture(camera)}>
                        <Icon name="photo-camera" size={24} color="#fff" />
                      </ButtonCapture>
                    </View>
                  );
                }}
              </RNCamera>
            </Card>
            <ButtonSend onPress={handleSubmitSignature}>
              <ButtonSendText>Enviar</ButtonSendText>
            </ButtonSend>
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}

ConfirmDelivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};
