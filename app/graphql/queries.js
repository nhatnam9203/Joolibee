import { gql } from '@apollo/client';

export const ORDER_LIST = gql`
  {
    customerOrders {
      items {
        __typename
        order_number
        id
        created_at
        grand_total
        status
        address
        shipping_method
      }
    }
  }
`;

// MENU

export const MENU_DETAIL = gql`
  {
    products(filter: { category_id: { eq: "3" } }) {
      items {
        sku
        __typename
        id
        name
        point
        image {
          url
        }
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
      }
    }
  }
`;

// HOME_SCREEN
export const HOME_SCREEN = gql`
  {
    homeScreen {
      __typename
      banners
      best_sellers {
        __typename
        id
        name
        point
        price_range {
          __typename
          maximum_price {
            __typename
            final_price {
              __typename
              value
              currency
            }
          }
          minimum_price {
            __typename
            final_price {
              __typename
              value
              currency
            }
          }
        }
        image {
          __typename
          url
        }
      }
      news {
        __typename
        content
        featured_image
        post_id
        short_content
        title
      }
      promotions {
        __typename
        id
        name
        point
        price_range {
          __typename
          maximum_price {
            __typename
            final_price {
              __typename
              value
              currency
            }
          }
          minimum_price {
            __typename
            final_price {
              __typename
              value
              currency
            }
          }
        }
        image {
          __typename
          url
        }
      }
      static_content {
        __typename
        description
        short_description
        title
      }
    }
  }
`;

// ADDRESS_LIST
export const ADDRESS_LIST = gql`
  {
    customer {
      addresses {
        __typename
        id
        city
        street
        company
        country_code
        default_billing
        default_shipping
        fax
        postcode
        firstname
        lastname
        full_address
        region {
          __typename
          region
          region_id
          region_code
        }
        telephone
        vat_id
      }
    }
  }
`;

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

export const MENU_DETAIL_LIST = gql`
  query products($categoryId: String!) {
    products(filter: { category_id: { eq: $categoryId } }) {
      items {
        id
        sku
        name
        point
        image {
          url
        }
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
      }
    }
  }
`;
