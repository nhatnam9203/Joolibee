import { gql } from '@apollo/client';

/**
 * QUERY
 */

export const CUSTOMER_INFO = gql`
  {
    customer {
      __typename
      email
      firstname
      lastname
      phone_number
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
`;

export const CUSTOMER_CART_QUERY = gql`
  {
    customerCart {
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
      total_quantity
      prices {
        grand_total {
          value
          currency
        }
        subtotal_excluding_tax {
          value
          currency
        }
        discounts {
          label
          amount {
            value
            currency
          }
        }
      }
    }
  }
`;

/**
 * MUTATION
 */

// SIGN UP
export const REGISTER_CUSTOMER = gql`
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

// SIGN IN
export const GENERATE_CUSTOMER_TOKEN = gql`
  mutation($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

// SIGN OUT
export const REVOKE_CUSTOMER_TOKEN = gql`
  mutation {
    revokeCustomerToken {
      result
    }
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
  ) {
    updateCustomerInfo(
      input: {
        date_of_birth: $date_of_birth
        gender: $gender
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: "Admin123456"
      }
    ) {
      customer {
        email
        date_of_birth
        gender
        firstname
        lastname
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
