import { AppStyles, images } from '@theme';
import { translate } from '@localize';
export function getColor(status = '') {
  switch (status) {
    case translate('txtStatusOrderShipping'):
      return AppStyles.colors.delivery;

    case translate('txtStatusOrderReceived'):
      return AppStyles.colors.dark_aqua;

    case translate('txtStatusOrderCancel'):
      return AppStyles.colors.accent;

    case translate('txtStatusOrderArrived'):
      return AppStyles.colors.confirmed;

    case translate('txtStatusOrderComplete'):
      return AppStyles.colors.complete;
    case translate('txtStatusOrderPending'):
      return AppStyles.colors.orange;

    default:
      return AppStyles.colors.confirmed;
  }
}

export function getImage(status = '') {
  switch (status) {
    case translate('txtStatusOrderShipping'):
      return images.jolibee_delivery;

    case translate('txtStatusOrderReceived'):
      return images.jolibee_cooking;

    case translate('txtStatusOrderArrived'):
      return images.jollibee_arrived;

    default:
      return '';
  }
}

export function convertStatusOrder(status = '') {
  // pending, received, cooking, ready, shipping, complete,ready_to_ship;

  switch (status.toLowerCase()) {
    case 'pending':
    case 'processing':
      return translate('txtStatusOrderPending');
    case 'shipping':
      return translate('txtStatusOrderShipping');
    case 'ready to ship':
    case 'ready_to_ship':
    case 'received':
    case 'cooking':
      return translate('txtStatusOrderReceived');
    case 'arrived':
      return translate('txtStatusOrderArrived');
    case 'complete':
    case 'completed':
      return translate('txtStatusOrderComplete');
    case 'cancel':
    case 'bom':
    case 'fraud':
    default:
      return translate('txtStatusOrderCancel');
  }
}
