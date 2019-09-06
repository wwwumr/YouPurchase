import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, StyleSheet } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

export default class InputPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icEye: "visibility-off",
      password: true
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.password) {
      newState = {
        icEye: "visibility",
        password: false
      };
    } else {
      newState = {
        icEye: "visibility-off",
        password: true
      };
    }

    // set new state value
    this.setState(newState);
  };

  render() {
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        <FormInput {...this.props} secureTextEntry={this.state.password} />
        <Icon
          style={styles.icon}
          name={this.state.icEye}
          size={this.props.iconSize}
          color={this.props.iconColor}
          onPress={this.changePwdType}
        />
        <FormValidationMessage>{this.props.errorMessage}</FormValidationMessage>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 33,
    right: 20
  }
});

InputPassword.defaultProps = {
  iconSize: 25
};