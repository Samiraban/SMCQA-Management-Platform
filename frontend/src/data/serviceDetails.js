/* =========================================================
   SERVICE DETAILS (static fallback content)
   Used by Services.jsx to supply gallery images + "about"
   paragraphs for services that may not exist in the backend
   collection yet (e.g. "Sub Contracting Works").

   Shape:
   {
     title      : string   — matched against backend service title
     category   : string   — key used by getGallery() in stockImage.js
     tagline    : string   — short line shown under the heading
     paragraphs : string[] — "About {title}" section content
   }
   ========================================================= */

export const serviceDetails = [
  {
    title: "Front Office",
    category: "frontoffice",
    tagline: "The first impression your guests remember.",
    paragraphs: [
      "Our front office manpower covers receptionists, guest relations executives, concierge staff and bell desk teams, trained to represent your brand from the moment a guest walks in.",
      "Every candidate is screened for communication skills, grooming standards and problem-solving under pressure before being placed on-site.",
    ],
  },
  {
    title: "Culinary",
    category: "culinary",
    tagline: "Skilled hands behind every plate.",
    paragraphs: [
      "From commis chefs to sous chefs and kitchen stewards, we supply culinary staff who understand hygiene protocols, prep discipline and high-volume service.",
      "We match experience level and cuisine specialisation to your kitchen's specific needs, whether it's a hotel banquet or a fast-paced restaurant line.",
    ],
  },
  {
    title: "Housekeeping",
    category: "housekeeping",
    tagline: "Consistent standards, every room, every time.",
    paragraphs: [
      "Our housekeeping teams are trained on turnover speed, deep-cleaning schedules and quality checklists used by leading hospitality brands.",
      "We supply room attendants, floor supervisors and public area staff who keep your property guest-ready around the clock.",
    ],
  },
  {
    title: "Finance",
    category: "finance",
    tagline: "Accurate numbers, reliable reporting.",
    paragraphs: [
      "We place accounts assistants, billing executives, auditors and finance officers who bring accuracy and accountability to your books.",
      "All finance placements are vetted for relevant qualifications and prior experience with the systems your business already uses.",
    ],
  },
  {
    title: "Spa & Wellness",
    category: "spa",
    tagline: "Trained hands, relaxed guests.",
    paragraphs: [
      "Our spa and wellness staffing includes certified therapists, wellness attendants and reception support for spas, resorts and wellness centres.",
      "Candidates are vetted for certification, technique and the soft skills needed to deliver a genuinely relaxing guest experience.",
    ],
  },
  {
    title: "Sales & Marketing",
    category: "sales",
    tagline: "People who can sell your story.",
    paragraphs: [
      "We supply sales executives, business development associates and marketing support staff who understand target-driven environments.",
      "Every placement is screened for communication ability, resilience and a track record of hitting measurable goals.",
    ],
  },
  {
    title: "Human Resources",
    category: "hr",
    tagline: "The people function, staffed by people who know people.",
    paragraphs: [
      "Our HR manpower covers recruitment coordinators, HR executives and admin support who can plug straight into your existing processes.",
      "We look for candidates with strong organisational skills, discretion and experience handling employee lifecycle tasks.",
    ],
  },
  {
    title: "Construction",
    category: "construction",
    tagline: "Reliable labour for every phase of the build.",
    paragraphs: [
      "From skilled tradespeople to general labour and site supervisors, we supply construction manpower vetted for safety compliance and on-site discipline.",
      "We work with contractors to scale teams up or down as project phases demand, without compromising on reliability.",
    ],
  },
  {
    title: "Healthcare",
    category: "healthcare",
    tagline: "Compassionate care, professionally staffed.",
    paragraphs: [
      "We supply nursing assistants, caregivers and support staff for healthcare facilities, vetted for certification and patient-care experience.",
      "Every healthcare placement goes through additional background and reference checks given the sensitivity of the role.",
    ],
  },
  {
    title: "Office Support",
    category: "office",
    tagline: "The backbone of a smooth-running office.",
    paragraphs: [
      "Our office support staffing covers administrative assistants, data entry operators and general office personnel.",
      "We match candidates on software proficiency, attention to detail and ability to manage day-to-day operational tasks independently.",
    ],
  },
  {
    title: "Security",
    category: "security",
    tagline: "Trained personnel, round-the-clock coverage.",
    paragraphs: [
      "We supply licensed security guards and supervisors trained in access control, patrolling and emergency response protocols.",
      "All security personnel are background-checked and briefed on site-specific procedures before deployment.",
    ],
  },
  {
    title: "Agriculture",
    category: "agriculture",
    tagline: "Dependable labour for every season.",
    paragraphs: [
      "Our agricultural manpower supports planting, harvesting and farm operations with workers experienced in seasonal, physically demanding work.",
      "We coordinate flexible team sizes to match peak season demands without long-term overhead.",
    ],
  },
  {
    title: "Sub Contracting Works",
    category: "subcontracting",
    tagline: "Full crews, managed end-to-end.",
    paragraphs: [
      "We take on subcontracted manpower projects across industries, supplying and managing full crews so you don't have to handle staffing logistics directly.",
      "This includes recruitment, scheduling, on-site supervision and quality checks, all coordinated by our team on your behalf.",
    ],
  },
];