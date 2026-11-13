/**
 * Central content for the NMTC website.
 * Institution details below are placeholders — replace them with official information.
 */

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  campus: '/images/nmtc-gate-1.jpeg',
  campusClassic: '/images/nmtc-gate-1.jpeg',
  lab: unsplash('1582719471384-894fbb16e074'),
  imaging: unsplash('1666214280557-f1b5022eb634'),
  surgeons: unsplash('1579684385127-1ef15d508118'),
  theatre: unsplash('1551076805-e1869033e561'),
  skillsLab: unsplash('1516549655169-df83a0774514'),
  clinician: unsplash('1532938911079-1b06ac7ceec7'),
  clinicianPhone: unsplash('1576091160399-112ba8d25d1d'),
  clinicianLaptop: unsplash('1576091160550-2173dba999ef'),
  clinicalMedicine: '/images/nmtc-lab-2.jpeg',
  nursing: '/images/nmtc-lab-1.jpeg',
  principal: '/images/avatar.png',
  consultation: unsplash('1631217868264-e5b90bb7e133'),
  pharmacy: unsplash('1576671081837-49000212a370'),
  heartModel: unsplash('1530026405186-ed1f139313f8'),
  brainModel: unsplash('1559757148-5c350d0d3c56'),
  stethoscope: unsplash('1505751172876-fa1923c5c528'),
  lecture: '/images/nmtc-lab-2.jpeg',
  students: '/images/nmtc-lab-2.jpeg',
  friends: '/images/nmtc-1.jpeg',
  sunset: unsplash('1511632765486-a01980e01a18'),
  graduation: unsplash('1541339907198-e08756dedf3f'),
  library: unsplash('1507842217343-583bb7270b66'),
  libraryAisle: unsplash('1427504494785-3a9ca7044f45'),
  handshake: unsplash('1521791136064-7986c2920216'),
  meeting: unsplash('1517048676732-d65bc937f952'),
  reception: unsplash('1519494026892-80bbd2d6fd0d'),
  study: unsplash('1501504905252-473c47e087f8')
} as const;

export const INSTITUTION = {
  name: 'ST Joseph Nyabondo Med. Training College',
  shortName: 'NMTC',
  motto: 'Love and Serve',
  founded: 1959,
  address: 'P.O. Box 341 – 40109',
  city: 'Sondu, Kenya',
  phone: '+254 11961598',
  phoneAlt: '+254 11961598',
  email: 'mtcnyabondo@gmail.com',
  admissionsEmail: 'mtcnyabondo@gmail.com',
  careersEmail: 'mtcnyabondo@gmail.com',
  hours: 'Mon – Fri: 8:00 am – 5:00 pm',
  regulator: 'The Nursing Council of Kenya - NCK',
  social: [
    { icon: 'bi-facebook', label: 'Facebook', href: '#' },
    { icon: 'bi-twitter-x', label: 'X (Twitter)', href: '#' },
    { icon: 'bi-linkedin', label: 'LinkedIn', href: '#' },
    { icon: 'bi-youtube', label: 'YouTube', href: '#' },
    { icon: 'bi-instagram', label: 'Instagram', href: '#' }
  ]
} as const;

/** External systems — set the real URLs here once they are available. */
export const EXTERNAL_LINKS = {
  library: '#',
  portal: 'https://staff.pamojaci.org/',
  applicationPortal: 'https://apply.pamojaci.org/',
  studentPortal: '#',
  eLearning: '#'
} as const;

export interface NavLink {
  label: string;
  route?: string;
  href?: string;
  icon?: string;
  description?: string;
}

export interface NavItem extends NavLink {
  base?: string;
  children?: NavLink[];
  highlight?: boolean;
}

