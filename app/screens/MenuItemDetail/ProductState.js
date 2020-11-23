export const PRODUCT_SET = 'detail-product-set';
export const PRODUCT_UPDATE = 'detail-product-update';
export const PRODUCT_UPDATE_OPTIONS = 'detail-product-update-options';

export const productReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_SET:
      if (action.payload) {
        const { items } = action.payload;
        if (items) {
          const arr = [...items];
          arr?.sort((a, b) => a.position - b.position);
          return Object.assign({}, action.payload, { items: arr });
        }
        return action.payload;
      }
      return action.payload;
    case PRODUCT_UPDATE:
      return Object.assign({}, state, action.payload);
    case PRODUCT_UPDATE_OPTIONS:
      const optionsItem = action.payload;
      const mapArray = state.items.map((x) => {
        if (x.option_id === optionsItem.option_id) {
          return optionsItem;
        } else {
          return x;
        }
      });

      return Object.assign({}, state, { items: mapArray });
    default:
      break;
  }
};

export const setProduct = (item) => {
  return {
    type: PRODUCT_SET,
    payload: item,
  };
};

export const updateProduct = (item) => {
  return {
    type: PRODUCT_UPDATE,
    payload: item,
  };
};

export const updateOption = (optionsItem) => {
  return {
    type: PRODUCT_UPDATE_OPTIONS,
    payload: optionsItem,
  };
};
