/**
 * Slugs Simple Icons (https://simpleicons.org/) — icônes servies en SVG via jsDelivr.
 */
const LABEL_TO_SLUG = {
  React: 'react',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  'Next.js': 'nextdotjs',
  'Node.js': 'nodedotjs',
  HTML5: 'html5',
  CSS3: 'css3',
  Figma: 'figma',
  Django: 'django',
  MongoDB: 'mongodb',
  PostgreSQL: 'postgresql',
  'React Native': 'react',
  'UI/UX': 'figma',
  Git: 'git',
  VPS: 'linux',
  Arduino: 'arduino',
};

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons';

export function getTechIconUrl(label) {
  const slug = LABEL_TO_SLUG[label];
  if (!slug) return null;
  return `${CDN_BASE}/${slug}.svg`;
}

export function hasTechIcon(label) {
  return Boolean(LABEL_TO_SLUG[label]);
}
