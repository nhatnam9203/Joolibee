import moment from 'moment';
import _ from 'lodash';
import { translate } from '@localize';
export const trimSpaces = (text) => text && text.replace(/\s/g, '');

export const pad2 = (number) => (number < 10 ? '0' : '') + number;

export const dateFormatString = 'DD/MM/YYYY';

export const pad_ = (n, len) =>
  (0).toFixed(len).slice(2, -n.toString().length) + n.toString();

export const dateTime = (d = new Date(), formatString = 'DD/MM/YYYY') => {
  return moment(d).format(formatString);
};

export const date = (d = new Date()) => {
  return moment(d, 'DD/MM/YYYY');
};

export const hours = (d, extraMinutes = 0) => {
  const dateString = d ?? new Date();
  return moment(dateString)
    .add('7:00', 'hours')
    .add(extraMinutes, 'minutes')
    .format('hh:mm A');
};

export const compareTime = (date) => {
  const currentTime = moment().format('hh:mm A');
  var startTime = moment(currentTime, 'HH:mm:ss a');
  var endTime = moment(hours(date), 'HH:mm:ss a');
  var second = endTime.diff(startTime, 'second');
  return second ?? 75000;
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
    case 5:
      return {
        region: data[4],
        city: data[3],
        district: data[2],
        ward: data[1],
      };
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

export const translatePlaceAddress = (place = '') => {
  switch (place) {
    case 'home':
      return translate('txtHome');
    case 'company':
      return translate('txtCompany');

    case 'other':
      return translate('txtOther');

    default:
      return place;
  }
};
