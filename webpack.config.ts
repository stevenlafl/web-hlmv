import { Configuration } from 'webpack';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  devtool: 'source-map',
  entry: './index.tsx',

  module: {
    rules: [
      {
        test: /\.tsx?$/, // Matches .ts and .tsx files
        use: [
          {
            loader: 'ts-loader', // Use `ts-loader` to handle TypeScript files
            options: {
              transpileOnly: true, // Speed up compilation by skipping type checking (handled by `fork-ts-checker-webpack-plugin` if needed)
            },
          },
          // Optional: Babel loader to process JSX and compile down to older JS versions.
          {
            loader: 'babel-loader', // Use Babel to process TS/JSX to JS
            options: {
              plugins: [
                'react-hot-loader/babel', // Hot reloading plugin for React
                'babel-plugin-styled-components', // Plugin for better-style debugging
              ],
              presets: [
                '@babel/preset-env', // Transpile ES2015+ syntax 
                '@babel/preset-react', // Transpile JSX
                '@babel/preset-typescript', // Transpile TypeScript to JS
              ],
            },
          }
        ],
        exclude: /node_modules/, // Exclude node_modules from being transpiled
      },

      // Model loading
      {
        test: /\.mdl$/,
        use: 'file-loader', // Loader for files like .mdl
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Resolve both TypeScript and JavaScript file extensions
  },

  output: {
    filename: 'bundle.[contenthash].js', // Output bundle with content hash for cache busting
    path: path.resolve(__dirname, 'dist'), // Output directory
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html'), // HTML template for your app
    }),
  ],
};

export default config;