/**
 * URL Validation Script for YojanaFind
 * Tests every scheme URL with HEAD + GET requests,
 * follows redirects, and reports status.
 */

// All unique URLs from schemes.js (CENTRAL_SCHEMES + STATE_SCHEMES + KNOWN_URLS)
const URLS_TO_CHECK = [
  { id: "pm-kisan",        url: "https://pmkisan.gov.in/",                       source: "CENTRAL" },
  { id: "pmay",            url: "https://pmay-urban.gov.in/",                     source: "CENTRAL" },
  { id: "ayushman",        url: "https://beneficiary.nha.gov.in/",               source: "CENTRAL" },
  { id: "nsp",             url: "https://scholarships.gov.in/",                   source: "CENTRAL" },
  { id: "mudra",           url: "https://www.mudra.org.in/",                      source: "CENTRAL" },
  { id: "pmegp",           url: "https://msme.gov.in/",                           source: "CENTRAL" },
  { id: "ujjwala",         url: "https://pmuy.gov.in/",                           source: "CENTRAL" },
  { id: "pmsby",           url: "https://jansuraksha.gov.in/",                    source: "CENTRAL" },
  { id: "pmjjby",          url: "https://jansuraksha.gov.in/",                    source: "CENTRAL (dup)" },
  { id: "maternity",       url: "https://pmmvy.wcd.gov.in/",                     source: "CENTRAL" },
  { id: "naps",            url: "https://www.apprenticeshipindia.gov.in/",        source: "CENTRAL" },
  { id: "pmkvy",           url: "https://www.skillindiadigital.gov.in/",          source: "CENTRAL" },
  { id: "disability",      url: "https://socialjustice.gov.in/",                  source: "CENTRAL" },
  { id: "senior-pension",  url: "https://myscheme.gov.in/schemes/ignoaps",        source: "CENTRAL" },
  { id: "ddugky",          url: "https://myscheme.gov.in/schemes/ddugky",         source: "CENTRAL" },
  { id: "startup-india",   url: "https://seedfund.startupindia.gov.in/",          source: "CENTRAL" },
  // State schemes
  { id: "tn-kalaignar",    url: "https://cms.tn.gov.in/",                         source: "STATE-TN" },
  { id: "tn-scholarship",  url: "https://scholarships.gov.in/",                   source: "STATE-TN (dup)" },
  { id: "mh-ladki-bahin",  url: "https://ladakibahin.maharashtra.gov.in/",        source: "STATE-MH" },
  { id: "ka-gruha-jyoti",  url: "https://bescom.karnataka.gov.in/",               source: "STATE-KA" },
  { id: "ap-rythu-bharosa", url: "https://agriculture.ap.gov.in/",                source: "STATE-AP" },
  { id: "ts-rythu-bandhu", url: "https://telangana.gov.in/",                      source: "STATE-TS" },
  { id: "wb-lakshmir-bhandar", url: "https://socialsecurity.wb.gov.in/",          source: "STATE-WB" },
  { id: "rj-chiranjeevi",  url: "https://health.rajasthan.gov.in/",               source: "STATE-RJ" },
  // myscheme.gov.in general (used in fallback)
  { id: "fallback",        url: "https://www.myscheme.gov.in/",                   source: "FALLBACK" },
];

// Deduplicate by URL
const uniqueUrls = [...new Map(URLS_TO_CHECK.map(item => [item.url, item])).values()];
// But keep all entries for the report
const allEntries = URLS_TO_CHECK;

async function checkUrl(entry) {
  const { id, url, source } = entry;
  const result = { id, url, source, status: null, ok: false, redirectUrl: null, error: null, method: null };

  // Try HEAD first (faster)
  for (const method of ["HEAD", "GET"]) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      clearTimeout(timeout);
      result.status = response.status;
      result.ok = response.ok; // 2xx
      result.redirectUrl = response.url !== url ? response.url : null;
      result.method = method;

      // If HEAD works and returns 2xx, no need for GET
      if (result.ok) break;
      // If HEAD returns 405 Method Not Allowed, try GET
      if (response.status === 405) continue;
      // Otherwise keep the result
      break;
    } catch (err) {
      result.error = err.message || String(err);
      result.method = method;
      // If HEAD fails with network error, try GET
      if (method === "HEAD") continue;
    }
  }

  return result;
}

async function main() {
  console.log(`\n=== YojanaFind URL Validation ===`);
  console.log(`Checking ${allEntries.length} URL entries (${uniqueUrls.length} unique URLs)...\n`);

  const results = [];

  for (const entry of allEntries) {
    process.stdout.write(`  Checking ${entry.id.padEnd(22)} ${entry.url.substring(0, 50).padEnd(52)} ... `);
    const result = await checkUrl(entry);
    results.push(result);

    if (result.ok) {
      console.log(`✅ ${result.status} ${result.method}${result.redirectUrl ? ` → ${result.redirectUrl}` : ""}`);
    } else {
      console.log(`❌ ${result.status || "FAIL"} ${result.error || ""}`);
    }
  }

  console.log(`\n\n=== SUMMARY ===`);
  const valid = results.filter(r => r.ok);
  const broken = results.filter(r => !r.ok);

  console.log(`Total checked: ${results.length}`);
  console.log(`Valid (2xx):   ${valid.length}`);
  console.log(`Broken/Error:  ${broken.length}`);

  if (broken.length > 0) {
    console.log(`\n--- BROKEN URLs ---`);
    for (const r of broken) {
      console.log(`  ${r.id}: ${r.url} → status=${r.status} error=${r.error}`);
    }
  }

  // Check redirects that may go to unrelated pages
  const redirected = results.filter(r => r.redirectUrl);
  if (redirected.length > 0) {
    console.log(`\n--- REDIRECTED URLs ---`);
    for (const r of redirected) {
      console.log(`  ${r.id}: ${r.url} → ${r.redirectUrl}`);
    }
  }

  console.log(`\n=== END ===\n`);
}

main().catch(console.error);
