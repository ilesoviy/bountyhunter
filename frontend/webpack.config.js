module.exports = (config, context) => {
  return {
    ...config,
    node: {
      global: true,
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          enforce: 'pre',
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            },
            "source-map-loader"
          ],
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        { test: /\.m?js/, type: "javascript/auto" }
      ],
    },
    resolve: { modules: ['node_modules'] },
    ignoreWarnings: [/Failed to parse source map/],
  };
};