import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  Card,
  Input,
  ButtonSend,
  ButtonSendText,
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
              <Input
                placeholder="Inclua aqui o problema que ocorreu na entrega."
                numberOfLines={15}
                textAlignVertical="top"
              />
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

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};
