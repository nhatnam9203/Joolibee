
import { Linking } from "react-native";
export function makeAPhoneCall(phone) {
    Linking.openURL(`tel:${phone}`)
};