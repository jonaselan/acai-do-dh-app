import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
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

export const DeliverymanList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 20px;
  padding: 0 20px;
`;

export const Card = styled.View`
  border: #7159c1 1px solid;
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  align-items: center;
  margin: 0 10px 20px;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ActionButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  padding-left: 7px;
  padding-right: 7px;
`;

export const CommonButton = styled.Button`
`;
