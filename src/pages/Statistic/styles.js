import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding: 30px 30px 10px 30px;
`;

export const SaleList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Filters = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  border-bottom-width: 1px;
`;

export const Infos = styled.View`
  align-self: stretch;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: #24292e;
  padding: 5px 0;
`;

export const Left = styled.View`
  flex: 1;
`;

export const Value = styled.Text`
  font-weight: bold;
  font-size: 40px;
  padding-top: 15px;
  color: #333;
`;

export const Right = styled.View`
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
`;

export const Header = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #333;
`;
