import { gql } from '@apollo/client';
export const ORDER_DETAIL_CUSTOMER = gql`
  query($number: String!) {
    customer {
      orders(filter: { number: { eq: $number } }) {
        total_count
        items {
          id
          number
          order_date
          shipping_address {
            firstname
            lastname
            street
            city
            telephone
            region
          }
          shipping_method
          __typename
          items {
            __typename
            product_name
            product_sale_price {
              value
              currency
            }
            quantity_ordered
            quantity_invoiced
            quantity_shipped
          }
          total {
            grand_total {
              value
              currency
            }
            subtotal {
              value
              currency
            }
          }
          status
        }
      }
    }
  }
`;

export const ORDERS_CUSTOMER = gql`
  query {
    customerOrders {
      items {
        id
        __typename
        order_number
        created_at
        grand_total
        status
        address
        shipping_method
        store_name
        use_plastic
        shipper_info {
          id
          first_name
          last_name
          gender
          phone
        }
        voucher_discount_amount
      }
    }
  }
`;

// export const ORDERS_CUSTOMER = gql`
//   query {
//     customer {
//       orders {
//         items {
//           id
//           number
//           order_date
//           shipping_address {
//             firstname
//             lastname
//             street
//             city
//             telephone
//             region
//           }
//           shipping_method
//           __typename
//           items {
//             __typename
//             product_name
//             product_sale_price {
//               value
//               currency
//             }
//             quantity_ordered
//             quantity_invoiced
//             quantity_shipped
//           }
//           total {
//             grand_total {
//               value
//               currency
//             }
//             subtotal {
//               value
//               currency
//             }
//           }
//           status
//         }
//       }
//     }
//   }
// `;

export const RE_ORDER_CART = gql`
  mutation($orderNumber: String!) {
    reorderItems(orderNumber: $orderNumber) {
      cart {
        id
        __typename
        items {
          __typename
          id
          product {
            __typename
            id
            name
            sku
            point
            options_container
            meta_description
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
            image {
              url
            }
          }
          ... on BundleCartItem {
            bundle_options {
              id
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
          prices {
            price {
              value
              currency
            }
          }
          quantity
        }
        total_quantity
        prices {
          __typename
          grand_total {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
          }
        }
      }
      userInputErrors {
        code
        message
        path
      }
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation($orderId: Int!) {
    cancelOrderCustomer(orderId: $orderId) {
      result
    }
  }
`;
