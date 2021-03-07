import styled, { css } from 'styled-components/native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { LinearGradient } from 'expo-linear-gradient';

export const ModalOverlay = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  justify-content: flex-end;

  background: rgba(0, 0, 0, 0.64);
`;

export const Modal = styled.View`
  background: #202024;
  padding: 24px 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const ModalButtons = styled.View`
  margin-top: 32px;

  flex-direction: row;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: 48px;
  border-radius: 16px;
  background: #323238;
`;

export const CancelButtonText = styled.Text`
  color: #c7c7ca;
  font-size: 16px;
  font-weight: bold;
`;

export const AddButton = styled.TouchableOpacity`
  flex: 1;

  margin-left: 16px;
`;

export const AddButtonBackground = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: 48px;
  border-radius: 16px;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 48px;
  border-width: 3px;
  border-color: #323238;
  border-radius: 16px;
  padding: 0 16px;
  color: #fff;
`;

export const Container = styled.View`
  flex: 1;

  padding: ${getStatusBarHeight()}px 16px 16px;

  background: #121214;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;

  margin: 32px 0 16px;
`;

export const List = styled.View`
  margin: 16px 0;
`;

export const ListTitle = styled.Text`
  color: #c7c7ca;
  font-size: 14px;

  margin-bottom: 2px;
`;

interface CheckboxProps {
  isCompleted?: boolean;
}

export const ListItem = styled.TouchableOpacity`
  background: #202024;
  border-radius: 16px;
  padding: 16px;
  margin-top: 10px;

  flex-direction: row;
  align-items: center;
`;

export const Checkbox = styled.View<CheckboxProps>`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border-width: 3px;
  border-color: #952ffc;

  align-items: center;
  justify-content: center;

  ${props =>
    props.isCompleted &&
    css`
      background: #952ffc;
    `};
`;

interface ListItemTextProps {
  isCompleted?: boolean;
}

export const ListItemText = styled.Text<ListItemTextProps>`
  color: #c7c7ca;
  font-size: 14px;

  margin-left: 16px;

  ${props =>
    props.isCompleted &&
    css`
      text-decoration: line-through;
    `};
`;

export const AddTaskButton = styled.TouchableOpacity`
  position: absolute;

  width: 56px;
  height: 56px;
  bottom: ${getBottomSpace() + 40}px;
  left: 50%;
  transform: translateX(-14px);
`;

export const AddTaskButtonBackground = styled(LinearGradient)`
  flex: 1;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
`;
