import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native-paper';
import { AppStyles, images } from '@theme';

import { loadingSuccess } from '@slices/app';
import { scale } from '@utils';
import { translate } from '@localize';
import { useCodePushUpdate } from '@hooks';

const { scaleWidth, scaleHeight } = scale;

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [progress] = useCodePushUpdate();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(loadingSuccess());
    }, 1500);
  }, [progress, dispatch]);

  return (
    <View style={styles.container}>
      <Image source={images['bee_man']} style={styles.ic_bee_man} />

      <View style={styles.container_footer}>
        <Image
          source={images.icons['ic_text_jollibee']}
          style={styles.ic_text}
          resizeMode="center"
        />

        {progress > 0 && <Text style={styles.text_spash}>{progress}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container_footer: {
    position: 'absolute',
    bottom: scaleHeight(50),
    alignItems: 'center',
  },

  ic_bee_man: {
    resizeMode: 'center',
    marginBottom: scaleHeight(100),
  },

  ic_text: {
    resizeMode: 'center',
  },

  text_spash: {
    fontSize: scaleWidth(21),
    fontFamily: 'Roboto-Regular',
    color: AppStyles.colors.background,
    marginTop: scaleHeight(5),
  },
});

export default SplashScreen;
