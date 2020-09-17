import { StyleSheet } from 'react-native';
/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */

const primaryColor = '#FFFFFF';
const secondaryColor = '#E31837';

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
    button:'#FFC522',
    white:'#FFFF'
  },
  fonts: {},
  styles: {
    container: { flex: 1 },

    topBar: {
      backgroundColor: secondaryColor,
    },
  },
};
export default AppStyles;
