import { gql } from '@apollo/client';

// HOME_SCREEN
export const HOME_SCREEN = gql`
  {
    homeScreen {
      __typename
      banners {
        image_url
        product_id
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
      promotions {
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
      static_content {
        __typename
        description
        short_description
        title
      }
    }
  }
`;
