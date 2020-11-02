import moment from 'moment';

export const trimSpaces = (text) => text && text.replace(/\s/g, '');

export const pad2 = (number) => (number < 10 ? '0' : '') + number;

export const pad_ = (n, len) =>
  (0).toFixed(len).slice(2, -n.toString().length) + n.toString();

export const dateTime = (date = new Date(), formatString) => {
  return moment(date).format(formatString);
};

export const date = (date = new Date()) => {
  return moment(date).format('DD/MM/YYYY');
};

export const hours = (date = new Date()) => {
  return moment(date).format('hh:mm A');
};

// export const
export const jollibeeCurrency = ({ value = 0, currency = '' }) => {
  switch (currency) {
    case 'USD':
      return `${Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .replace(/\.?0+$/, '')} $`;
    case 'VND':
    default:
      return `${Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .replace(/\.?0+$/, '')} đ`;
  }
};

export const convertString = (str = '') => {
  if (str) {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
  }
};
