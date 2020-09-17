import gql from 'graphql-tag';

// create customer account mutation
export const SIGNUP = gql`
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

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    generateCustomerToken(input: { email: $email, password: $password }) {
      token
    }
  }
`;
