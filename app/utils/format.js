export const trimSpaces = (text) => text && text.replace(/\s/g, '');

export const pad2 = (number) => (number < 10 ? '0' : '') + number;

export const pad_ = (n, len) =>
  (0).toFixed(len).slice(2, -n.toString().length) + n.toString();
