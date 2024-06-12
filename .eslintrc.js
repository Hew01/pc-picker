module.exports = {
    root: true,
    extends: ['@react-native-community',
        'plugin:react/recommend',
        'plugin:react/jsx-runtime',
        'plugin:prettier/recommend'
    ],
    plugins: ['prettier', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        'react/jsx-uses-react': 1,
        'arrow-body-style': ['error'],
    }
}