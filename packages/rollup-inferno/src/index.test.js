import { rollup } from 'rollup'
import image from 'rollup-plugin-image'
import url from 'rollup-plugin-url'
import svgrRollupInferno from './index'

const compile = (plugins = [svgrRollupInferno()]) =>
  rollup({
    input: './__fixtures__/simple/file.svg',
    plugins,
  })

const getCode = (bundler) =>
  bundler.cache.modules.find(
    ({ id }) =>
      id.includes('__fixtures__/simple/file.svg') ||
      id.includes('__fixtures__\\simple\\file.svg'),
  ).code

describe('rollup loader InfernoJS', () => {
  it('should convert file', async () => {
    const code = await compile([svgrRollupInferno()])
    expect(getCode(code)).toMatchSnapshot()
  })

  it('should convert file without babel', async () => {
    const code = await compile([svgrRollupInferno({ babel: false })])
    expect(getCode(code)).toMatchSnapshot()
  })

  it('should convert file with previousExport of image plugin', async () => {
    const code = await compile([image(), svgrRollupInferno({ babel: false })])
    expect(getCode(code)).toMatchSnapshot()
  })

  it('should convert file with previousExport of url plugin', async () => {
    const code = await compile([url(), svgrRollupInferno({ babel: false })])
    expect(getCode(code)).toMatchSnapshot()
  })
});