export const TOP_NAV: NavLink[] = [
  { label: 'Library', href: EXTERNAL_LINKS.library, icon: 'bi-book' },
  { label: 'Portal', href: EXTERNAL_LINKS.portal, icon: 'bi-person-lock' },
  { label: 'Application Portal', href: EXTERNAL_LINKS.applicationPortal, icon: 'bi-pencil-square' },
  { label: 'Careers', route: '/careers', icon: 'bi-briefcase' },
  { label: 'Contact', route: '/contact', icon: 'bi-telephone' }
];

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', route: '/' },
  {
    label: 'About',
    base: '/about',
    children: [
      { label: 'Vision & Mission', route: '/about/vision-mission', icon: 'bi-eye' },
      { label: 'History of NMTC', route: '/about/history', icon: 'bi-hourglass-split' },
      { label: 'Affiliate Institutions', route: '/about/affiliate-institutions', icon: 'bi-building' }
    ]
  },
  {
    label: 'Admissions',
    base: '/admissions',
    children: [
      { label: 'Admission Process', route: '/admissions/admission-process', icon: 'bi-list-check' },
      { label: 'Academic Calendars', route: '/admissions/academic-calendars', icon: 'bi-calendar3' }
    ]
  },
  {
    label: 'Academics',
    base: '/academics',
    children: [
      { label: 'Diploma Programs', route: '/academics/diploma-programs', icon: 'bi-mortarboard' },
      { label: 'Certificate Programs', route: '/academics/certificate-programs', icon: 'bi-award' },
      { label: 'Short Courses', route: '/academics/short-courses', icon: 'bi-lightning-charge' }
    ]
  },
  {
    label: 'Students',
    base: '/students',
    children: [
      { label: 'Student Portal', href: EXTERNAL_LINKS.studentPortal, icon: 'bi-person-badge' },
      { label: 'E-Learning', href: EXTERNAL_LINKS.eLearning, icon: 'bi-laptop' },
      { label: 'Library', href: EXTERNAL_LINKS.library, icon: 'bi-book' },
      { label: 'Student Life', route: '/students/student-life', icon: 'bi-people' },
      { label: 'Graduation Ceremony', route: '/students/graduation-ceremony', icon: 'bi-mortarboard-fill' }
    ]
  },
  { label: 'Portal', href: EXTERNAL_LINKS.portal },
  { label: 'Application Portal', href: EXTERNAL_LINKS.applicationPortal, highlight: true }
];

export type ProgramLevel = 'diploma' | 'certificate' | 'short';

export interface Program {
  title: string;
  level: ProgramLevel;
  icon: string;
  image?: string;
  duration: string;
  intakes: string;
  mode: string;
  summary: string;
  requirements: string[];
  careers?: string[];
}

export const PROGRAM_LEVELS: Record<
  ProgramLevel,
  { title: string; eyebrow: string; intro: string; image: string; route: string }
> = {
  diploma: {
    title: 'Diploma Programs',
    eyebrow: 'Professional Diplomas',
    intro:
      'Our diploma programs combine rigorous classroom instruction, simulation-based skills training and supervised clinical placements to prepare graduates for licensure and professional practice.',
    image: IMAGES.lab,
    route: '/academics/diploma-programs'
  },
  certificate: {
    title: 'Certificate Programs',
    eyebrow: 'Certificate Programs',
    intro:
      'Certificate programs provide a strong foundation in essential health disciplines, leading to recognised qualifications and clear progression pathways into our diploma programs.',
    image: IMAGES.consultation,
    route: '/academics/certificate-programs'
  },
  short: {
    title: 'Short Courses',
    eyebrow: 'Continuing Professional Development',
    intro:
      'Flexible, competency-based short courses for practising health workers, organisations and the public — designed to sharpen skills and earn CPD points.',
    image: IMAGES.skillsLab,
    route: '/academics/short-courses'
  }
};

const DIPLOMA_REQUIREMENTS = [
  'Secondary school certificate with a minimum mean grade of C (plain) or equivalent',
  'At least C in English, Biology and Chemistry',
  'Minimum C- in Mathematics or Physics',
  'Original and copies of academic certificates and national ID / birth certificate'
];

const CERTIFICATE_REQUIREMENTS = [
  'Secondary school certificate with a minimum mean grade of C- (minus) or equivalent',
  'At least D+ in English and Biology',
  'Original and copies of academic certificates and national ID / birth certificate'
];

