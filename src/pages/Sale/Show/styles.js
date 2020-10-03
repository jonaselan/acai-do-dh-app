import styled from 'styled-components';
import Button from '../../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
`;

export const SaleInfos = styled.View`
  align-self: stretch;
  margin-top: 50px;
  border-bottom-width: 1px;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: #24292e;
  padding: 8px 0;
`;

export const Info = styled.Text`
  font-size: 18px;
  color: #24292e;
  font-weight: bold;
`;

export const DeliveryMethodView = styled.View``;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
  padding: 0 10px;
`;

export const ActionButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
