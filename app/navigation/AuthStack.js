import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen } from '../screens';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={WelcomeScreen} name="Welcome" />
    </Stack.Navigator>
  );
}

export default AuthStack;
