import gql from 'graphql-tag';

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

export const SIGN_OUT = gql`
  mutation {
    revokeStaffToken {
      result
    }
  }
`;
