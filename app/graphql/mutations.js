import { gql } from '@apollo/client';

// SIGN UP CUSTOMER ACCOUNT


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