const DIPLOMA_REQUIREMENTS_CLINICAL_MEDICINE = [
  'Secondary school certificate with a minimum mean grade of C (plain)',
  'At least C in English/Kiswahili and Biology',
  'Minimum C- in Chemistry and Mathematics or Physics'
];

const DIPLOMA_REQUIREMENTS_NURSING = [
  'Secondary school certificate with a minimum mean grade of C (plain)',
  'At least C in English/Kiswahili and Biology',
  'Minimum C- in Chemistry or Mathematics or Physics'
];

const DIPLOMA_REQUIREMENTS_PHARMACY = [
  'Secondary school certificate with a minimum mean grade of C (plain)',
  'At least C in English/Kiswahili and Biology',
  'Minimum C in Chemistry and Mathematics or Physics'
];

const DIPLOMA_REQUIREMENTS_HEALTH_RECORDS = [
  'Secondary school certificate with a minimum mean grade of C (plain)',
  'At least C- in English/Kiswahili',
  'Minimum D+ in Mathematics and Biology and D+ in any of the rest'
];

const CERTIFICATE_REQUIREMENTS_HEALTH_RECORDS = [
  'Secondary school certificate with a minimum mean grade of C- (minus)',
  'At least C- in English/Kiswahili',
  'D in Mathematics and Biology and in any of the rest'
];

const CERTIFICATE_REQUIREMENTS_UPGRADING_HEALTH_RECORDS = [
  'Certificate in health records'
];

