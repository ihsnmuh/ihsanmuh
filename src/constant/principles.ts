export type IPrinciple = {
  id: number;
  title: string;
  description: string;
  icon: 'conciseness' | 'learning' | 'ship';
  iconClass: string;
  iconBg: string;
  gradientBar: string;
  hoverBorder: string;
  hoverTitle: string;
};

export const Principles: IPrinciple[] = [
  {
    id: 1,
    title: 'Conciseness',
    description:
      'I try to write code that does exactly what it needs to, and nothing more. If something feels overcomplicated, it probably is.',
    icon: 'conciseness',
    iconClass: 'text-deep-moss',
    iconBg: 'bg-soft-linen',
    gradientBar: 'from-amber-glow to-amber-glow',
    hoverBorder: 'hover:border-amber-glow',
    hoverTitle: 'group-hover:text-dark-amber',
  },
  {
    id: 2,
    title: 'Keep Learning',
    description:
      "Tech moves fast and I try to keep up. I read, experiment, and build side projects just to stay curious. It's less about being up-to-date, more about enjoying the process.",
    icon: 'learning',
    iconClass: 'text-deep-moss',
    iconBg: 'bg-soft-linen',
    gradientBar: 'from-amber-glow to-amber-glow',
    hoverBorder: 'hover:border-amber-glow',
    hoverTitle: 'group-hover:text-dark-amber',
  },
  {
    id: 3,
    title: 'Ship It',
    description:
      "Done is better than perfect. I'd rather put something real in front of users and iterate than spend weeks polishing something no one has seen yet.",
    icon: 'ship',
    iconClass: 'text-deep-moss',
    iconBg: 'bg-soft-linen',
    gradientBar: 'from-amber-glow to-amber-glow',
    hoverBorder: 'hover:border-amber-glow',
    hoverTitle: 'group-hover:text-dark-amber',
  },
];
