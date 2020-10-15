import { gql } from '@apollo/client';

export const ORDER_LIST = gql`
  {
    customerOrders {
      items {
        order_number
        id
        created_at
        grand_total
        status
        address
        shipping_method
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
        name
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
