import { gql } from '@apollo/client';

export const PROMOTION_LIST = gql`
  query {
    promotionScreen {
      list {
        title
        image
        url
        product_sku
      }
    }
  }
`;
