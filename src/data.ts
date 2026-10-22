import certOop from './assets/Screenshot 2024-10-18 162700.png';
import certDsa from './assets/Screenshot 2024-10-18 162739.png';
import certJava from './assets/java.png';
import certRest from './assets/restapi.png';
import certEdureka from './assets/image.png';

export interface NavItem {
  id: string;
  label: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  url: string;
  technologies: string[];
  features: string[];
}

export interface Skill {
  name: string;
  icon: string;
  level: 'Advanced' | 'Intermediate' | 'Basic';
  score: number;
  description: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  image: string;
}

export const profile = {
  name: 'Vishnu Vardhan R',
  firstName: 'Vishnu',
  lastName: 'Vardhan R',
  roles: ['FullStack Java Developer', 'Spring Boot Engineer', 'React UI Builder', 'Cyber Security Analyst', 'Portfolio Designer'],
  intro:
    'I build dynamic, scalable web applications with Java Spring Boot, React, MySQL and RESTful APIs — and craft modern, animated interfaces that feel alive.',
  location: 'Chennai, India',
  social: {
    github: 'https://github.com/VISHNUVARDHAN25012002',
    linkedin: 'https://www.linkedin.com/in/vishnu-vardhan-r-232026196/',
    instagram: 'https://www.instagram.com/vishnu.25/profilecard/?igsh=MXcxNWVpM2V0OHhzaw==',
  },
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export const aboutPoints: string[] = [
  'I am passionate about creating dynamic and scalable applications.',
  'As a FullStack Java Developer, I build responsive web solutions using Java, Spring Boot and modern frontend technologies.',
  'My expertise lies in developing robust backend services and intuitive RESTful APIs.',
  'I integrate seamless data interactions with relational databases like MySQL and Hibernate.',
  'I optimise application performance so every line of code contributes to a high-quality, efficient product.',
];

export const services = [
  {
    icon: '🎨',
    title: 'Frontend Development',
    text: 'Responsive, interactive websites with HTML5, CSS3, React and TypeScript — modern interfaces with a great user experience.',
  },
  {
    icon: '⚙️',
    title: 'Backend with Spring Boot',
    text: 'Robust, scalable backend services with Java and Spring Boot. RESTful APIs and microservice architecture.',
  },
  {
    icon: '🗄️',
    title: 'Database Engineering',
    text: 'Designing and optimising MySQL databases, efficient queries and data relationships with integrity and performance.',
  },
];

export const skills: Skill[] = [
  { name: 'Java', icon: '☕', level: 'Advanced', score: 90, description: 'Core Java, OOP, Collections, Multithreading' },
  { name: 'Spring Boot', icon: '🍃', level: 'Advanced', score: 88, description: 'REST APIs, Microservices, Spring Security' },
  { name: 'MySQL', icon: '🗄️', level: 'Advanced', score: 85, description: 'Database Design, Query Optimisation, Stored Procedures' },
  { name: 'React', icon: '⚛️', level: 'Advanced', score: 85, description: 'Hooks, State Management, Component Architecture' },
  { name: 'Cybersecurity', icon: '🔒', level: 'Basic', score: 45, description: 'Security Fundamentals, OWASP, Secure Coding' },
  { name: 'AWS', icon: '☁️', level: 'Basic', score: 40, description: 'EC2, S3, RDS, Cloud Security Basics' },
];

export const sphereTags: string[] = [
  'Java', 'Spring Boot', 'React', 'TypeScript', 'JavaScript', 'MySQL', 'Hibernate', 'JPA',
  'REST APIs', 'Thymeleaf', 'Spring Security', 'Spring MVC', 'HTML5', 'CSS3', 'Node.js',
  'MongoDB', 'Git', 'AWS', 'Microservices', 'OWASP', 'Three.js', 'Vite',
];

export const experience = {
  period: '2024 — Present',
  role: 'FullStack Java Developer',
  company: 'Vivid Trans Tech Solutions',
  summary:
    'Developing robust web applications using Java Spring Boot and modern frontend technologies.',
  highlights: [
    'Government portal development for Greater Chennai Corporation',
    'E-commerce platform development and maintenance',
    'RESTful API design and implementation',
    'Database optimisation and performance tuning',
    'Frontend development using React and Thymeleaf',
  ],
  tech: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL', 'React', 'REST APIs'],
};

export const projects: Project[] = [
  {
    name: 'Muthalvar Padaippagam',
    tagline: 'Government co-working portal',
    description:
      'Co-working space and learning centre booking portal for Greater Chennai Corporation — desk space, meeting rooms and learning centre bookings with flexible pricing plans.',
    url: 'https://gccservices.chennaicorporation.gov.in/muthalvarpadaippagam',
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL', 'REST APIs', 'Spring Security'],
    features: [
      'Real-time booking system with Thymeleaf templates',
      'Multiple pricing tiers and slot management',
      'Spring Security authentication & authorisation',
      'Payment integration with secure transactions',
      'Admin dashboard with Spring Boot backend',
    ],
  },
  {
    name: 'Community Hall Booking',
    tagline: '49+ centres across Chennai',
    description:
      'Community hall booking system for Greater Chennai Corporation managing 49+ community centres with dynamic pricing and availability tracking.',
    url: 'https://gccservices.chennaicorporation.gov.in/communityhall',
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL', 'Spring Data JPA', 'Spring MVC'],
    features: [
      'Multi-location booking with Thymeleaf frontend',
      'Dynamic pricing calculation using Spring Boot',
      'Calendar integration and availability tracking',
      'User management system with Spring Security',
      'Payment gateway integration',
    ],
  },
  {
    name: 'Birds Forever',
    tagline: 'Platform for bird lovers',
    description:
      'A dedicated platform for bird enthusiasts and conservationists — bird identification, habitat tracking and community engagement for wildlife preservation.',
    url: 'https://birdsforever.in/',
    technologies: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'CSS3'],
    features: [
      'Bird species database',
      'Photo identification',
      'Community forums',
      'Conservation tracking',
      'Mobile responsive design',
    ],
  },
  {
    name: 'Smart Buy and Sell',
    tagline: 'E-commerce marketplace',
    description:
      'E-commerce platform for buying and selling products with advanced search, user profiles and secure transactions on a robust backend architecture.',
    url: 'https://smartbuyandsell.com/user',
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL', 'Spring Security', 'Spring Data JPA'],
    features: [
      'Product catalogue management with Thymeleaf templates',
      'Spring Security authentication & authorisation',
      'Smart search & filters using Spring Boot',
      'Payment processing with secure transactions',
      'Review & rating system with Spring MVC',
    ],
  },
];

export const certificates: Certificate[] = [
  { title: 'Object-Oriented Programming in Java', issuer: 'Great Learning', image: certOop },
  { title: 'Data Structures & Algorithms', issuer: 'Great Learning', image: certDsa },
  { title: 'Java (Basic)', issuer: 'HackerRank', image: certJava },
  { title: 'REST API (Intermediate)', issuer: 'HackerRank', image: certRest },
  { title: 'Certification', issuer: 'Edureka', image: certEdureka },
];
