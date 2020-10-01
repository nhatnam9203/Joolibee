import { AppStyles } from "@theme";
export default function getColorStatusOrder(status = '') {
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