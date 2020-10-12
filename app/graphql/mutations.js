import gql from 'graphql-tag';

// create customer account mutation
export const SIGN_UP = gql`
  mutation(
    $email: String!
    $password: String!
    $firstname: String
    $lastname: String!
    $date_of_birth: String
  ) {
    mutation {
      createCustomer(
        input: {
          firstname: $firstname
          lastname: $lastname
          email: $email
          password: $password
          is_subscribed: true
        }
      ) {
        customer {
          firstname
          lastname
          email
          is_subscribed
        }
      }
    }
  }
`;
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
