// ═══════════════════════════════════════════════════════
//  HOW TO APPLY — Step-by-step guide for each scheme
// ═══════════════════════════════════════════════════════

export const HOW_TO_APPLY = {
  "pm-kisan": {
    documents: ["Aadhaar card", "Land ownership documents (Khasra/Khatauni)", "Bank account passbook", "Mobile number linked to Aadhaar"],
    steps: [
      { step: "Visit the official portal", detail: "Go to pmkisan.gov.in and click 'Farmers Corner'" },
      { step: "New Farmer Registration", detail: "Click 'New Farmer Registration', enter Aadhaar number and state" },
      { step: "Fill the form", detail: "Enter personal details, bank account number, IFSC code, and land details" },
      { step: "Submit & verify", detail: "Submit the form. Your details will be verified by state/district officials" },
      { step: "Receive funds", detail: "After verification, ₹2,000 installments are directly transferred to your bank account every 4 months" },
    ],
    helpline: "155261 / 011-23381092",
    processingTime: "2–4 weeks after verification",
  },
  "pmay": {
    documents: ["Aadhaar card", "Income certificate", "Bank account details", "Property documents / land records", "Caste certificate (if applicable)"],
    steps: [
      { step: "Check eligibility", detail: "Visit pmaymis.gov.in and check if your family name is in the beneficiary list" },
      { step: "Contact local body", detail: "Visit your nearest Gram Panchayat, ULB (Urban Local Body), or Common Service Centre (CSC)" },
      { step: "Fill application", detail: "Fill PMAY application form with household and income details" },
      { step: "Upload documents", detail: "Upload Aadhaar, income proof, and land/property documents" },
      { step: "Verification & subsidy", detail: "After field verification, subsidy is credited directly to your bank account in installments" },
    ],
    helpline: "1800-11-6163 (toll free)",
    processingTime: "1–3 months",
  },
  "ayushman": {
    documents: ["Aadhaar card", "Ration card", "Mobile number"],
    steps: [
      { step: "Check eligibility", detail: "Visit pmjay.gov.in or call 14555 to check if your family is covered under PM-JAY" },
      { step: "Get Ayushman card", detail: "Visit nearest CSC, government hospital, or Ayushman Mitra. Biometric verification done on the spot" },
      { step: "Download e-card", detail: "Download the Ayushman Bharat card from beneficiary.nha.gov.in using your Aadhaar" },
      { step: "Use at empanelled hospitals", detail: "Show the card at any listed government or private hospital for cashless treatment up to ₹5 lakh" },
    ],
    helpline: "14555 / 1800-111-565 (toll free)",
    processingTime: "Card issued immediately at CSC",
  },
  "nsp": {
    documents: ["Aadhaar card", "Bank account (linked to Aadhaar)", "Income certificate", "Caste certificate", "Previous year marksheet", "Institution verification"],
    steps: [
      { step: "Register on NSP portal", detail: "Go to scholarships.gov.in and click 'New Registration'. Create account with mobile number" },
      { step: "Login and apply", detail: "Login, select the relevant scholarship scheme from the list, fill application form" },
      { step: "Upload documents", detail: "Upload marksheets, income certificate, caste certificate, and bank details" },
      { step: "Institute verification", detail: "Your school/college will verify and forward your application online" },
      { step: "Receive scholarship", detail: "After district/state verification, scholarship amount is directly transferred to your bank account" },
    ],
    helpline: "0120-6619540",
    processingTime: "2–4 months after application",
  },
  "mudra": {
    documents: ["Aadhaar card", "PAN card", "Business plan / proposal", "Bank account statements (6 months)", "Address proof", "Quotation for machinery/equipment (if applicable)"],
    steps: [
      { step: "Prepare business plan", detail: "Write a brief business plan mentioning your business type, investment needed, and expected income" },
      { step: "Visit bank or MFI", detail: "Visit any public/private bank, RRB, MFI or NBFCs. No need to approach MUDRA directly" },
      { step: "Choose loan category", detail: "Shishu (up to ₹50K) for new businesses, Kishore (₹50K–5L) for growing, Tarun (₹5L–10L) for established" },
      { step: "Submit application", detail: "Fill loan application form, attach documents and business plan" },
      { step: "Loan disbursement", detail: "Bank verifies and disburses the loan. No collateral required for Shishu and Kishore loans" },
    ],
    helpline: "1800-180-1111 (toll free)",
    processingTime: "1–4 weeks",
  },
  "pmkvy": {
    documents: ["Aadhaar card", "Bank account details", "Educational certificates", "Passport-size photograph"],
    steps: [
      { step: "Find training centre", detail: "Visit skillindiadigital.gov.in or call helpline to find nearest PMKVY training centre in your area" },
      { step: "Register online", detail: "Register on Skill India Digital Hub portal with Aadhaar number and select your preferred skill course" },
      { step: "Enrol in course", detail: "Visit the training centre, complete enrolment formalities and begin training (completely free)" },
      { step: "Complete training", detail: "Complete the training program — duration varies from 150 hours to 300 hours depending on trade" },
      { step: "Assessment & certificate", detail: "Appear for assessment by approved body. On passing, get government-recognised certificate + ₹8,000 reward" },
    ],
    helpline: "088000-55555",
    processingTime: "Training: 1–3 months",
  },
  "ddugky": {
    documents: ["Aadhaar card", "BPL card / income certificate", "Age proof", "Bank account details", "Photograph"],
    steps: [
      { step: "Find local project", detail: "Contact your nearest District Rural Development Agency (DRDA) or Block Development Office for DDU-GKY project details" },
      { step: "Check eligibility", detail: "Confirm you are rural youth aged 15–35 from a poor household (SECC listed)" },
      { step: "Enrol in training", detail: "Register at approved Project Implementing Agency (PIA). Training is fully residential and free" },
      { step: "Complete training", detail: "Undergo skill training (3–12 months depending on trade) with food and accommodation provided" },
      { step: "Job placement", detail: "PIA is mandated to place you in a formal job with minimum ₹6,000/month salary post training" },
    ],
    helpline: "1800-180-6127",
    processingTime: "Enrolment to placement: 3–12 months",
  },
  "ujjwala": {
    documents: ["Aadhaar card", "BPL ration card / SECC data", "Bank account details", "Passport-size photograph"],
    steps: [
      { step: "Visit LPG distributor", detail: "Go to your nearest LPG distributor (IndianOil, HP Gas, Bharat Gas) with documents" },
      { step: "Fill KYC form", detail: "Fill the PMUY application-cum-KYC form at the distributor office" },
      { step: "Submit documents", detail: "Submit Aadhaar copy, BPL card, bank details and photograph" },
      { step: "Verification", detail: "Distributor verifies your details and forwards to the oil company" },
      { step: "Connection issued", detail: "Free LPG connection with first refill and stove (hot plate) issued to your home" },
    ],
    helpline: "1906 (LPG helpline)",
    processingTime: "1–2 weeks",
  },
  "naps": {
    documents: ["Aadhaar card", "Educational certificates", "Bank account details"],
    steps: [
      { step: "Register on portal", detail: "Go to apprenticeshipindia.gov.in and register as an apprentice candidate" },
      { step: "Search for openings", detail: "Browse available apprenticeship opportunities by trade, location, and industry" },
      { step: "Apply to employer", detail: "Apply to your preferred employer/establishment through the portal" },
      { step: "Sign contract", detail: "If selected, sign apprenticeship contract with employer. Duration: 6 months to 3 years" },
      { step: "Receive stipend", detail: "Get monthly stipend (government pays 25%, employer pays 75%). Get NAPS certificate on completion" },
    ],
    helpline: "1800-123-9626",
    processingTime: "Varies by employer",
  },
  "maternity": {
    documents: ["Aadhaar card", "MCP (Mother & Child Protection) card", "Bank account linked to Aadhaar", "Pregnancy registration certificate"],
    steps: [
      { step: "Register pregnancy", detail: "Register your pregnancy at the nearest Anganwadi Centre or government health facility" },
      { step: "Apply at Anganwadi", detail: "Submit PMMVY Form 1-A at your Anganwadi Centre with Aadhaar and MCP card" },
      { step: "First installment", detail: "Receive ₹1,000 after early registration of pregnancy (Form 1-A)" },
      { step: "Second installment", detail: "Receive ₹2,000 after at least one antenatal check-up (6 months, Form 1-B)" },
      { step: "Third installment", detail: "Receive ₹2,000 after child birth registration and first cycle of vaccination (Form 1-C)" },
    ],
    helpline: "7998799804",
    processingTime: "Paid in 3 installments over 9 months",
  },
  "pmsby": {
    documents: ["Aadhaar card", "Bank account (linked to Aadhaar)", "Mobile number"],
    steps: [
      { step: "Visit your bank", detail: "Visit your bank branch or use net banking/mobile banking app" },
      { step: "Fill enrollment form", detail: "Fill the PMSBY enrollment-cum-auto debit form (also available at bank or online)" },
      { step: "Auto debit consent", detail: "Give consent for ₹20/year to be auto-debited from your savings account every June" },
      { step: "Policy issued", detail: "Policy is issued immediately. Keep the acknowledgment slip as proof" },
      { step: "Claim process", detail: "In case of accident, nominee/applicant files claim at the bank within 30 days of incident" },
    ],
    helpline: "1800-180-1111",
    processingTime: "Instant enrollment",
  },
  "pmjjby": {
    documents: ["Aadhaar card", "Bank account (linked to Aadhaar)", "Nominee details"],
    steps: [
      { step: "Visit your bank", detail: "Visit bank branch or use net/mobile banking to enroll in PMJJBY" },
      { step: "Fill enrollment form", detail: "Fill the enrollment-cum-auto debit mandate form with nominee details" },
      { step: "Auto debit consent", detail: "Give consent for ₹436/year auto-debit from June 1 onwards" },
      { step: "Policy active", detail: "Coverage of ₹2 lakh starts immediately for one year, renewable annually" },
      { step: "Claim process", detail: "Nominee submits claim to bank with death certificate and cancelled cheque within 30 days" },
    ],
    helpline: "1800-180-1111",
    processingTime: "Instant enrollment",
  },
  "senior-pension": {
    documents: ["Aadhaar card", "Age proof (birth certificate or school leaving certificate)", "BPL card", "Bank account details", "Photograph"],
    steps: [
      { step: "Visit Gram Panchayat / Ward Office", detail: "Go to your local Gram Panchayat (rural) or Ward Office (urban) to get application form" },
      { step: "Fill application", detail: "Fill the IGNOAPS application form with personal and bank details" },
      { step: "Submit with documents", detail: "Submit form with Aadhaar, age proof, BPL card, and bank passbook copy" },
      { step: "Verification", detail: "Block Development Officer or municipality verifies your details and approves" },
      { step: "Pension credited", detail: "Monthly pension of ₹200–₹500 is credited directly to your bank account" },
    ],
    helpline: "1800-111-555",
    processingTime: "1–3 months",
  },
  "disability": {
    documents: ["Aadhaar card", "Disability certificate (from govt hospital)", "Income certificate", "Photograph"],
    steps: [
      { step: "Get disability certificate", detail: "First obtain a disability certificate from a government hospital confirming ≥40% disability" },
      { step: "Find ADIP camp", detail: "Contact your nearest district Samarth/Alimco office or check adip.nic.in for upcoming camp dates" },
      { step: "Register at camp", detail: "Visit the assessment camp with documents. Medical officer assesses your device needs" },
      { step: "Device fitted", detail: "Assistive device (wheelchair, hearing aid, calipers, etc.) is provided free or at subsidised cost on the spot" },
      { step: "After-care", detail: "Free repair and replacement services available at subsequent camps" },
    ],
    helpline: "1800-180-5129",
    processingTime: "Same day at camp",
  },
  "pmegp": {
    documents: ["Aadhaar card", "PAN card", "Project report", "8th/10th marksheet", "Caste certificate (if applicable)", "Special category proof (if any)"],
    steps: [
      { step: "Apply online", detail: "Visit kviconline.gov.in/pmegpeportal and register as applicant, fill detailed application form" },
      { step: "Submit project report", detail: "Prepare a detailed project report (DPR) mentioning business plan, investment, and employment generation" },
      { step: "Interview at KVIC/KVIB", detail: "Attend interview at KVIC, KVIB or DIC office for project evaluation" },
      { step: "Bank financing", detail: "Approved project forwarded to bank. Bank sanctions 90–95% of project cost as loan" },
      { step: "Subsidy credited", detail: "Government subsidy (15–35% of project cost) is credited to your loan account after 3 years of regular repayment" },
    ],
    helpline: "1800-3000-0034",
    processingTime: "2–4 months",
  },
  "startup-india": {
    documents: ["DPIIT recognition certificate", "Business registration proof", "Detailed project report", "Team details", "Financial projections"],
    steps: [
      { step: "Get DPIIT recognition", detail: "First register startup at startupindia.gov.in and get DPIIT recognition certificate" },
      { step: "Find empanelled incubator", detail: "Visit seedfund.startupindia.gov.in and find an approved incubator in your sector" },
      { step: "Apply to incubator", detail: "Submit application to the incubator with your pitch deck, team info, and business plan" },
      { step: "Incubator evaluation", detail: "Incubator reviews and presents to their expert committee for selection" },
      { step: "Receive funding", detail: "Selected startups receive up to ₹20 lakh for PoC or ₹50 lakh for market entry as grant/equity" },
    ],
    helpline: "1800-115-565",
    processingTime: "2–6 months",
  },
};

// Generic fallback steps for schemes not in the list above
export const DEFAULT_STEPS = [
  { step: "Visit official portal", detail: "Go to the official scheme website or myscheme.gov.in and search for this scheme" },
  { step: "Check eligibility", detail: "Read the eligibility criteria carefully and confirm you meet the requirements" },
  { step: "Collect documents", detail: "Gather Aadhaar card, bank passbook, income/caste certificate, and relevant proofs" },
  { step: "Visit nearest CSC", detail: "Go to your nearest Common Service Centre (CSC) or government office to apply" },
  { step: "Track application", detail: "Note your application reference number and track status on the scheme portal" },
];
