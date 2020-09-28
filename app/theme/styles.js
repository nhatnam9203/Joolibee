/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */

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
    placeholder: '', // color for placeholder text, such as input placeholder.
    backdrop: '', // color for backdrops of various components such as modals.
    surface: '', // background color for elements containing content, such as cards.
    white: '#FFF',
    button: buttonColor,
    orange: "#F0810D",
    cyan:'#2AC8CC',
    inputError: buttonColor,
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

    medium_SVN: {
      fontFamily: 'SVN-Merge',
      fontSize: 14,
    },

    textBold: {
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
    },

    title: {
      fontFamily: 'SVN-Merge',
      fontSize: 28,
    },

    header: {
      fontFamily: 'SVN-Merge',
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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
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
  },
  navigation: {
    default: {
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: secondaryColor },
      headerTitleStyle: {
        fontFamily: 'SVN-Merge',
        fontSize: 18,
        color: primaryColor,
      },
    },
  },
};
export default AppStyles;
