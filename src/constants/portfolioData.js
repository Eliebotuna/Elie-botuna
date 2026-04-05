export const portfolioData = {
  personal: {
    name: 'Elie BOTUNA',
    title: 'Développeur Full Stack | Web & Mobile',
    titleEn: 'Full Stack Developer | Web & Mobile',
    description:
      'Passionné par la création d’expériences utilisateur exceptionnelles et le développement web moderne.',
    aboutBio: `Informaticien, passionné par la conception et le développement d’applications web et mobiles. Fort d’une expertise en gestion de projet et en community management, j’excelle dans la création de solutions technologiques adaptées aux besoins des utilisateurs.

Spécialisé en UI/UX design, je maîtrise Figma pour concevoir des interfaces modernes et intuitives. Mon savoir-faire s’étend également à la programmation web.`,
    aboutBioEn: `Computer scientist passionate about designing and building web and mobile applications. With experience in project management and community management, I focus on tailored technical solutions.

Specialized in UI/UX design, I use Figma for modern interfaces. My skills also cover web development.`,
    email: 'eliescott227@gmail.com',
    location: 'Kinshasa, RDC',
    calendarUrl: '',
  },
  skillCategories: [
    {
      id: 'web',
      icon: 'globe',
      technologies: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'CSS3',
        'Figma',
      ],
    },
    {
      id: 'data',
      icon: 'database',
      technologies: ['Node.js', 'MongoDB', 'PostgreSQL', 'Django'],
    },
    {
      id: 'mobile',
      icon: 'phone',
      technologies: ['React Native', 'UI/UX', 'Figma'],
    },
    {
      id: 'infra',
      icon: 'server',
      technologies: ['Git', 'VPS', 'Arduino'],
    },
  ],
  skills: [
    { name: 'HTML5', level: 90, category: 'Frontend' },
    { name: 'CSS3', level: 85, category: 'Frontend' },
    { name: 'JavaScript', level: 80, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'Python', level: 70, category: 'Backend' },
    { name: 'UI/UX Design', level: 85, category: 'Design' },
    { name: 'Figma', level: 90, category: 'Design' },
  ],
  services: [
    {
      title: 'UI/UX Design',
      description:
        'Création d’interfaces utilisateur intuitives et d’expériences utilisateur engageantes',
      icon: '🎨',
    },
    {
      title: 'Développement Front-end',
      description: 'Développement d’applications web modernes avec React.js',
      icon: '💻',
    },
    {
      title: 'Design Graphique',
      description: 'Création de designs graphiques et retouche photo',
      icon: '✨',
    },
  ],
  experience: [
    {
      company: 'EQUIGREEN FOR PEACE',
      title: {
        fr: 'Directeur Technique',
        en: 'Chief Technology Officer',
      },
      period: {
        fr: '2024 — Présent',
        en: '2024 — Present',
      },
      bullets: {
        fr: [
          'Supervision technique des projets et développement des solutions innovantes.',
          'Conception de supports de communication (print, digital, réseaux sociaux).',
          'Chargé de communication : cohérence des messages, calendrier éditorial et diffusion auprès des publics.',
        ],
        en: [
          'Technical supervision of projects and development of innovative solutions.',
          'Design of communication materials (print, digital, social media).',
          'Communications lead: message consistency, editorial planning, and outreach to audiences.',
        ],
      },
      tags: {
        fr: ['Direction technique', 'Communication', 'Supports visuels', 'Innovation'],
        en: ['Technical leadership', 'Communications', 'Visual assets', 'Innovation'],
      },
    },
    {
      company: 'GESI TECHNOLOGIES',
      title: {
        fr: 'Coordinateur de projets',
        en: 'Coordinator',
      },
      period: {
        fr: '2024 — Présent',
        en: '2024 — NOW',
      },
      bullets: {
        fr: [
          'Chez GESi Technologies, je coordonne des projets et des activités visant à promouvoir l’innovation technologique pour l’éducation et le développement durable.',
          'J’organise des hackathons et des ateliers de formation.',
        ],
        en: [
          'At GESi Technologies, I coordinate projects and activities aimed at promoting technological innovation for education and sustainable development.',
          'I organize hackathons and training workshops.',
        ],
      },
      tags: {
        fr: ['Coordination', 'Hackathons', 'Formation'],
        en: ['Coordination', 'Hackathons', 'Training'],
      },
    },
    {
      company: 'FREELANCE',
      title: {
        fr: 'Développeur logiciel',
        en: 'Software Developer',
      },
      period: {
        fr: '2022 — Présent',
        en: '2022 — NOW',
      },
      bullets: {
        fr: [
          'Je conçois, développe et maintiens des applications web et mobiles adaptées aux besoins des utilisateurs.',
          'Maîtrise de plusieurs langages et stacks : Python, JavaScript, React et Node.js.',
        ],
        en: [
          'I design, develop, and maintain web and mobile applications tailored to user needs.',
          'Proficient in several programming languages and stacks, including Python, JavaScript, React and Node.js.',
        ],
      },
      tags: {
        fr: ['Python', 'JavaScript', 'React', 'Node.js'],
        en: ['Python', 'JavaScript', 'React', 'Node.js'],
      },
    },
    {
      company: 'ECOLOGICAL BRIGADE',
      title: {
        fr: 'Activiste climatique (tech)',
        en: 'Tech Climate Activist',
      },
      period: {
        fr: '2024 — Présent',
        en: '2024 — NOW',
      },
      bullets: {
        fr: [
          'Engagement pour la justice climatique : sensibilisation, plaidoyer et éducation à l’environnement auprès des jeunes et des communautés locales.',
          'Je participe à des campagnes, forums et programmes de formation.',
        ],
        en: [
          'Actively engaged in the fight for climate justice through awareness-raising, advocacy, and environmental education among youth and local communities.',
          'I participate in campaigns, forums, and training programs.',
        ],
      },
      tags: {
        fr: ['Climat', 'Plaidoyer', 'Éducation'],
        en: ['Climate', 'Advocacy', 'Education'],
      },
    },
    {
      company: 'KWETU TECH INNOVATION',
      title: {
        fr: 'Designer UI/UX junior',
        en: 'Junior UI/UX Designer',
      },
      period: {
        fr: '2023 — Présent',
        en: '2023 — NOW',
      },
      bullets: {
        fr: [
          'Réalisation de maquettes de sites web et d’applications mobiles avec Figma.',
        ],
        en: ['I make website mockups and mobile applications with Figma.'],
      },
      tags: {
        fr: ['Figma', 'UI/UX', 'Prototypage'],
        en: ['Figma', 'UI/UX', 'Prototyping'],
      },
    },
  ],
  projects: [
    {
      title: 'Application E-commerce',
      description: 'Design et développement d’une plateforme e-commerce moderne',
      technologies: ['React', 'Figma', 'Node.js'],
    },
    {
      title: 'Application Mobile',
      description: 'Interface utilisateur pour une application mobile',
      technologies: ['UI/UX', 'Figma', 'React Native'],
    },
  ],
  education: [
    {
      degree: 'Master en Design Numérique',
      school: 'Digital Design Institute',
      period: '2016 - 2018',
    },
    {
      degree: 'Licence en Informatique',
      school: 'Tech University',
      period: '2012 - 2016',
    },
  ],
  socialLinks: [
    {
      name: 'Email',
      url: 'mailto:eliescott227@gmail.com',
      icon: 'email',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/eliebotuna',
      icon: 'linkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/eliebotuna',
      icon: 'github',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/eliebotuna',
      icon: 'twitter',
    },
  ],
};
