import { gql } from '@apollo/client';

//        product_sku
/**
 *     promotions {
        id
        __typename
        sku
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
 */

export const HOME_SCREEN = gql`
  {
    homeScreen {
      __typename
      banners {
        __typename
        image_url
      }
      best_sellers {
        id
        __typename
        sku
        name
        point
        image {
          url
        }
        is_hot
        price_range {
          __typename
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
      news {
        __typename
        content
        featured_image
        post_id
        short_content
        title
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

export const GET_NOTIFY_LIST = gql`
  {
    customerNotification {
      list {
        id
        title
        content
        is_read
        order_id
      }
    }
  }
`;

export const READ_CUSTOMER_NOTIFY = gql`
  mutation($id: Int!) {
    markReadCustomerNotification(id: $id) {
      result
    }
  }
`;
