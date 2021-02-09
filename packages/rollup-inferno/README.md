# @svgr/rollup-inferno

[comment]: <> ([![Build Status]&#40;https://img.shields.io/travis/smooth-code/svgr.svg&#41;]&#40;https://travis-ci.org/smooth-code/svgr&#41;)

[comment]: <> ([![Version]&#40;https://img.shields.io/npm/v/@svgr/rollup.svg&#41;]&#40;https://www.npmjs.com/package/@svgr/rollup&#41;)

[comment]: <> ([![MIT License]&#40;https://img.shields.io/npm/l/@svgr/rollup.svg&#41;]&#40;https://github.com/smooth-code/svgr/blob/master/LICENSE&#41;)

Rollup-inferno plugin for SVGR.

```
npm install @svgr/rollup-inferno --save-dev
```

In your `rollup.config.js`:

```js
{
  plugins: [svgr()]
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
  plugins: [svgr({ native: true })]
}
```

### Using with `url` plugin

It is possible to use it with [`url`](https://github.com/rollup/rollup-plugin-url).

In your `rollup.config.js`:

```js
{
  plugins: [url(), svgr()]
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

By default, `@svgr/rollup` applies a babel transformation with [optimized configuration](https://github.com/smooth-code/svgr/blob/master/packages/rollup/src/index.js). In some case you may want to apply a custom one (if you are using Preact for an example). You can turn off Babel transformation by specifying `babel: false` in options.

```js
{
  plugins: [svgr({ babel: false })]
}
```

## License

MIT
