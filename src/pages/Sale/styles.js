import styled from 'styled-components';
// NOTE: usar essa lib para gerar botões adaptaveis para ambas as plataformas
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px 30px 10px 30px;
`;

export const EmptySales = styled.View`
  justify-content: center;
  align-self: stretch;
  margin-top: 50px;
  align-items: center;
`;

export const SaleList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const CommonButton = styled.Button``;

export const Filters = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
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
  font-size: 26px;
  padding-top: 5px;
  color: #333;
`;

export const Right = styled.View`
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
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

export const Charge = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;
