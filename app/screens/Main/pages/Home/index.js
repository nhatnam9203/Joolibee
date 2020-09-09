import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TopBarScreenLayout } from '@layouts';
import { TopBarComponent } from '../../components';

const HomePage = () => (
  <TopBarScreenLayout topBar={<TopBarComponent />}>
    <Text>hi</Text>
  </TopBarScreenLayout>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default HomePage;
