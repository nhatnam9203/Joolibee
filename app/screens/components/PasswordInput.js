import React from 'react';
import { CustomInput } from '@components';
import { StyleSheet } from 'react-native';
import { ButtonVisiblePassword } from './ButtonVisiblePassword';

export const PasswordInput = ({ ...props }) => {
  const [hidePassword, setHidePassword] = React.useState(true);

  const visiblePasswordButtonPressed = React.useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  return (
    <CustomInput
      style={styles.inputStyle}
      secureTextEntry={hidePassword}
      textContentType="password"
      blurOnSubmit={false}
      {...props}>
      <ButtonVisiblePassword
        onPress={visiblePasswordButtonPressed}
        visible={!hidePassword}
      />
    </CustomInput>
  );
};

const styles = StyleSheet.create({
  inputStyle: { width: '100%' },
});
