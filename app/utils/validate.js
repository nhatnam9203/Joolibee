export const isNumeric = (input) => /^\d+$/.test(input);

export const trimSpaces = (text) => text && text.replace(/\s/g, '');

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
