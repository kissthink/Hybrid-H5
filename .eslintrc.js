// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'elemefe'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi':'off',
    'comma-dangle':'off',
    'indent':'off',
    'quotes':'off',
    'no-reserved-keys':'off',
    'radix':'off',
    'no-unused-vars':'off',
    'no-multiple-empty-lines':'off',
    'space-infix-ops':'off',
    'operator-linebreak':'off',
    'no-mixed-spaces-and-tabs':'off',
    'no-new':'off',
    'keyword-spacing':'off',
    'eol-last':'off'
  }
}
