export const SITE = {
  name: 'Rithick Prasath',
  brand: 'RP',
  tagline: 'CSE student, builder, learner.',
  about: "I'm a B.Tech CSE student (class of 2028) who builds practical software, from Flutter apps to Flask backends, explores AI, and keeps getting better at it.",
  education: "B.Tech CSE, Bharath University, Tamil Nadu, India (class of 2028)",
  url: 'https://rpportfolio01.netlify.app', // swap if domain changes
  email: 'rithickprasath001@gmail.com',
  github: 'https://github.com/rp1018',
  linkedin: 'https://www.linkedin.com/in/rp1018',
  resume: '/resume.pdf', // TODO user drops file in /public
  location: 'Tamil Nadu, India'
};

export const PROJECTS = [
  {
    id: 'thinko-ai',
    title: 'Thinko AI — Chatbot',
    subtitle: 'Flask · NVIDIA Llama · Firebase',
    description: 'An AI-powered chatbot built to answer questions, explain concepts, assist with coding, and support everyday tasks through a clean, user-friendly interface. Powered by NVIDIA AI models with a Flask backend.',
    link: 'https://thinko-ai-2.onrender.com',
    src: '/projects/thinko-ai.png',
    alt: 'Thinko AI interface'
  },
  {
    id: 'student-management',
    title: 'Student Management App',
    subtitle: 'Flutter · Flask · Supabase · Cloudinary',
    description: 'A mobile & backend solution built with Flutter, Flask, Supabase authentication & database, and Cloudinary media storage.',
    link: '#',
    src: '/projects/student-management.png',
    alt: 'Student Management App screens'
  },
  {
    id: 'ai-os-assistant',
    title: 'AI OS Assistant',
    subtitle: 'Python · Ollama · pyautogui',
    description: 'Local autonomous operating system assistant leveraging Python, Ollama local LLMs, and PyAutoGUI desktop automation.',
    link: '#',
    src: '/projects/ai-os-assistant.png',
    alt: 'AI OS Assistant'
  }
];

export const LEARNING = [
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    type: 'Verified credential',
    credentialUrl: '[CREDENTIAL_GOOGLE_AI]',
    issued: '[DATE_GOOGLE_AI]'
  },
  {
    title: 'Google Prompting Essentials',
    issuer: 'Google',
    type: 'Verified credential',
    credentialUrl: '[CREDENTIAL_GOOGLE_PROMPT]',
    issued: '[DATE_GOOGLE_PROMPT]'
  },
  {
    title: 'Google IT Support',
    issuer: 'Google',
    type: 'Professional Certificate',
    credentialUrl: '[CREDENTIAL_GOOGLE_IT]',
    issued: '[DATE_GOOGLE_IT]'
  },
  {
    title: 'CS50x',
    issuer: 'Harvard University',
    type: 'Computer Science',
    credentialUrl: '[CREDENTIAL_CS50X]',
    issued: '[DATE_CS50X]'
  }
];

export const STACK = [
  'Python',
  'Dart',
  'Flutter',
  'JavaScript',
  'HTML',
  'CSS',
  'Flask',
  'Firebase',
  'Supabase',
  'Git and GitHub',
  'AI / LLM APIs'
];

// Development warning for remaining placeholders
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const placeholders = Object.entries(SITE).filter(
    ([, val]) => typeof val === 'string' && val.startsWith('[') && val.endsWith(']')
  );
  if (placeholders.length > 0) {
    console.warn(
      `[RP Portfolio Content TODO] Remaining placeholders in SITE:`,
      placeholders.map(([k, v]) => `${k}: ${v}`).join(', ')
    );
  }
}
