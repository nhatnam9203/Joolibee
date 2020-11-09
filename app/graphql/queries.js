import { gql } from '@apollo/client';

export const ORDER_LIST = gql`
  {
    customerOrders {
      items {
        __typename
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
        __typename
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

// CART DETAIL
export const CART_DETAIL = gql`
  query($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      __typename
      email
      billing_address {
        city
        country {
          code
          label
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
      }
      shipping_addresses {
        firstname
        lastname
        street
        city
        region {
          code
          label
        }
        country {
          code
          label
        }
        telephone
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            value
            currency
          }
          price_incl_tax {
            value
            currency
          }
        }
        selected_shipping_method {
          amount {
            value
            currency
          }
          carrier_code
          carrier_title
          method_code
          method_title
        }
      }
      items {
        __typename
        id
        prices {
          price {
            value
            currency
          }
        }
        product {
          __typename
          id
          name
          sku
          point
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
        quantity
      }
      available_payment_methods {
        code
        title
      }
      selected_payment_method {
        code
        title
      }
      applied_coupons {
        code
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
  }
`;

// HOME_SCREEN
export const HOME_SCREEN = gql`
  {
    homeScreen {
      banners
      best_sellers {
        id
        name
        point
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
      news {
        content
        featured_image
        post_id
        short_content
        title
      }
      promotions {
        id
        name
        point
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
      static_content {
        description
        short_description
        title
      }
    }
  }
`;

// ADDRESS_LIST
export const ADDRESS_LIST = gql`
  {
    customer {
      addresses {
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

export const CUSTOMER_INFO = gql`
  {
    customer {
      email
      firstname
      lastname
      phone_number
      gender
      date_of_birth
    }
  }
`;