export const PROGRAMS: Program[] = [
  {
    title: 'Diploma in Clinical Medicine & Surgery',
    level: 'diploma',
    icon: 'bi-heart-pulse',
    image: IMAGES.clinicalMedicine,
    duration: '3 years',
    intakes: 'September',
    mode: 'Full-time',
    summary:
      'Train as a clinical officer able to diagnose, treat and manage common medical and surgical conditions across primary and referral facilities.',
    requirements: DIPLOMA_REQUIREMENTS_CLINICAL_MEDICINE,
    careers: ['Clinical Officer']
  },
  {
    title: 'Diploma in Community Health Nursing',
    level: 'diploma',
    icon: 'bi-bandaid',
    image: IMAGES.nursing,
    duration: '3 years',
    intakes: 'March · September',
    mode: 'Full-time',
    summary:
      'Develop the clinical judgement, compassion and leadership required to deliver safe, holistic nursing care in hospitals and communities.',
    requirements: DIPLOMA_REQUIREMENTS_NURSING,
    careers: ['Registered Community Health Nurse']
  },
  {
    title: 'Diploma in Pharmacy',
    level: 'diploma',
    icon: 'bi-capsule',
    image: IMAGES.pharmacy,
    duration: '3 years',
    intakes: 'September',
    mode: 'Full-time',
    summary:
      'Gain expertise in pharmaceutical sciences, dispensing practice, drug supply chain management and patient counselling.',
    requirements: DIPLOMA_REQUIREMENTS_PHARMACY,
    careers: ['Pharmaceutical Technologist', 'Hospital Pharmacy', 'Pharmaceutical Sales']
  },
  {
    title: 'Diploma in Health Records & Information Technology',
    level: 'diploma',
    icon: 'bi-clipboard2-data',
    image: IMAGES.clinicianLaptop,
    duration: '3 years',
    intakes: 'March · September',
    mode: 'Full-time',
    summary:
      'Manage health information systems, medical coding, health statistics and electronic records that underpin quality healthcare delivery.',
    requirements: DIPLOMA_REQUIREMENTS_HEALTH_RECORDS,
    careers: ['Health Records Officer', 'Health Information Analyst', 'Medical Coder']
  },
  {
    title: 'Certificate in Health Records and Information Technology',
    level: 'certificate',
    icon: 'bi-house-heart',
    duration: '2 years',
    intakes: 'March · September',
    mode: 'Full-time',
    summary:
      'Combine medical records practice with practical ICT skills for registries and health information units.',
    requirements: CERTIFICATE_REQUIREMENTS_HEALTH_RECORDS
  },
  {
    title: 'Upgrading Health Records and Information Technology',
    level: 'certificate',
    icon: 'bi-pc-display',
    duration: '1 years',
    intakes: 'March · September',
    mode: 'Full-time',
    summary:
      'Combine medical records practice with practical ICT skills for registries and health information units.',
    requirements: CERTIFICATE_REQUIREMENTS_UPGRADING_HEALTH_RECORDS
  },
  {
    title: 'Certificate in Healthcare Support Assistant',
    level: 'certificate',
    icon: 'bi-hospital',
    duration: '6 Months',
    intakes: 'March · September',
    mode: 'Full-time',
    summary:
      'Prepare for work in operating theatres — instrument handling, sterilisation, aseptic technique and patient safety.',
    requirements: CERTIFICATE_REQUIREMENTS
  },
  {
    title: 'Basic Life Support (BLS)',
    level: 'short',
    icon: 'bi-heart-pulse',
    duration: '2 days',
    intakes: 'Monthly',
    mode: 'In-person',
    summary: 'High-quality CPR, AED use and relief of choking for adults, children and infants.',
    requirements: ['Open to health workers and members of the public']
  },
  {
    title: 'Advanced Cardiovascular Life Support (ACLS)',
    level: 'short',
    icon: 'bi-activity',
    duration: '3 days',
    intakes: 'Quarterly',
    mode: 'In-person',
    summary: 'Recognition and management of cardiopulmonary arrest, arrhythmias and acute coronary syndromes.',
    requirements: ['Practising health professionals', 'Valid BLS certificate']
  },
  {
    title: 'First Aid & Emergency Response',
    level: 'short',
    icon: 'bi-bandaid',
    duration: '3 days',
    intakes: 'Monthly',
    mode: 'In-person',
    summary: 'Practical first aid for workplaces, schools and communities, including scene safety and casualty management.',
    requirements: ['Open to all — individuals and corporate groups']
  },
  {
    title: 'Phlebotomy',
    level: 'short',
    icon: 'bi-droplet',
    duration: '4 weeks',
    intakes: 'Monthly',
    mode: 'Blended',
    summary: 'Safe venepuncture and capillary sampling, specimen handling and infection control.',
    requirements: ['Secondary school certificate', 'Health background is an advantage']
  },
  {
    title: 'HIV Testing Services & Counselling',
    level: 'short',
    icon: 'bi-chat-heart',
    duration: '2 weeks',
    intakes: 'Quarterly',
    mode: 'In-person',
    summary: 'Client-centred counselling, rapid testing algorithms, quality assurance and linkage to care.',
    requirements: ['Health workers, counsellors and community health promoters']
  },
  {
    title: 'Computer Packages for Health Professionals',
    level: 'short',
    icon: 'bi-laptop',
    duration: '6 weeks',
    intakes: 'Monthly',
    mode: 'Evening / Weekend',
    summary: 'Office productivity tools, data entry, spreadsheets for health data and an introduction to electronic medical records.',
    requirements: ['Open to all']
  }
];

export const STATS = [
  { value: 60, suffix: '+', label: 'Years of Excellence', icon: 'bi-award' },
  { value: 13000, suffix: '+', label: 'Alumni in Practice', icon: 'bi-people' },
  { value: 12, suffix: '', label: 'Accredited Programs', icon: 'bi-journal-medical' },
  { value: 9, suffix: '+', label: 'Clinical Partner Facilities', icon: 'bi-hospital' }
];

export const NEWS = [
  {
    date: '2026-10-21',
    category: 'Intake',
    title: 'NMTC Received September Intake Students',
    excerpt: 'NMTC received successful applicants for September 2026 intake.',
    image: IMAGES.study
  },
  {
    date: '2026-09-30',
    category: 'Facilities',
    title: 'New Clinical Skills Laboratory Commissioned',
    excerpt: 'The state-of-the-art laboratory offers high-fidelity manikins and a fully equipped mock theatre for hands-on training.',
    image: IMAGES.theatre
  },
  {
    date: '2026-09-12',
    category: 'Admissions',
    title: 'Applications Open for the January 2027 Intake',
    excerpt: 'Prospective students can now apply online for diploma and certificate programs commencing in January 2027.',
    image: IMAGES.study
  }
];

