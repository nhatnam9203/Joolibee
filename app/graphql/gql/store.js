import { gql } from '@apollo/client';

export const STORE_PICKUP = gql`
  query($cityId: Int!, $districtId: Int!) {
    shippingMethod(cityId: $cityId, districtId: $districtId) {
      results {
        carrier
        method
        stores {
          id
        }
      }
    }
  }
`;

export const STORE_JSON_INFO = gql`
  {
    getStoreJsonData {
      url
      version
    }
  }
`;

export const SEARCH_STORE_BY_ADDRESS = gql`
  mutation(
    $street_number: String
    $route: String
    $locality: String
    $sublocality_level_1: String
    $administrative_area_level_1: String
    $administrative_area_level_2: String
    $country: String
    $ward: String
    $neighborhood: String
    $order_amount: Int
  ) {
    searchStore(
      input: {
        street_number: $street_number
        route: $route
        locality: $locality
        sublocality_level_1: $sublocality_level_1
        administrative_area_level_1: $administrative_area_level_1
        administrative_area_level_2: $administrative_area_level_2
        country: $country
        ward: $ward
        neighborhood: $neighborhood
        order_amount: $order_amount
      }
    ) {
      area_data {
        store_id
      }
    }
  }
`;
