import { AppStyles, images } from '@theme';
export function getColor(status = '') {
  switch (status.toLowerCase()) {
    case 'đang giao hàng':
      return AppStyles.colors.delivery;

    case 'đã xác nhận':
      return AppStyles.colors.dark_aqua;

    case 'đã hủy':
      return AppStyles.colors.accent;

    case 'đã đến nơi':
      return AppStyles.colors.confirmed;

    case 'hoàn thành':
      return AppStyles.colors.complete;

    default:
      return AppStyles.colors.confirmed;
  }
}

export function getImage(status = '') {
  switch (status.toLowerCase()) {
    case 'đang giao hàng':
      return images.jolibee_delivery;

    case 'đã xác nhận':
      return images.jolibee_cooking;

    case 'đã đến nơi':
      return images.jollibee_arrived;

    default:
      return '';
  }
}

export function convertStatusOrder(status = '') {
  console.log('status', status);
  // pending, received, cooking, ready, shipping, complete;
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Đang chờ xác nhận';
    case 'shipping':
      return 'Đang giao hàng';

    case 'received':
      return 'Đã xác nhận';

    case 'ready':
      return 'Đã đến nơi';
    case 'complete':
      return 'Hoàn thành';

    default:
      return '';
  }
}