export const EVENTS = [
  { date: '2026-11-14', title: 'Open Day & Campus Tour', time: '9:00 am – 3:00 pm', venue: 'Main Campus' },
  { date: '2026-11-27', title: 'End of Semester Examinations Begin', time: 'All day', venue: 'Examination Halls' },
  { date: '2026-12-04', title: '26th Graduation Ceremony', time: '9:00 am', venue: 'College Grounds' },
  { date: '2027-01-11', title: 'January 2027 Intake Reporting', time: '8:00 am', venue: 'Admissions Office' }
];

export const TESTIMONIALS = [
  {
    quote:
      'The clinical placements at NMTC exposed me to real patients from my first year. I graduated confident, competent and ready for the wards.',
    name: 'Grace M.',
    role: 'Diploma in Nursing, Class of 2022 · Registered Nurse'
  },
  {
    quote:
      'Our lecturers are practitioners who bring the hospital into the classroom. The skills laboratory made all the difference in my licensing exams.',
    name: 'Daniel K.',
    role: 'Diploma in Clinical Medicine, Class of 2021 · Clinical Officer'
  },
  {
    quote:
      'NMTC gave me a strong foundation in laboratory science and the discipline to keep learning. I now supervise a busy diagnostic laboratory.',
    name: 'Amina O.',
    role: 'Diploma in Medical Laboratory Sciences, Class of 2019'
  }
];

export const AFFILIATES = [
  {
    category: 'Teaching & Referral Hospitals',
    icon: 'bi-hospital',
    description: 'Supervised clinical placements and internships for all clinical programs.',
    items: ['ST Joseph Nyabondo Hospital', 'Kisumu Level 5 General Hospital']
  },
  {
    category: 'Regulatory & Professional Bodies',
    icon: 'bi-patch-check',
    description: 'Accreditation of programs, examinations and professional licensure.',
    items: ['Nursing Council of Kenya - NCK', 'TVET CDACC', 'Pharmacy & Poisons Board', 'Laboratory Technicians Board']
  },
  {
    category: 'Community & International Partners',
    icon: 'bi-globe2',
    description: 'Community outreach, faculty exchange and capacity-building programs.',
    items: ['Ministry of Health - MOH', 'County Health Departments', 'International Health Partnerships', 'Faith-based Health Networks']
  }
];

export const HISTORY = [
  { year: '1959', title: 'Foundation', text: 'NMTC is established to provide training for midwives whose services were highly needed in the healthcare sector.' },
  { year: '1960', title: 'Recognition', text: 'It was recognized by the Nursing Council of Kenya as one of the nursing training institutions.' },
  { year: '2001', title: 'Expansion of Programs', text: 'College expanded its academic programs by incorporating Diploma in Pharmaceutical Technology.' },
  { year: '2004', title: 'Upgrade', text: 'The institution was upgraded to offer Diploma in Kenya Registered Community Health Nursing (KRCHN) at Basic level.' },
  { year: '2015', title: 'Diversification', text: 'College further diversified its academic portfolio by introducing Diploma in Clinical Medicine and Surgery.' },
  { year: '2018', title: 'Health Records Launched', text: 'College introduced Diploma and Certificate programs in Health Records and Information Technology.' },
  { year: '2026', title: 'First HSS Cohort', text: 'Introduced Faculty of Health Service Support Assistant, with the first cohort reporting in March 2026.' }
];

export const VACANCIES = [
  { title: 'Lecturer – Clinical Medicine', department: 'School of Clinical Medicine', type: 'Full-time', closing: '2026-11-30' },
  { title: 'Nurse Tutor', department: 'School of Nursing', type: 'Full-time', closing: '2026-11-30' },
  { title: 'Part-time Lecturer – Pharmacology', department: 'School of Pharmacy', type: 'Part-time', closing: '2026-12-10' },
  { title: 'ICT Officer', department: 'ICT & E-Learning', type: 'Full-time', closing: '2026-12-12' },
  { title: 'Assistant Librarian', department: 'Library Services', type: 'Contract', closing: '2026-12-15' }
];

export const GRADUATION_DATE = '2026-12-04T09:00:00';
