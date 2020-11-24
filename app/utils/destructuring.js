export const imageURLOfItem = (item) => {
  if (!item) {
    return '';
  }
  const {
    product: {
      image: { url },
    },
  } = item;
  return url;
};

/**
 *
 * @param {*} price_range
 * @format
 * price_range{
 * maximum_price{
 *  regular_price{
 *   valuecurrency
 *  }final_price{
 *  valuecurrency
 *  }
 * }minimum_price{
 *  regular_price{
 *    valuecurrency
 *  }final_price{
 *    valuecurrency
 *  }
 *}
 *}
 */

export const priceOfRange = (price_range) => {
  if (!price_range) {
    return {};
  }

  const {
    maximum_price = { final_price: 0 },
    minimum_price = { final_price: 0 },
  } = price_range;

  const sellPrice = minimum_price?.final_price;
  const showPrice = maximum_price?.final_price ?? null;

  return {
    sellPrice: sellPrice,
    showPrice: showPrice,
  };
};
