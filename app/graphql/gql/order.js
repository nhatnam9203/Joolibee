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
