import moment from "moment";

export const trimSpaces = (text) => text && text.replace(/\s/g, '');

export const pad2 = (number) => (number < 10 ? '0' : '') + number;

export const pad_ = (n, len) =>
  (0).toFixed(len).slice(2, -n.toString().length) + n.toString();

export const dateTime = (date = moment(), formatString) => {

  return moment(date).format(formatString);
}
}
export const jollibeeCurrency = ({ value = 0, currency }) => {
  return (
    Number(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      .replace(/\.?0+$/, '') +
    ' ' +
    currency
  );
};
