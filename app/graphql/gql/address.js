import { gql } from '@apollo/client';

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
