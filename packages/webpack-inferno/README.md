# @svgr/webpack-inferno

[comment]: <> ([![Build Status]&#40;https://img.shields.io/travis/gregberge/svgr.svg&#41;]&#40;https://travis-ci.org/gregberge/svgr&#41;)

[comment]: <> ([![Version]&#40;https://img.shields.io/npm/v/@svgr/webpack.svg&#41;]&#40;https://www.npmjs.com/package/@svgr/webpack&#41;)

[comment]: <> ([![MIT License]&#40;https://img.shields.io/npm/l/@svgr/webpack.svg&#41;]&#40;https://github.com/gregberge/svgr/blob/master/LICENSE&#41;)

Webpack-inferno loader for SVGR.

```
npm install @svgr/webpack-inferno --save-dev
```

## Usage

In your `webpack.config.js`:

```js
{
  test: /\.svg$/,
  use: ['@svgr/webpack-inferno']
}
```

In your code:

```js
import Star from './star.svg'

const App = () => (
  <div>
    <Star />
  </div>
)
```

### Passing options

```js
{
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack-inferno',
      options: {
        native: true,
      },
    },
  ],
}
```

### Using with `url-loader` or `file-loader`

It is possible to use it with [`url-loader`](https://github.com/webpack-contrib/url-loader) or [`file-loader`](https://github.com/webpack-contrib/file-loader).

In your `webpack.config.js`:

```js
{
  test: /\.svg$/,
  use: ['@svgr/webpack-inferno', 'url-loader']
}
```

In your code:

```js
import starUrl, { ReactComponent as Star } from './star.svg'

const App = () => (
  <div>
    <img src={starUrl} alt="star" />
    <Star />
  </div>
)
```

The named export defaults to `ReactComponent`, but can be customized with the `namedExport` option.

### Use your own Babel configuration

By default, `@svgr/webpack-inferno` includes a `babel-loader` with [an optimized configuration](https://github.com/gregberge/svgr/blob/master/packages/webpack/src/index.js). In some case you may want to apply a custom one (if you are using Preact for an example). You can turn off Babel transformation by specifying `babel: false` in options.

```js
// Example using preact
{
  test: /\.svg$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['preact', 'env'],
      },
    },
    {
      loader: '@svgr/webpack-inferno',
      options: { babel: false },
    }
  ]
}
```

### Handle SVG in CSS, Sass or Less

It is possible to detect the module that requires your SVG using [`Rule.issuer`](https://webpack.js.org/configuration/module/#rule-issuer) in Webpack. Using it you can specify two different configurations for JavaScript and the rest of your files.

```js
[
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: {
      test: /\.jsx?$/
    },
    use: ['babel-loader', '@svgr/webpack-inferno', 'url-loader']
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader'
  },
]
```

## License

MIT
