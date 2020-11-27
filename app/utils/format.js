import moment from 'moment';
import _ from 'lodash';
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

export const addressFull = (item) => {
  const { city, street, region } = item || {};
  let _street = _.isEmpty(street) ? '' : street[0];
  let _region = _.isEmpty(region) ? '' : region.label;
  return `${_street} ${city} ${_region ? _region : ''}`;
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

export const caculatePoint = (data = []) => {
  const totalPoint = data.reduce((previous, current) => {
    return previous + current?.product?.point * current?.quantity || 0;
  }, 0);
  return totalPoint;
};

export const addresses_geocoding = (data = []) => {
  const number = data.length;
  switch (number) {
    case 4:
      return {
        region: data[3],
        city: data[2],
        district: data[1],
        ward: data[0],
      };
    case 3:
      return {
        region: data[2],
        city: data[1],
        district: data[0],
        ward: '',
      };

    case 2:
      return {
        region: data[1],
        city: data[0],
        district: '',
        ward: '',
      };
    case 1:
      return {
        region: data[0],
        city: '',
        district: '',
        ward: '',
      };

    default:
      return {};
  }
};
