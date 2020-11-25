import { gql } from '@apollo/client';

// ADDRESS_LIST
export const ADDRESS_LIST = gql`
  {
    customer {
      addresses {
        __typename
        id
        city
        street
        company
        country_code
        default_billing
        default_shipping
        fax
        postcode
        firstname
        lastname
        full_address
        region {
          __typename
          region
          region_id
          region_code
        }
        telephone
        vat_id
      }
    }
  }
`;

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
