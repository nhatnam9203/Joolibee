import { useNavigation } from '@react-navigation/native';
import React from 'react';

const useNavigationFocus = (onFocused) => {
  const navigation = useNavigation();

  const [isFocused, setFocused] = React.useState(false);

  React.useEffect(() => {
    const didBlur = () => setFocused(false);
    const didFocus = () => {
      setFocused(true);
      if (typeof onFocused === 'function') {
        onFocused();
      }
    };

    const focusSubscription = navigation.addListener('focus', didFocus);
    const blurSubscription = navigation.addListener('blur', didBlur);

    return () => {
      blurSubscription();
      focusSubscription();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return isFocused;
};

export default useNavigationFocus;
