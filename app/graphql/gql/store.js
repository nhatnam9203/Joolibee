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
