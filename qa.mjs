import { chromium } from "playwright";
const OUT = "C:/Users/ABHIJE~1/AppData/Local/Temp/claude/c--Users-abhijeetp-Desktop-Redape/1c9dcdc0-8cae-4163-afe9-68f852037f2f/scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 950 } });
const errs = [];
page.on("pageerror", e => errs.push(e.message));
page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
await page.goto("http://localhost:5183", { waitUntil: "networkidle" });

// park the command card in view
await page.evaluate(() => {
  const h = [...document.querySelectorAll("h2")].find(x => x.textContent.includes("Say it"));
  h.closest("section").scrollIntoView({ block: "start" });
});
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollBy(0, 420));
await page.waitForTimeout(400);

// sample the demo state ~every 250ms across two full loops
const seen = [];
for (let i = 0; i < 60; i++) {
  const s = await page.evaluate(() => {
    const list = document.querySelector('p')?.ownerDocument;
    const open = !!document.querySelector('[class*="shadow-[0_18px_49px"]');
    const toast = !!Array.from(document.querySelectorAll("span")).find(e => e.textContent?.startsWith("RedApe AI has successfully"));
    const busy = !!document.querySelector('[class*="conic-gradient"]');
    const field = Array.from(document.querySelectorAll("p")).find(p =>
      p.textContent?.includes("What would you like") || p.textContent?.startsWith("Create a festive"));
    return { open, toast, busy, field: field ? field.textContent.slice(0, 22) : "-" };
  });
  const key = `open=${s.open} busy=${s.busy} toast=${s.toast} field="${s.field}"`;
  if (seen[seen.length - 1] !== key) seen.push(key);
  await page.waitForTimeout(250);
}
console.log("distinct states observed over ~15s:");
seen.forEach(s => console.log("  " + s));
await page.screenshot({ path: OUT + "/60-command.png" });
console.log("\nerrors:", JSON.stringify(errs.slice(0,4)));
await browser.close();
