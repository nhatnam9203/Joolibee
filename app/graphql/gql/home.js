import { gql } from '@apollo/client';

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
