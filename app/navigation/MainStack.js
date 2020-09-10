import * as React from 'react';
import { Animated } from 'react-native';
// import { createNativeStackNavigator } from 'react-native-screens/native-stack'; // use api native
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabScreen, AccountStackScreen, ScreenName } from '../screens';
// import { TransitionSpecs } from '@react-navigation/stack';
// import { CardStyleInterpolators } from '@react-navigation/stack';
// import { HeaderStyleInterpolators } from '@react-navigation/stack';
// import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Main}
      headerMode="screen"
      screenOptions={{
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: 'tomato' },
        gestureEnabled: false,
      }}>
      <Stack.Screen
        component={MainTabScreen}
        name={ScreenName.Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AccountStackScreen}
        name={ScreenName.Account}
        options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
