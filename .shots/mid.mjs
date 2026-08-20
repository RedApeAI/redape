import { chromium } from 'playwright';
const OUT = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1506, height: 800 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:5199/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const clip = { x: 0, y: 0, width: 1506, height: 150 };

// collapse, caught partway through
await p.evaluate(() => window.scrollTo(0, 400));
await p.waitForTimeout(130);
await p.screenshot({ path: `${OUT}/mid-collapse.png`, clip });
await p.waitForTimeout(900);
await p.screenshot({ path: `${OUT}/mid-settled.png`, clip });

// and the way back up
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(130);
await p.screenshot({ path: `${OUT}/mid-expand.png`, clip });
await p.waitForTimeout(900);
await p.screenshot({ path: `${OUT}/mid-expanded.png`, clip });
await b.close();
console.log('done');
