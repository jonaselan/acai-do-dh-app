import styled from 'styled-components';
// NOTE: usar essa lib para gerar botões adaptaveis para ambas as plataformas
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const SaleList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Button = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const Card = styled.View`
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border: #7159c1 1px solid;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const Left = styled.View`
  flex: 1;
  height: 40px;
  /* border-radius: 4px; */
  /* background: #eee; */
  /* border: 1px solid #eee; */
`;

export const Value = styled.Text`
  font-weight: bold;
  font-size: 30px;
  color: #333;
`;

export const Right = styled.View`
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
  padding: 0 52px;
  /* background: #831; */
`;

export const CreatedAt = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const PaymentMethod = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const DeliveryMethod = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;
