import { Image } from 'react-native';
import { Config } from 'react-native-config';
import React from 'react';
import { images } from '@theme';

export const JollibeeImage = ({
  url,
  style,
  defaultSource = images.menu_3,
}) => {
  const [source, setSource] = React.useState(null);

  React.useEffect(() => {
    if (url) {
      const fullPath = url.includes(Config.DOMAIN)
        ? url
        : `${Config.DOMAIN}${url}`;
      Logger.info(fullPath, 'JollibeeImage -> url');
      setSource({ uri: fullPath, cache: 'only-if-cached' });
    }
  }, [url]);

  return (
    <Image
      style={style}
      source={source ?? defaultSource}
      resizeMode="contain"
    />
  );
};
