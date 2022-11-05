const test = require('ava');
const { renderOgImage } = require('../src/renderOgImage');

test('works with example', async (t) => {
  const { html, svg, pngBuffer } = await renderOgImage('./test/og-test.og.njk', undefined, {
    width: 1200,
    height: 630,
    fonts: [],
  });

  t.snapshot(html);
  t.snapshot(svg);

  t.is(typeof html, 'string');
  t.is(typeof svg, 'string');
  t.is(typeof pngBuffer, 'object');
});
