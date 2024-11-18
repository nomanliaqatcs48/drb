const path = require('path');

module.exports = {
  // ... other webpack configuration options

  module: {
    rules: [
      // Rule for CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Rule for SCSS files
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      // Rule for TypeScript files
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  // ... other webpack configuration options
};




