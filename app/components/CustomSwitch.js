import React from 'react';
import { Switch } from 'react-native';

const CustomSwitch = ({ toggleSwitch, defautlValue }) => {
  const [isEnabled, setIsEnabled] = React.useState(defautlValue);

  const onValueChange = (val) => {
    setIsEnabled(val);
    if (typeof toggleSwitch === 'function') {
      toggleSwitch();
    }
  };
  return (
    <Switch
      trackColor={{ false: '#BCBCBC', true: '#3FB4C3' }}
      thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
      ios_backgroundColor="#BCBCBC"
      onValueChange={onValueChange}
      value={isEnabled}
    />
  );
};

export default CustomSwitch;
