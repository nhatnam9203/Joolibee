import { gql } from '@apollo/client';

/**
 *  used_point {
      point
      amount
    }
 */
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
        prices {
          price {
            value
            currency
          }
        }
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
      bonus_point
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
  mutation($cart_id: String) {
    createEmptyCart(input: { cart_id: $cart_id })
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
          prices {
            price {
              value
              currency
            }
          }
          quantity
        }
        total_quantity
        bonus_point
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
          prices {
            price {
              value
              currency
            }
          }
          quantity
        }
        total_quantity
        bonus_point
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

export const SET_ORDER_SHIPPING_ADDRESS = gql`
  mutation($cart_id: String!, $shipping_addresses: [ShippingAddressInput!]!) {
    setShippingAddressesOnCart(
      input: { cart_id: $cart_id, shipping_addresses: $shipping_addresses }
    ) {
      cart {
        shipping_addresses {
          firstname
          lastname
          company
          street
          city
          region {
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
`;

export const SET_ORDER_BILLING_ADDRESS = gql`
  mutation($cart_id: String!, $billing_address: BillingAddressInput!) {
    setBillingAddressOnCart(
      input: { cart_id: $cart_id, billing_address: $billing_address }
    ) {
      cart {
        billing_address {
          firstname
          lastname
          company
          street
          city
          region {
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
`;

export const SET_ORDER_PAYMENT_METHOD = gql`
  mutation($cart_id: String!, $payment_method: PaymentMethodInput!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cart_id, payment_method: $payment_method }
    ) {
      cart {
        selected_payment_method {
          code
        }
      }
    }
  }
`;

export const SET_ORDER_SHIPPING_METHOD = gql`
  mutation($cart_id: String!, $shipping_methods: [ShippingMethodInput!]!) {
    setShippingMethodsOnCart(
      input: { cart_id: $cart_id, shipping_methods: $shipping_methods }
    ) {
      cart {
        shipping_addresses {
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
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

export const APPLY_COUPON_TO_CART = gql`
  mutation($cart_id: String!, $coupon_code: String!) {
    applyCouponToCart(input: { cart_id: $cart_id, coupon_code: $coupon_code }) {
      cart {
        applied_coupons {
          code
        }
      }
    }
  }
`;

//restaurant_id: $restaurant_id
export const PLACE_ORDER = gql`
  mutation($cart_id: String!) {
    placeOrder(input: { cart_id: $cart_id }) {
      order {
        order_number
      }
    }
  }
`;

export const REDEEM_POINT_CUSTOMER = gql`
  mutation($cart_id: String!, $redeemPoint: Int!) {
    useCustomerPoint(cartId: $cart_id, redeemPoint: $redeemPoint) {
      point
      amount
    }
  }
`;
