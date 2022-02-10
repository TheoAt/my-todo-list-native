import styled from "styled-components";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
} from "react-native";
import Constants from "expo-constants";

// Colors
export const colors = {
  primary: "#0d1117",
  secondary: "#161b22",
  tertiary: "#E6E6E6",
  alternative: "#999999D6",
  background: "#233b4f"
};

export const Container = styled.SafeAreaView`
  background-color: ${colors.background};
  flex: 1
`;

//Header Banner
export const HeaderBanner = styled.Image`
  width: 100%;
  height: 300px;
  margin-top: -8px;
  margin-bottom: 8px
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.tertiary}
`;

export const HeaderButton = styled.TouchableOpacity`
  font-weight: bold;
  color: ${colors.tertiary}
`

// List
export const ListView = styled.TouchableHighlight`
  background-color: ${colors.primary};
  align-items: flex-start;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 4px;
`;

export const ListViewHidden = styled.View`
  background-color: transparent;
  align-items: flex-start;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 4px
`;

export const TodoText = styled.Text`
  font-size: 16px;
  color: ${colors.tertiary};
  margin-right: 28px;
  margin-left: 48px;
  margin-bottom: 4px;
  margin-top: 4px;
`;

// Text for done todo row
export const DoneTodoText = styled(TodoText)`
  color: ${colors.alternative};
  text-decoration: line-through
`;

// Modal
export const ModalButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${colors.tertiary};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: absolute;
  bottom: 32px;
  right: 32px;
  z-index: 1
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #0d1117D2
`;

export const ModalView = styled.View`
  background-color: transparent;
  padding: 16px;
  width: 100%
`;

export const StyledInputName = styled.TextInput`
  width: 80%;
  margin: 0 auto;
  height: 48px;
  background-color: transparent;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.tertiary};
  padding: 12px;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${colors.tertiary};
  text-align: center
`;

export const StyledInput = styled.TextInput`
  width: 96%;
  margin: 0 auto;
  height: 48px;
  background-color: transparent;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.tertiary};
  padding: 12px;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${colors.tertiary}
`;

export const ModalAction = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: absolute;
  top: 26px;
  right: 16px
`;

export const ModalActionDelete = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ModalActionGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto
  margin-top: 8px;
  width: 48%
`;

export const ModalIcon = styled.View`
  align-items: center;
  margin-bottom: 30px
`;

// Footer
export const FooterComponent = styled.View`
  background-color: ${colors.primary};
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px
`