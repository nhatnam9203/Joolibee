import React from 'react';
import { Switch } from 'react-native';

const CustomSwitch = ({ toggleSwitch }) => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <Switch
      trackColor={{ false: '#767577', true: '#3FB4C3' }}
      //   thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

export default CustomSwitch;
