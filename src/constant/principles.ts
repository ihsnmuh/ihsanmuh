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
      'I try to write code that does exactly what it needs to — nothing more. If something feels overcomplicated, it probably is.',
    icon: 'conciseness',
    iconClass: 'text-rose-500 dark:text-rose-400',
    iconBg: 'bg-rose-50 dark:bg-rose-900/20',
    gradientBar: 'from-rose-500 to-red-400',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-700/50',
    hoverTitle: 'group-hover:text-rose-500 dark:group-hover:text-rose-400',
  },
  {
    id: 2,
    title: 'Keep Learning',
    description:
      "Tech moves fast and I try to keep up. I read, experiment, and build side projects just to stay curious. It's less about being up-to-date, more about enjoying the process.",
    icon: 'learning',
    iconClass: 'text-amber-500 dark:text-amber-400',
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    gradientBar: 'from-amber-500 to-yellow-400',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700/50',
    hoverTitle: 'group-hover:text-amber-500 dark:group-hover:text-amber-400',
  },
  {
    id: 3,
    title: 'Ship It',
    description:
      "Done is better than perfect. I'd rather put something real in front of users and iterate than spend weeks polishing something no one has seen yet.",
    icon: 'ship',
    iconClass: 'text-emerald-500 dark:text-emerald-400',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    gradientBar: 'from-emerald-500 to-green-400',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700/50',
    hoverTitle:
      'group-hover:text-emerald-500 dark:group-hover:text-emerald-400',
  },
];
