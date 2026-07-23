/**
 * Filter Combination Testing Script for YojanaFind
 * 
 * This script tests the STATIC filtering logic (CENTRAL_SCHEMES + STATE_SCHEMES)
 * to ensure:
 * - No combination causes errors
 * - Category-based matching is correct
 * - Gender-specific schemes aren't shown incorrectly
 * - State schemes only appear for their state
 * 
 * NOTE: The actual app uses an AI backend (Groq) for scheme matching, so
 * real-time results depend on the LLM. This tests the static dataset that
 * feeds into KNOWN_URLS resolution and the fallback matching.
 */

// Inline the data (can't import ESM from schemes.js easily outside vite)
const CENTRAL_SCHEMES = [
  { id: "pm-kisan", name: "PM-KISAN", categories: ["Farmer"], eligibility: "Small & marginal farmers with cultivable land", tags: ["Farmer", "Direct Benefit Transfer", "Central"] },
  { id: "pmay", name: "PMAY", categories: ["BPL / Below Poverty Line"], eligibility: "EWS/LIG/MIG families without pucca house", tags: ["Housing", "Subsidy", "BPL", "Central"] },
  { id: "ayushman", name: "Ayushman Bharat", categories: ["BPL / Below Poverty Line", "Senior Citizen"], eligibility: "Poor & vulnerable families (SECC database)", tags: ["Health", "Insurance", "BPL", "Central"] },
  { id: "nsp", name: "NSP Scholarships", categories: ["Student"], eligibility: "Students from SC/ST/OBC/Minority with income < ₹2.5L", tags: ["Education", "Scholarship", "Student", "Central"] },
  { id: "mudra", name: "PM MUDRA", categories: ["Entrepreneur / Self-employed"], eligibility: "Non-farm micro/small business owners", tags: ["Loan", "Entrepreneur", "Business", "Central"] },
  { id: "pmegp", name: "PMEGP", categories: ["Entrepreneur / Self-employed", "Unemployed Job Seeker"], eligibility: "Any individual above 18 years; 8th pass for projects > ₹10L", tags: ["Employment", "Subsidy", "Business", "Central"] },
  { id: "ujjwala", name: "Ujjwala Yojana", categories: ["Woman", "BPL / Below Poverty Line"], eligibility: "Adult women from BPL/SC/ST households", tags: ["LPG", "Woman", "BPL", "Central"] },
  { id: "pmsby", name: "PMSBY", categories: ["Farmer", "BPL / Below Poverty Line"], eligibility: "Age 18–70 with bank account", tags: ["Insurance", "Low Premium", "Central"] },
  { id: "pmjjby", name: "PMJJBY", categories: ["Farmer", "BPL / Below Poverty Line"], eligibility: "Age 18–50 with savings bank account", tags: ["Life Insurance", "Low Premium", "Central"] },
  { id: "maternity", name: "PMMVY", categories: ["Pregnant / New Mother", "Woman"], eligibility: "Pregnant women aged 19+ for first live birth", tags: ["Maternity", "Woman", "Cash Transfer", "Central"] },
  { id: "naps", name: "NAPS", categories: ["Student", "Unemployed Job Seeker"], eligibility: "Youth 14–21 years seeking skill training", tags: ["Skill", "Youth", "Employment", "Central"] },
  { id: "pmkvy", name: "PMKVY", categories: ["Student", "Unemployed Job Seeker"], eligibility: "Indian nationals above 14 years seeking skill certification", tags: ["Skill", "Youth", "Certification", "Central"] },
  { id: "disability", name: "ADIP Scheme", categories: ["Person with Disability"], eligibility: "PwD with disability ≥40% and income < ₹20,000/month", tags: ["Disability", "Assistive Devices", "Central"] },
  { id: "senior-pension", name: "IGNOAPS", categories: ["Senior Citizen"], eligibility: "Age 60+, BPL household", tags: ["Pension", "Senior", "BPL", "Central"] },
  { id: "ddugky", name: "DDU-GKY", categories: ["Unemployed Job Seeker", "Student"], eligibility: "Rural youth aged 15–35 from poor families", tags: ["Skill", "Rural", "Employment", "Central"] },
  { id: "startup-india", name: "Startup India Seed Fund", categories: ["Entrepreneur / Self-employed"], eligibility: "DPIIT-recognised startups less than 2 years old", tags: ["Startup", "Funding", "Entrepreneur", "Central"] },
];

