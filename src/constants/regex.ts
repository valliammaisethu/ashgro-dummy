export const REGEX = {
  DIGITS: /[^\d]/g,
  TWO_DECIMALS: /^\d+(\.\d{1,2})?$/,
  LETTERS: /^[A-Za-z]+$/,
  LETTERS_WITH_SPACES: /^[A-Za-z\s]+$/,
  PHONE_NUMBER: /^(\(\d{3}\)\s?\d{3}-?\d{4}|\d{10})?$/,
};
