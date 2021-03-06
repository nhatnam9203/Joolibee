/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */

// import { scale } from '@utils';

// const { scaleHeight } = scale;
import { Platform } from 'react-native';

const primaryColor = '#FFFFFF';
const secondaryColor = '#E31837';
const buttonColor = '#FFC522';

const AppStyles = {
  colors: {
    // ===========================
    // paper default colors
    // ===========================

    primary: primaryColor, //primary color for your app, usually your brand color.
    accent: secondaryColor, // secondary color for your app which complements the primary color.
    background: '#F5F1E6', // background color for pages, such as lists.
    text: '#1B1B1B',
    disabled: '#787D84', // color for disabled elements.
    placeholder: '#9E9E9E', // color for placeholder text, such as input placeholder.
    backdrop: '', // color for backdrops of various components such as modals.
    surface: '', // background color for elements containing content, such as cards.
    white: '#FFF',
    button: buttonColor,
    orange: '#F0810D',
    cyan: '#2AC8CC',
    inputError: buttonColor,
    confirmed: '#3FB4C3',
    complete: '#484848',
    green: '#A9B91A',
    dark_aqua: '#0A8D87',
    delivery: '#00B77F',
    inactive: '#BCBCBC',
    moderate_cyan: '#4AC1CF',
  },
  fonts: {
    text: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
    },

    mini: {
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
    },

    medium: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
    },

    bold: {
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
    },

    medium_SVN: {
      fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
      fontSize: 14,
    },

    SVN_Merge_Bold: {
      fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    },

    title: {
      fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
      fontSize: 28,
    },

    header: {
      fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
      fontSize: 18,
    },
  },
  styles: {
    container: { flex: 1 },

    topBar: {
      backgroundColor: secondaryColor,
    },

    rowSeparator: {
      height: 1,
      backgroundColor: '#1B1B1B',
      width: '100%',
      opacity: 0.25,
    },

    shadow: {
      shadowColor: '#000A',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.18,
      shadowRadius: 4,
      elevation: 3,
    },

    shadowStrong: {
      shadowColor: '#000D',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.16,
      shadowRadius: 4,

      elevation: 4,
    },

    absolute: {
      position: 'absolute',
    },

    iconStyle: { resizeMode: 'center' },

    redContainer: {
      flex: 1,
      backgroundColor: secondaryColor,
      alignItems: 'center',
    },

    horizontalLayout: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    itemTitle: {
      fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
      fontSize: 20,
      color: '#1B1B1B',
      marginBottom: 10,
      flex: 1,
    },

    navigationIcon: {
      backgroundColor: '#FFC522',
      height: 30,
      width: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
  },
  navigation: {
    default: {
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: secondaryColor,
      },
      headerTitleStyle: {
        fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
        fontSize: 18,
        color: primaryColor,
      },
    },
  },
};
export default AppStyles;