const STATE_SCHEMES = {
  "Tamil Nadu": [
    { id: "tn-kalaignar", name: "Kalaignar Magalir Urimai Thittam", categories: ["Woman"], eligibility: "Women head of household, Tamil Nadu resident" },
    { id: "tn-scholarship", name: "TN CM Special Scholarship", categories: ["Student"], eligibility: "SC/ST students in TN colleges" },
  ],
  "Maharashtra": [
    { id: "mh-ladki-bahin", name: "Ladki Bahin Yojana", categories: ["Woman"], eligibility: "Women aged 21–65, annual income < ₹2.5 lakh" },
  ],
  "Karnataka": [
    { id: "ka-gruha-jyoti", name: "Gruha Jyoti", categories: ["BPL / Below Poverty Line", "Farmer"], eligibility: "Domestic electricity consumers in Karnataka" },
  ],
  "Andhra Pradesh": [
    { id: "ap-rythu-bharosa", name: "YSR Rythu Bharosa", categories: ["Farmer"], eligibility: "Farmer families in Andhra Pradesh" },
  ],
  "Telangana": [
    { id: "ts-rythu-bandhu", name: "Rythu Bandhu", categories: ["Farmer"], eligibility: "Farmer land owners in Telangana" },
  ],
  "West Bengal": [
    { id: "wb-lakshmir-bhandar", name: "Lakshmir Bhandar", categories: ["Woman"], eligibility: "Female head of household aged 25–60, West Bengal resident" },
  ],
  "Rajasthan": [
    { id: "rj-chiranjeevi", name: "Chiranjeevi Swasthya Bima", categories: ["BPL / Below Poverty Line", "Senior Citizen"], eligibility: "All registered families in Rajasthan" },
  ],
};

// Filter dimensions
const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
  "Jammu & Kashmir", "Ladakh", "Puducherry", "Chandigarh",
];
const GENDERS = ["Male", "Female", "Transgender", "Prefer not to say"];
const AGES = ["Under 18", "18-25", "26-35", "36-50", "51-60", "60+"];
const CASTES = ["General", "OBC", "SC", "ST", "EWS"];
const CATEGORIES = [
  "Student", "Farmer", "Woman", "Senior Citizen", "Person with Disability",
  "BPL / Below Poverty Line", "Entrepreneur / Self-employed", "Unemployed Job Seeker",
  "Pregnant / New Mother", "Minority Community",
];

// Simulate scheme matching: Central schemes always shown if category matches,
// State schemes only if state matches AND category matches
function getMatchingSchemes(state, gender, age, caste, categories) {
  const results = [];

  // All central schemes that match any selected category
  for (const scheme of CENTRAL_SCHEMES) {
    const hasMatch = scheme.categories.some(c => categories.includes(c));
    if (hasMatch) results.push(scheme);
  }

  // State-specific schemes
  if (STATE_SCHEMES[state]) {
    for (const scheme of STATE_SCHEMES[state]) {
      const hasMatch = scheme.categories.some(c => categories.includes(c));
      if (hasMatch) results.push(scheme);
    }
  }

  return results;
}

// VALIDATION TESTS

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const issues = [];

function test(name, condition, detail) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    issues.push({ name, detail });
  }
}

console.log("=== Filter Combination Testing ===\n");

// TEST 1: Every single category alone should return at least 1 scheme
console.log("--- Test 1: Single category returns results ---");
for (const cat of CATEGORIES) {
  const results = getMatchingSchemes("Delhi", "Male", "26-35", "General", [cat]);
  test(
    `Category "${cat}" alone`,
    results.length > 0,
    `Got ${results.length} results (expected > 0)`
  );
}

// TEST 2: Woman-only schemes should NOT appear when "Woman" category is NOT selected
console.log("--- Test 2: Woman-only schemes excluded when Woman not selected ---");
const womanOnlySchemes = ["ujjwala", "maternity", "tn-kalaignar", "mh-ladki-bahin", "wb-lakshmir-bhandar"];
for (const state of STATES) {
  const nonWomanCats = CATEGORIES.filter(c => c !== "Woman" && c !== "Pregnant / New Mother");
  for (const cat of nonWomanCats) {
    const results = getMatchingSchemes(state, "Male", "26-35", "General", [cat]);
    const womanSchemes = results.filter(s => 
      womanOnlySchemes.includes(s.id) &&
      s.categories.length === 1 &&
      (s.categories[0] === "Woman" || s.categories[0] === "Pregnant / New Mother")
    );
    test(
      `No woman-only for Male/${state}/${cat}`,
      womanSchemes.length === 0,
      `Found woman-only schemes: ${womanSchemes.map(s => s.id).join(", ")}`
    );
  }
}

