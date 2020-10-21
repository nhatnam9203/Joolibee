import { AppStyles, images } from "@theme";
export function getColor(status = '') {
    switch (status.toLowerCase()) {
        case 'đang giao hàng':
            return AppStyles.colors.button

        case 'đã xác nhận':
            return AppStyles.colors.confirmed

        case 'đã hủy':
            return AppStyles.colors.accent

        case 'đã đến nơi':
            return AppStyles.colors.orange

        case 'hoàn thành':
            return AppStyles.colors.complete

        default:
            return AppStyles.colors.confirmed
    }
};

export function getImage(status = '') {
    switch (status.toLowerCase()) {
        case 'đang giao hàng':
            return images.jolibee_delivery

        case 'đã xác nhận':
            return images.jolibee_cooking

        case 'đã đến nơi':
            return images.jollibee_arrived

        default:
            return ''
    }
};

export function convertStatusOrder(status = '') {
    switch (status.toLowerCase()) {
        case 'đang giao hàng':
            return 'đang giao hàng'

        case 'received':
            return 'đã xác nhận'

        case 'đã đến nơi':
            return 'đã đến nơi'

        default:
            return ''
    }
};