import { gql } from '@apollo/client';

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

export const CREATE_EMPTY_CART = gql`
  mutation {
    createEmptyCart
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation($cart_id: String!, $cart_items: [CartItemInput!]!) {
    addProductsToCart(cartId: $cart_id, cartItems: $cart_items) {
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
            meta_description
            options_container
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
            customizable_options {
              id
              values {
                id
                label
              }
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
    }
  }
`;

export const UPDATE_CART_PRODUCT = gql`
  mutation($cart_id: String!, $cart_item_id: Int!, $quantity: Float!) {
    updateCartItems(
      input: {
        cart_id: $cart_id
        cart_items: [{ cart_item_id: $cart_item_id, quantity: $quantity }]
      }
    ) {
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
    }
  }
`;
