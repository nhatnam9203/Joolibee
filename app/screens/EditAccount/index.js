import React from 'react';
import { SinglePageLayout } from '@layouts';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { CustomInput } from '@components';
import { translate } from '@localize';
import { AppStyles } from '@theme';

const LAYOUT_WIDTH = '90%';

const EditAccountScreen = () => {
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.background}>
      <SafeAreaView>
        <View style={styles.container}>
          <CustomInput
            style={{ width: LAYOUT_WIDTH }}
            placeholder={translate('txtInputName')}
            textContentType="name"
          />
        </View>
      </SafeAreaView>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default EditAccountScreen;
