import {
  CustomBirthdayPicker,
  CustomButton,
  CustomCheckBox,
  CustomInput,
  CustomPickerSelect,
  CustomModal,
} from '@components';
import { translate } from '@localize';
import { signUp, clearSignupState } from '@slices/account';
import { AppStyles, images, metrics } from '@theme';
import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { isIphoneX } from '../../lib/isIphoneX';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../ScreenName';
import { InputPhoneNumber, VerifyPhoneCode } from './pages';

const SignUpScreen = () => {
  const navigation = useNavigation();
  // redux
  const dispatch = useDispatch();

  return <VerifyPhoneCode />;
};

const styles = StyleSheet.create({});

export default SignUpScreen;
