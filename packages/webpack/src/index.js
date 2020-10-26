import { getOptions } from 'loader-utils'
import { transformAsync, createConfigItem } from '@babel/core'
import convert from '@svgr/core'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
import presetReact from '@babel/preset-react'
import babelPluginInferno from 'babel-plugin-inferno'
import presetEnv from '@babel/preset-env'
import pluginTransformReactConstantElements from '@babel/plugin-transform-react-constant-elements'

const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [
    createConfigItem(presetReact, { type: 'preset' }),
    createConfigItem([presetEnv, { modules: false }], { type: 'preset' }),
  ],
  plugins: [createConfigItem(pluginTransformReactConstantElements)],
}

function svgrLoader(source) {
  const callback = this.async()
  const { babel = true, ...options } = getOptions(this) || {}

  if (options.useInfernoJsMode) {
    babelOptions.presets = [
      createConfigItem([presetEnv, { modules: false }], { type: 'preset' }),
    ]
    babelOptions.plugins = [
      createConfigItem(pluginTransformReactConstantElements),
      [babelPluginInferno, { 'imports': true }],
    ]
  }

  const readSvg = () =>
    new Promise((resolve, reject) => {
      this.fs.readFile(this.resourcePath, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })

  const previousExport = (() => {
    if (source.toString('utf-8').startsWith('export ')) {
      return source
    }

    const exportMatches = source
      .toString('utf-8')
      .match(/^module.exports\s*=\s*(.*)/)
    return exportMatches ? `export default ${exportMatches[1]}` : null
  })()

  const tranformSvg = (svg) =>
    convert(svg, options, {
      caller: {
        name: '@svgr/webpack',
        previousExport,
        defaultPlugins: [svgo, jsx],
      },
      filePath: this.resourcePath,
    })
      .then((jsCode) => {
        if (!babel) return jsCode
        return transformAsync(jsCode, babelOptions).then(({ code }) => code)
      })
      .then((result) => callback(null, result))
      .catch((err) => callback(err))

  if (previousExport) {
    readSvg().then(tranformSvg)
  } else {
    tranformSvg(source)
  }
}

export default svgrLoader
