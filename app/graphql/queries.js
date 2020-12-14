import { gql } from '@apollo/client';

export const ORDER_LIST = gql`
  {
    customerOrders {
      items {
        number
        id
      }
    }
  }
`;

// MENU

export const MENU_DETAIL = gql`
  {
    products(filter: { category_id: { eq: "3" } }) {
      items {
        id
        __typename
        sku
        name
        point
        image {
          url
        }
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

// // ADDRESS_LIST
// export const ADDRESS_LIST = gql`
//   {
//     customer {
//       addresses {
//         __typename
//         id
//         city
//         street
//         company
//         country_code
//         default_billing
//         default_shipping
//         fax
//         postcode
//         firstname
//         lastname
//         full_address
//         region {
//           __typename
//           region
//           region_id
//           region_code
//         }
//         telephone
//         vat_id
//       }
//     }
//   }
// `;

export const MENU_DETAIL_LIST = gql`
  query products($categoryId: String!) {
    products(filter: { category_id: { eq: $categoryId } }) {
      items {
        id
        sku
        name
        point
        image {
          url
        }
        price_range {
          maximum_price {
            final_price {
              value
              currency
            }
          }
          minimum_price {
            final_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;
