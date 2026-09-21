// Replaces Gatsby's `siteMetadata`. Anything that was read through
// `site.siteMetadata` in a GraphQL query is read from here instead.
export const SITE = {
  title: 'Eduard Paul Lakida',
  description:
    'Architecting and delivering high-impact Microsoft 365 and Azure solutions that turn complex business needs into scalable results.',
  url: 'https://eduardpaul.work',
  image: '/favicon.svg',
  author: {
    name: 'Eduard Paul Lakida',
    position: 'Lead Solutions Architect at NTT DATA Europe & LATAM',
  },
  social: {
    twitter: '@eduapauldev',
  },
} as const;

export const NAV_ITEMS = [
  { href: '/about', label: 'About me' },
  { href: '/activity', label: 'Activity' },
] as const;
