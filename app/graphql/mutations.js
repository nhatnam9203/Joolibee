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

export const SIGNIN = gql`
  mutation($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;
