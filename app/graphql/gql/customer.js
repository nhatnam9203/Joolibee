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
      email
      billing_address {
        city
        country {
          code
          label
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
      }
      shipping_addresses {
        firstname
        lastname
        street
        city
        region {
          code
          label
        }
        country {
          code
          label
        }
        telephone
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            value
            currency
          }
          price_incl_tax {
            value
            currency
          }
        }
        selected_shipping_method {
          amount {
            value
            currency
          }
          carrier_code
          carrier_title
          method_code
          method_title
        }
      }
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
      available_payment_methods {
        code
        title
      }
      selected_payment_method {
        code
        title
      }
      applied_coupons {
        code
      }
      total_quantity
      bonus_point
      prices {
        __typename
        grand_total {
          value
          currency
        }
        subtotal_excluding_tax {
          value
          currency
        }
        discounts {
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
  mutation($email: String!, $password: String!, $fcmToken: String!) {
    generateCustomerToken(
      email: $email
      password: $password
      fcmToken: $fcmToken
    ) {
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
