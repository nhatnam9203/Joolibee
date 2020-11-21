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
        full_address
        default_shipping
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
        id
        __typename
        product {
          name
          sku
        }
        quantity
      }
      total_quantity
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
