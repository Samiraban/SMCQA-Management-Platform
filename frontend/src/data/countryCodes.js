// A practical list of countries and their international dial codes.
// Used on the Contact page so every submitted phone number carries a
// real country code (e.g. +974 1234 5678) instead of an unlabeled,
// unverifiable string of digits.
//
// "iso" = ISO 3166-1 alpha-2 code, used only as a stable React key.

const countryCodes = [
  { iso: "QA", name: "Qatar", dialCode: "+974" },
  { iso: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { iso: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { iso: "KW", name: "Kuwait", dialCode: "+965" },
  { iso: "BH", name: "Bahrain", dialCode: "+973" },
  { iso: "OM", name: "Oman", dialCode: "+968" },
  { iso: "IN", name: "India", dialCode: "+91" },
  { iso: "NP", name: "Nepal", dialCode: "+977" },
  { iso: "BD", name: "Bangladesh", dialCode: "+880" },
  { iso: "PK", name: "Pakistan", dialCode: "+92" },
  { iso: "LK", name: "Sri Lanka", dialCode: "+94" },
  { iso: "PH", name: "Philippines", dialCode: "+63" },
  { iso: "EG", name: "Egypt", dialCode: "+20" },
  { iso: "TN", name: "Tunisia", dialCode: "+216" },
  { iso: "JO", name: "Jordan", dialCode: "+962" },
  { iso: "LB", name: "Lebanon", dialCode: "+961" },
  { iso: "GB", name: "United Kingdom", dialCode: "+44" },
  { iso: "US", name: "United States", dialCode: "+1" },
  { iso: "CA", name: "Canada", dialCode: "+1" },
  { iso: "AU", name: "Australia", dialCode: "+61" },
  { iso: "DE", name: "Germany", dialCode: "+49" },
  { iso: "FR", name: "France", dialCode: "+33" },
  { iso: "ZA", name: "South Africa", dialCode: "+27" },
  { iso: "KE", name: "Kenya", dialCode: "+254" },
  { iso: "NG", name: "Nigeria", dialCode: "+234" },
  { iso: "SG", name: "Singapore", dialCode: "+65" },
  { iso: "MY", name: "Malaysia", dialCode: "+60" },
  { iso: "ID", name: "Indonesia", dialCode: "+62" },
  { iso: "TR", name: "Turkey", dialCode: "+90" },
  { iso: "OTHER", name: "Other", dialCode: "+" },
];

export default countryCodes;