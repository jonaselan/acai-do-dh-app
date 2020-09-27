import styled from 'styled-components';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px 30px 10px 30px;
`;

export const SalesInfo = styled.View`
  align-self: stretch;
  border-bottom-width: 1px;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: #24292e;
  padding: 5px 0;
`;

export const Info = styled.Text`
  font-size: 18px;
  color: #24292e;
  font-weight: bold;
`;

export const SaleList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  margin-bottom: 130px;
`;

export const ButtonIcon = styled(RectButton)`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const ActionButton = styled(RectButton)`
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const ActionButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const Card = styled.View`
  flex-direction: row;
  padding: 18px 20px;
  border-bottom-width: 1px;
  border: #7159c1 1px solid;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const Left = styled.View`
  flex: 1;
`;

export const Value = styled.Text`
  font-weight: bold;
  font-size: 25px;
  color: #333;
`;

export const Charge = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const DeliveryFee = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const CreatedAt = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Right = styled.View`
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
  padding: 0 35px;
`;
