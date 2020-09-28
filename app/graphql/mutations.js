import gql from 'graphql-tag';

// create customer account mutation
export const SIGN_UP = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createCustomer(
      input: {
        firstname: $name
        lastname: $name
        email: $email
        password: $password
      }
    ) {
      customer {
        email
      }
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
