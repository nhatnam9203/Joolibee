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
import { InputPhoneNumber, VerifyPhoneCode, SignUpForm } from './pages';

const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  SignUp: 2,
};

const SignUpScreen = () => {
  const navigation = useNavigation();
  // redux
  const dispatch = useDispatch();

  const [showPage, setPage] = React.useState(PAGES.InputPhone);

  switch (showPage) {
    case 0:
    default:
      return <InputPhoneNumber next={() => setPage(PAGES.InputCode)} />;
    case 1:
      return <VerifyPhoneCode next={() => setPage(PAGES.SignUp)} />;
    case 2:
      return <SignUpForm />;
  }
};

const styles = StyleSheet.create({});

export default SignUpScreen;
