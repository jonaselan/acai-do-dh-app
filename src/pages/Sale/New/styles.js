import styled from 'styled-components';
import {RectButton} from 'react-native-gesture-handler';

// export const Container = styled.View`
//   flex: 1;
//   padding: 0 30px;
//   justify-content: center;
//   align-items: center;
// `;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  flex: 1;
  padding: 0 20px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
  border-bottom-width: 1px;
`;

export const DeliveryMethodView = styled.View``;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  margin-bottom: 10px;
  height: 50px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const SubmitButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const LabelInput = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #24292e;
  padding: 8px 0;
`;
