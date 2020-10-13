import React from 'react';
import { useChangeLanguage } from '@hooks';
import { localizeData } from '@localize';
import { Image, StyleSheet } from 'react-native';

export const LanguageFlag = () => {
  const [language] = useChangeLanguage();

  return <Image source={localizeData[language].flag} />;
};
