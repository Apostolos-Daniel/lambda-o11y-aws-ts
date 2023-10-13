/* eslint-disable no-undef */
module.exports = {
  '**/*.{ts,js,json}': ['prettier --write', 'eslint --max-warnings 0 --fix'],
  '*.md': ['prettier --write'],
};
