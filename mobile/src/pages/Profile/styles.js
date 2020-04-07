import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 78px;
`;

export const UserInfo = styled.View`
  align-items: flex-start;
  margin: 25px 0;
`;

export const Label = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const Value = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const ButtonLogout = styled.TouchableOpacity`
  background: #e74040;
  border-radius: 4px;
  height: 50px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export const ButtonLogoutText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
