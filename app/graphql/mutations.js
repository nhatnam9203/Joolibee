import { gql } from '@apollo/client';

// SIGN UP CUSTOMER ACCOUNT
export const SIGN_UP = gql`
  mutation(
    $phone_number: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $gender: Int
    $email: String
    $dob: String
    $is_subscribed: Boolean!
    $validateType: String
    $fcmToken: String
  ) {
    registerCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        phone_number: $phone_number
        password: $password
        email: $email
        gender: $gender
        dob: $dob
        is_subscribed: $is_subscribed
      }
      validateType: $validateType
      fcmToken: $fcmToken
    ) {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`;

// SIGN IN CUSTOMER ACCOUNT
export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;
// FEED BACK CUSTOMER
export const FEED_BACK = gql`
  mutation($orderId: String!, $rating: Int!, $comment: String) {
    feedBackCustomer(
      order_id: $orderId
      customer_rating: $rating
      customer_comment: $comment
    ) {
      result
    }
  }
`;
//

// CREATE EMPTY CART
export const CREATE_EMPTY_CART = gql`
  mutation {
    createEmptyCart
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
        items {
          id
          product {
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
        prices {
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
`;

// ADD ADDRESS CUSTOMER
export const ADD_ADDRESS = gql`
  mutation(
    $company: String!
    $region: String!
    $country_code: CountryCodeEnum
    $street: [String]
    $telephone: String!
    $postcode: String!
    $city: String!
    $firstname: String!
    $lastname: String!
    $default_shipping: Boolean
    $default_billing: Boolean
  ) {
    createCustomerAddress(
      input: {
        company: $company
        region: { region: $region, region_code: "VN" }
        country_code: $country_code
        street: [$street]
        telephone: $telephone
        postcode: $postcode
        city: $city
        firstname: $firstname
        lastname: $lastname
        default_shipping: $default_shipping
        default_billing: $default_billing
      }
    ) {
      id
      region {
        region
        region_code
      }
      country_code
      street
      telephone
      postcode
      city
      default_shipping
      default_billing
    }
  }
`;

// UPDATE ADDRESS CUSTOMER
export const UPDATE_ADDRESS = gql`
  mutation(
    $id: Int!
    $company: String!
    $region: String!
    $street: [String]
    $telephone: String!
    $city: String!
    $firstname: String!
    $lastname: String!
  ) {
    updateCustomerAddress(
      id: $id
      input: {
        company: $company
        region: { region: $region, region_code: "VN" }
        street: $street
        telephone: $telephone
        city: $city
        firstname: $firstname
        lastname: $lastname
      }
    ) {
      id
      city
      postcode
    }
  }
`;

// DELETE ADDRESS CUSTOMER
export const DELETE_ADDRESS = gql`
  mutation($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;
