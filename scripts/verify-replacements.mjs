/**
 * Verify replacement URLs for broken links
 */
const REPLACEMENTS = [
  { id: "ayushman",        url: "https://pmjay.gov.in/",             note: "Official PM-JAY website" },
  { id: "ayushman-alt",    url: "https://nha.gov.in/",               note: "National Health Authority" },
  { id: "nsp",             url: "https://www.scholarships.gov.in/",   note: "NSP with www prefix" },
  { id: "nsp-myscheme",    url: "https://www.myscheme.gov.in/search?search=scholarship", note: "MyScheme scholarship search" },
  { id: "mudra-jansamarth", url: "https://www.jansamarth.in/",        note: "JanSamarth portal for MUDRA" },
  { id: "mudra-myscheme",  url: "https://www.myscheme.gov.in/schemes/pmmy", note: "MyScheme MUDRA page" },
  { id: "mudra-udyamimitra", url: "https://udyamimitra.in/",         note: "Udyamimitra portal" },
  { id: "jansuraksha",     url: "https://www.jansuraksha.gov.in/",    note: "Jan Suraksha with www" },
  { id: "jansuraksha-in",  url: "https://www.jansuraksha.in/",        note: "jansuraksha.in portal" },
  { id: "pmsby-myscheme",  url: "https://www.myscheme.gov.in/schemes/pmsby", note: "MyScheme PMSBY" },
  { id: "pmjjby-myscheme", url: "https://www.myscheme.gov.in/schemes/pmjjby", note: "MyScheme PMJJBY" },
  { id: "wb-socialsec",    url: "https://wb.gov.in/",                note: "WB gov portal" },
  { id: "wb-banglarbhumi", url: "https://banglarbhumi.gov.in/",      note: "WB land portal" },
];

async function checkUrl(entry) {
  const { id, url, note } = entry;
  for (const method of ["HEAD", "GET"]) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });
      clearTimeout(timeout);
      if (response.ok) {
        console.log(`✅ ${id.padEnd(22)} ${response.status} ${method} → ${url}  (${note})`);
        return;
      }
      if (response.status === 405 && method === "HEAD") continue;
      console.log(`❌ ${id.padEnd(22)} ${response.status} ${method} → ${url}  (${note})`);
      return;
    } catch (err) {
      if (method === "HEAD") continue;
      console.log(`❌ ${id.padEnd(22)} FAIL ${err.message} → ${url}  (${note})`);
    }
  }
}

async function main() {
  console.log("=== Verifying Replacement URLs ===\n");
  for (const entry of REPLACEMENTS) {
    await checkUrl(entry);
  }
  console.log("\n=== DONE ===");
}

main().catch(console.error);
