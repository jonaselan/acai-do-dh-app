import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding: 30px 30px 10px 30px;
`;

export const ExpenseList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const ExpensesInfo = styled.View`
  align-self: stretch;
  margin-top: 20px;
  border-bottom-width: 1px;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: #24292e;
  padding: 8px 0;
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
  font-size: 30px;
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

export const Kind = styled.Text`
  font-weight: bold;
  font-size: 13px;
  color: #333;
`;
