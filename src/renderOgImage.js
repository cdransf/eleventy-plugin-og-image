import { readFileSync } from 'fs';
import { File } from '@11ty/eleventy/src/Plugins/RenderPlugin';
import { default as satori, init } from 'satori/wasm';
import { Resvg } from '@resvg/resvg-js';

/* eslint-disable n/no-unpublished-require */
import { default as initYoga } from '../build/yoga-wasm-web';
import { html as htmlToSatori } from '../build/satori-html';
/* eslint-enable n/no-unpublished-require */

const Yoga = initYoga(readFileSync(require.resolve('yoga-wasm-web/dist/yoga.wasm')));
init(Yoga);

/**
 * @param { string } inputPath
 * @param { Record<string, any> } [data]
 * @param { import('satori').SatoriOptions } satoriOptions
 * @param { import('@11ty/eleventy/src/TemplateConfig') } [templateConfig]
 *
 * @returns { Promise<{ html: string, svg: string, pngBuffer: Buffer }> }
 * */
export const renderOgImage = async ({ inputPath, data, satoriOptions, templateConfig }) => {
  const html = await (await File(inputPath, { templateConfig }))(data);
  const svg = await satori(htmlToSatori(html), satoriOptions);
  const pngBuffer = new Resvg(svg, { font: { loadSystemFonts: false } }).render().asPng();

  return { html, svg, pngBuffer };
};
