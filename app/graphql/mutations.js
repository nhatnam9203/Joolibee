import gql from 'graphql-tag';

// create customer account mutation
export const SIGNUP = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createCustomer(
      input: {
        firstname: $firstName
        lastname: $lastName
        email: $email
        password: $password
      }
    ) {
      email
    }
  }
`;