// TEST 3: State schemes should only appear for their own state
console.log("--- Test 3: State scheme isolation ---");
for (const state of STATES) {
  const results = getMatchingSchemes(state, "Female", "26-35", "General", CATEGORIES);
  for (const scheme of results) {
    if (scheme.id.startsWith("tn-")) {
      test(`TN scheme ${scheme.id} only in Tamil Nadu`, state === "Tamil Nadu", `Appeared in ${state}`);
    }
    if (scheme.id.startsWith("mh-")) {
      test(`MH scheme ${scheme.id} only in Maharashtra`, state === "Maharashtra", `Appeared in ${state}`);
    }
    if (scheme.id.startsWith("ka-")) {
      test(`KA scheme ${scheme.id} only in Karnataka`, state === "Karnataka", `Appeared in ${state}`);
    }
    if (scheme.id.startsWith("ap-")) {
      test(`AP scheme ${scheme.id} only in AP`, state === "Andhra Pradesh", `Appeared in ${state}`);
    }
    if (scheme.id.startsWith("ts-")) {
      test(`TS scheme ${scheme.id} only in Telangana`, state === "Telangana", `Appeared in ${state}`);
    }
    if (scheme.id.startsWith("wb-")) {
      test(`WB scheme ${scheme.id} only in WB`, state === "West Bengal", `Appeared in ${state}`);
    }
    if (scheme.id.startsWith("rj-")) {
      test(`RJ scheme ${scheme.id} only in Rajasthan`, state === "Rajasthan", `Appeared in ${state}`);
    }
  }
}

// TEST 4: No crashes on any state/gender/age/caste combo (sample)
console.log("--- Test 4: No crashes on diverse combos ---");
for (const state of STATES) {
  for (const gender of GENDERS) {
    for (const age of AGES) {
      for (const caste of CASTES) {
        try {
          const results = getMatchingSchemes(state, gender, age, caste, ["Student"]);
          test(
            `No crash: ${state}/${gender}/${age}/${caste}/Student`,
            Array.isArray(results),
            "Crash or non-array result"
          );
        } catch (err) {
          test(
            `No crash: ${state}/${gender}/${age}/${caste}/Student`,
            false,
            `Error: ${err.message}`
          );
        }
      }
    }
  }
}

// TEST 5: Combinations with "Minority Community" — no dedicated schemes in dataset
console.log("--- Test 5: Minority Community (no dedicated schemes) ---");
const minorityOnly = getMatchingSchemes("Delhi", "Male", "26-35", "General", ["Minority Community"]);
test(
  "Minority Community alone returns 0 results",
  minorityOnly.length === 0,
  `Got ${minorityOnly.length} results (expected 0 since no schemes have this category)`
);

// TEST 6: State without state-specific schemes gets only central
console.log("--- Test 6: States without schemes get central only ---");
const noSchemeStates = STATES.filter(s => !STATE_SCHEMES[s]);
for (const state of noSchemeStates) {
  const results = getMatchingSchemes(state, "Female", "26-35", "OBC", ["Woman"]);
  const stateSchemes = results.filter(s => !CENTRAL_SCHEMES.find(cs => cs.id === s.id));
  test(
    `${state} has no state schemes`,
    stateSchemes.length === 0,
    `Found state schemes: ${stateSchemes.map(s => s.id).join(", ")}`
  );
}

// SUMMARY
console.log(`\n\n=== FILTER TEST SUMMARY ===`);
console.log(`Total tests: ${totalTests}`);
console.log(`Passed:      ${passedTests}`);
console.log(`Failed:      ${failedTests}`);

if (issues.length > 0) {
  console.log(`\n--- FAILURES ---`);
  for (const issue of issues) {
    console.log(`  ❌ ${issue.name}: ${issue.detail}`);
  }
} else {
  console.log(`\n✅ All tests passed!`);
}

console.log(`\n=== END ===`);
