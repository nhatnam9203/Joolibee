import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TopBarScreenLayout } from '@layouts';
import { TopBarComponent, PopupSelectAreaComponent } from '../../components';

const HomePage = () => {
  const [isVisible, setVisiblePopup] = React.useState(true);
  const onTogglePopup = () => {
    setVisiblePopup(!isVisible)
  }
  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      <Text>hi</Text>
      <PopupSelectAreaComponent
        visible={isVisible}
        onToggle={onTogglePopup}
      />
    </TopBarScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default HomePage;
