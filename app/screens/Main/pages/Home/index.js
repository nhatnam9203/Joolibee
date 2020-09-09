import React from 'react';
import { StyleSheet } from 'react-native';
import { TopBarScreenLayout } from '@layouts';
import { TopBarComponent } from '../../components';

const HomePage = () => <TopBarScreenLayout topBar={<TopBarComponent />} />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default HomePage;
