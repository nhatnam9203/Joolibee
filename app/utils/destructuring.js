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
