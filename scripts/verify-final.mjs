/**
 * Final round of URL verification for remaining broken schemes
 */
const FINAL_CHECKS = [
  { id: "ayushman-myscheme",  url: "https://www.myscheme.gov.in/schemes/ab-pmjay",    note: "MyScheme PM-JAY" },
  { id: "ayushman-ump",       url: "https://ump.pmjay.gov.in/",                       note: "UMP PM-JAY portal" },
  { id: "nsp-fresh",          url: "https://nsp.gov.in/",                              note: "NSP alternative domain" },
  { id: "wb-lakshmir-mysch",  url: "https://www.myscheme.gov.in/schemes/lb",           note: "MyScheme Lakshmir Bhandar" },
  { id: "wb-duare",           url: "https://swapno.wb.gov.in/",                        note: "WB Swapno portal" },
  { id: "jansuraksha-forms",  url: "https://financialservices.gov.in/",                note: "DFS Ministry of Finance" },
  { id: "mudra-main",         url: "https://mudra.org.in/",                            note: "MUDRA without www" },
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
          "Accept": "text/html,*/*;q=0.8",
        },
      });
      clearTimeout(timeout);
      const finalUrl = response.url !== url ? ` → ${response.url}` : "";
      if (response.ok) {
        console.log(`✅ ${id.padEnd(25)} ${response.status} ${method}${finalUrl}  (${note})`);
        return;
      }
      if (response.status === 405 && method === "HEAD") continue;
      console.log(`❌ ${id.padEnd(25)} ${response.status} ${method}${finalUrl}  (${note})`);
      return;
    } catch (err) {
      if (method === "HEAD") continue;
      console.log(`❌ ${id.padEnd(25)} FAIL ${err.message}  (${note})`);
    }
  }
}

async function main() {
  console.log("=== Final Replacement URL Checks ===\n");
  for (const entry of FINAL_CHECKS) {
    await checkUrl(entry);
  }
  console.log("\n=== DONE ===");
}

main().catch(console.error);
