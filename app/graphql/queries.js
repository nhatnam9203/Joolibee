import gql from 'graphql-tag';

export const ORDER_LIST = gql`
  query {
    deliveryOrders {
      new {
        address
        created_at
        firstname
        grand_total
        id
        lastname
        order_number
        payment_method
        status
      }
      recently {
        address
        created_at
        firstname
        grand_total
        id
        lastname
        order_number
        payment_method
        status
      }
    }
  }
`;
