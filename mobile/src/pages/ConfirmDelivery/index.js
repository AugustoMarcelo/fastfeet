import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

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

export default function ConfirmDelivery({ navigation }) {
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
    alert(data.uri); //eslint-disable-line
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
            <ButtonSend onPress={() => navigation.goBack()}>
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
};
