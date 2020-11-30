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
          status
          shipping_address {
            firstname
            lastname
            street
            city
            telephone
            region
          }
          items {
            product_name
            product_sku
            product_url_key
            product_sale_price {
              value
            }
            product_sale_price {
              value
              currency
            }
            quantity_ordered
            quantity_invoiced
            quantity_shipped
          }
          carrier
          shipments {
            id
            number
            items {
              product_name
              quantity_shipped
            }
          }
          total {
            base_grand_total {
              value
              currency
            }
            grand_total {
              value
              currency
            }
            total_tax {
              value
            }
            subtotal {
              value
              currency
            }
            taxes {
              amount {
                value
                currency
              }
              title
              rate
            }
            total_shipping {
              value
            }
            shipping_handling {
              amount_including_tax {
                value
              }
              amount_excluding_tax {
                value
              }
              total_amount {
                value
              }
              taxes {
                amount {
                  value
                }
                title
                rate
              }
            }
            discounts {
              amount {
                value
                currency
              }
              label
            }
          }
        }
      }
    }
  }
`;

export const ORDERS_CUSTOMER = gql`
  query {
    customer {
      orders {
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
              values {
                id
                label
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
    order_cancel(data: { order_id: $orderId, reason: "" }) {
      request_id
      complexity
      order {
        id
        legacy_id
        order_number
        fulfillment_status
        order_date
      }
    }
  }
`;
