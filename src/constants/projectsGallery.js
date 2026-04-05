const p = (filename) => `${process.env.PUBLIC_URL || ''}/projects/${filename}`;

export const projectsGallery = [
  {
    id: 1,
    title: 'Portfolio Website',
    category: 'Web Development',
    image: p('01-portfolio.png'),
    description:
      'Site portfolio moderne avec React et Framer Motion, mise en page responsive et animations.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    sourceUrl: 'https://github.com/eliebotuna',
    demoUrl: 'https://botunaeliecv.vercel.app/',
  },
  {
    id: 2,
    title: 'Login System',
    category: 'UI/UX Design',
    image: p('02-login-system.png'),
    description:
      'Conception d’interface pour un système de connexion sécurisé, prototypage et design system.',
    technologies: ['Figma', 'CSS', 'Auth'],
    sourceUrl: 'https://www.figma.com/design/DcDmW1XkZpAvuDxCDTWIu1/Login-Page-?m=auto&t=7VDeE7Ua3ijFHRSc-6',
    demoUrl: 'https://www.figma.com/design/DcDmW1XkZpAvuDxCDTWIu1/Login-Page-?m=auto&t=7VDeE7Ua3ijFHRSc-6',
  },
  {
    id: 3,
    title: 'Taxi Service App',
    category: 'Mobile App',
    image: p('03-taxi-service.png'),
    description:
      'Application mobile de réservation de taxi : parcours utilisateur, écrans clés et composants UI.',
    technologies: ['Figma', 'React', 'Node.js'],
    sourceUrl: 'https://www.figma.com/design/CcGts5cDOvLL3bVaYHLuNa/Taxi-Service-App?m=auto&t=7VDeE7Ua3ijFHRSc-6',
    demoUrl: 'https://www.figma.com/design/CcGts5cDOvLL3bVaYHLuNa/Taxi-Service-App?m=auto&t=7VDeE7Ua3ijFHRSc-6',
  },
  {
    id: 4,
    title: 'King J Protect',
    category: 'Web / Print',
    image: p('04-king-j-protect.jpg'),
    description: 'Brochure et supports visuels pour le projet King J Protect.',
    technologies: ['Photoshop', 'Design'],
    sourceUrl: '',
    demoUrl: 'tel:+243977350699',
  },
  {
    id: 5,
    title: 'EquiGreen For Peace',
    category: 'Site vitrine',
    image: p('05-equigreen-for-peace.png'),
    description:
      'Site de l’ASBL EquiGreen For Peace : environnement, genre et paix en RDC — présentation, actions et sensibilisation.',
    technologies: ['Web', 'ONG'],
    sourceUrl: '',
    demoUrl: 'https://equigreenforpeace.org/',
  },
  {
    id: 6,
    title: 'BG Bridal Paradise',
    category: 'Site web',
    image: p('06-bg-bridal-paradise.png'),
    description:
      'Site déployé pour BG Bridal Paradise — vitrine et présentation en ligne.',
    technologies: ['Web'],
    sourceUrl: '',
    demoUrl: 'https://bgbridalparadises.com/',
  },
  {
    id: 7,
    title: 'EduBooster (Web)',
    category: 'Plateforme e-learning',
    image: p('07-edubooster-web.png'),
    description:
      'Plateforme éducative en ligne : cours, suivi d’apprentissage et parcours utilisateur (version web).',
    technologies: ['Web', 'Éducation'],
    sourceUrl: '',
    demoUrl: 'https://edubooster.org/',
  },
  {
    id: 8,
    title: 'EduBooster (App)',
    category: 'Application mobile',
    image: p('08-edubooster-app.png'),
    description:
      'Application Android EduBooster : cours en ligne, paiement Mobile Money, tableaux de bord et suivi de progression.',
    technologies: ['Android', 'Mobile Money', 'Éducation'],
    sourceUrl: '',
    demoUrl:
      'https://play.google.com/store/apps/details?id=org.edubooster.learning&pcampaignid=web_share',
  },
  {
    id: 9,
    title: 'Bagal Express Nettoyage',
    category: 'Site vitrine',
    image: [p('09-bagal-express.png'), p('09-bagal-express.jpg')],
    description:
      'Site déployé pour Bagal Express Nettoyage — présentation des services de nettoyage.',
    technologies: ['Web'],
    sourceUrl: '',
    demoUrl: 'https://bagalexpressnetoyage.com/',
  },
];
