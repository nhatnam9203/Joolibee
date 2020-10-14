import * as regex from './regex';

export const isNumeric = (input) => /^\d+$/.test(input);

export const normalizePhoneNumber = (countryCode, phone) => {
  switch (countryCode) {
    case '+84':
      if (phone.length === 10) {
        return `+84${phone.substring(1, 10)}`;
      }
      break;
    default:
      break;
  }

  return countryCode + phone;
};

export const isExist = (value) =>
  value !== undefined && value !== null && value?.length > 0;

export const isEmptyString = (str) => (str ? str?.trim().length === 0 : true);

export const email = (value) => {
  return regex.email.test(String(value).toLowerCase());
};

export const phoneNumber = (value) => {
  return regex.phone.test(String(value).toLowerCase());
};
