/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
  tabBarHeight: 70,
  padding: 10,
  margin: 10,
  safeAreaPadding: 44,
  borderRadius: 4,
};

export default metrics;
