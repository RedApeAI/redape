import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1506, height: 800 } });
await p.goto('http://localhost:5199/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);

const samples = await p.evaluate(async () => {
  const bar = document.querySelector('header > div > div');
  const logo = bar.querySelector('a');
  const word = logo.querySelector('span');
  const buttons = bar.lastElementChild;
  const out = [];
  const t0 = performance.now();

  const snap = () => {
    const bb = bar.getBoundingClientRect();
    const bt = buttons.getBoundingClientRect();
    out.push({
      t: Math.round(performance.now() - t0),
      barW: +bb.width.toFixed(1),
      barR: +bb.right.toFixed(1),
      btnR: +bt.right.toFixed(1),
      over: +(bt.right - bb.right).toFixed(1),
      wordW: +word.getBoundingClientRect().width.toFixed(1),
    });
  };

  snap();
  window.scrollTo(0, 400);
  for (let i = 0; i < 34; i++) {
    await new Promise(r => requestAnimationFrame(r));
    if (i % 2 === 0) snap();
  }
  await new Promise(r => setTimeout(r, 700));
  snap();
  return out;
});

for (const s of samples) console.log(JSON.stringify(s));
await b.close();
