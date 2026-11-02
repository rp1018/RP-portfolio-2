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
    id: 'gritx',
    title: 'GritX: A Campus Marketplace for Students, Built with Flutter',
    subtitle: 'Flutter · Dart · Firebase Auth · Cloud Firestore · Cloudinary',
    tagline: 'Buy. Sell. Connect, within your campus.',
    description: 'I built GritX, a student marketplace app where college students can buy and sell items within their campus community.',
    fullDescription: 'I built GritX, a student marketplace app where college students can buy and sell items within their campus community.\n\n• Sign in with email or Google, or browse as a guest\n• Set your campus location with GPS or manually, and filter "Nearby" items\n• Browse listings by category: Books, Notes, Electronics, Sports, Furniture\n• Post items with photos, price, and an optional product-damage declaration\n• Chat with the seller in-app\n• Mark an item as sold to a buyer, who sees it under "My Orders"',
    link: 'https://github.com/rp1018/Gritx',
    src: '/projects/gritx.png',
    alt: 'GritX campus marketplace app'
  },
  {
    id: 'ai-system-assistant',
    title: 'AI System Assistant',
    subtitle: 'Python · NVIDIA NIM · PyQt5 · Llama 3.1',
    tagline: 'Your Desktop, Smarter. Powered by AI.',
    description: 'A Python-based AI desktop assistant that combines natural language interaction, voice communication, and intelligent desktop automation. Built with NVIDIA NIM and Llama 3.1, it understands user requests and dynamically determines whether to respond conversationally or execute system actions.',
    fullDescription: 'Your Desktop, Smarter. Powered by AI. A Python-based AI desktop assistant that combines natural language interaction, voice communication, and intelligent desktop automation. Built with NVIDIA NIM and Llama 3.1, it understands user requests and dynamically determines whether to respond conversationally or execute system actions. Features include voice input and output, application launching, web navigation, keyboard and mouse automation, and contextual conversation memory. Designed with a PyQt5 graphical interface and a command-line mode, bringing AI-powered assistance directly into everyday desktop workflows.',
    link: 'https://github.com/rp1018/Local-AI-System-Assistant',
    src: '/projects/ai-os-assistant.png',
    alt: 'AI System Assistant desktop interface'
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
