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
        __typename
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

// SIGNOUT
export const SIGN_OUT = gql`
  mutation {
    revokeCustomerToken {
      result
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
        total_quantity
        items {
          id
          __typename
          product {
            id
            __typename
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
          __typename
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
`;

// DELETE ADDRESS CUSTOMER
export const DELETE_ADDRESS = gql`
  mutation($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;

// UPDATE CUSTOMER INFO
export const UPDATE_CUSTOMER = gql`
  mutation(
    $date_of_birth: String
    $gender: Int
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    updateCustomerInfo(
      input: {
        date_of_birth: $date_of_birth
        gender: $gender
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      customer {
        __typename
        email
        firstname
        lastname
        gender
        date_of_birth
        addresses {
          id
          city
          full_address
          default_shipping
          firstname
          lastname
          telephone
          street
          company
          region {
            __typename
            region
            region_id
            region_code
          }
        }
      }
    }
  }
`;

//CHANGE CUSTOMER PASSWORD
export const CHANGE_PASSWORD = gql`
  mutation($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      email
    }
  }
`;
