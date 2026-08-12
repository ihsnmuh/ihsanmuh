import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  Compass,
  Copy,
  CornerDownLeft,
  FileText,
  FolderKanban,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import { queryProjectList } from '@/queries/projectList';

interface SearchItem {
  id: string;
  category: 'Navigation' | 'Blog' | 'Projects' | 'Actions';
  title: string;
  description?: string;
  url?: string;
  action?: () => void;
  icon: React.ReactNode;
}

interface IPost {
  title: string;
  description?: string;
  slug: string;
  tags?: string[] | string;
}

interface ICommandPaletteProject {
  title: string;
  description?: string;
  slug: string;
  stacks?: string[];
  github?: string;
  website?: string;
}

const CommandPalette = () => {
  const router = useRouter();
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const currentTheme = resolvedTheme ?? theme;

  // Toggle Theme action
  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
    setIsOpen(false);
  }, [currentTheme, setTheme]);

  // Copy Link action
  const copyCurrentLink = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1000);
    }
  }, []);

  // Fetch projects using projectList query hook
  const { data: projects = [] } = useQuery({
    ...queryProjectList({ limit: 100 }),
    enabled: isOpen,
  });

  // Fetch blog posts
  const { data: posts = [] } = useQuery<IPost[]>({
    queryKey: ['command-palette-posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
    enabled: isOpen,
  });

  // Listen to open-search custom event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSearchQuery('');
      setSelectedIndex(0);
    };

    window.addEventListener('open-search', handleOpen);
    return () => window.removeEventListener('open-search', handleOpen);
  }, []);

  // Listen to global Cmd/Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearchQuery('');
        setSelectedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Static items (Navigation and Actions)
  const navigationItems = useMemo<SearchItem[]>(
    () => [
      {
        id: 'nav-home',
        category: 'Navigation',
        title: 'Home',
        description: 'Return to the homepage.',
        url: '/',
        icon: <Compass className='h-4 w-4' />,
      },
      {
        id: 'nav-blog',
        category: 'Navigation',
        title: 'Blog',
        description: 'Read articles about web development and technology.',
        url: '/blog',
        icon: <FileText className='h-4 w-4' />,
      },
      {
        id: 'nav-project',
        category: 'Navigation',
        title: 'Projects',
        description:
          'Browse the collection of applications and projects I have built.',
        url: '/project',
        icon: <FolderKanban className='h-4 w-4' />,
      },
      {
        id: 'nav-hobbies',
        category: 'Navigation',
        title: 'Hobbies',
        description:
          'Explore personal pursuits: Strava running stats, books, and photography.',
        url: '/hobbies',
        icon: <Activity className='h-4 w-4' />,
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        title: 'About',
        description: 'Profile, education, and professional experience.',
        url: '/about',
        icon: <Compass className='h-4 w-4' />,
      },
    ],
    [],
  );

  const actionItems = useMemo<SearchItem[]>(
    () => [
      {
        id: 'action-theme',
        category: 'Actions',
        title:
          currentTheme === 'light'
            ? 'Switch to Dark Mode'
            : 'Switch to Light Mode',
        description: 'Toggle the website theme.',
        action: toggleTheme,
        icon:
          currentTheme === 'light' ? (
            <Moon className='h-4 w-4' />
          ) : (
            <Sun className='h-4 w-4' />
          ),
      },
      {
        id: 'action-copy',
        category: 'Actions',
        title: copied ? 'Link Copied!' : 'Copy Page Link',
        description: 'Copy current page URL to clipboard.',
        action: copyCurrentLink,
        icon: <Copy className='h-4 w-4' />,
      },
    ],
    [currentTheme, copied, toggleTheme, copyCurrentLink],
  );

  // Dynamic lists from posts and projects
  const blogItems = useMemo<SearchItem[]>(
    () =>
      posts.map((post) => ({
        id: `blog-${post.slug}`,
        category: 'Blog',
        title: post.title,
        description: post.description || 'Blog article.',
        url: `/blog/${post.slug}`,
        icon: <FileText className='h-4 w-4' />,
      })),
    [posts],
  );

  const projectItems = useMemo<SearchItem[]>(
    () =>
      (projects as unknown as ICommandPaletteProject[]).map((project) => ({
        id: `project-${project.slug}`,
        category: 'Projects',
        title: project.title,
        description: project.description || 'Portfolio project details.',
        url: project.website || project.github || '/project',
        icon: <FolderKanban className='h-4 w-4' />,
      })),
    [projects],
  );

  // Combine and filter items based on search query
  const filteredItems = useMemo(() => {
    const all = [
      ...navigationItems,
      ...actionItems,
      ...blogItems,
      ...projectItems,
    ];
    if (!searchQuery.trim()) return all;

    const query = searchQuery.toLowerCase().trim();
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query),
    );
  }, [navigationItems, actionItems, blogItems, projectItems, searchQuery]);

  // Handle selected index reset when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedItem = filteredItems[selectedIndex];
        if (selectedItem) {
          if (selectedItem.action) {
            selectedItem.action();
          } else if (selectedItem.url) {
            if (selectedItem.url.startsWith('http')) {
              window.open(selectedItem.url, '_blank', 'noopener,noreferrer');
            } else {
              router.push(selectedItem.url);
            }
            setIsOpen(false);
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, router]);

  // Organize filtered items back into their categories for display
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: { items: SearchItem[]; startIdx: number } } =
      {};
    let currentIndex = 0;

    filteredItems.forEach((item) => {
      let group = groups[item.category];
      if (!group) {
        group = { items: [], startIdx: currentIndex };
        groups[item.category] = group;
      }
      group.items.push(item);
      currentIndex++;
    });

    return groups;
  }, [filteredItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4'>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className='fixed inset-0 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-md'
          />

          {/* Search container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onAnimationComplete={() => inputRef.current?.focus()}
            ref={containerRef}
            className={cn(
              'relative w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl flex flex-col max-h-[60vh]',
              'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl',
              'border-slate-200 dark:border-slate-800',
            )}
          >
            {/* Input Bar */}
            <div className='flex items-center gap-3 px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80'>
              <Search className='h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0' />
              <input
                ref={inputRef}
                type='text'
                placeholder='Type a command or search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500',
                  'text-sm font-medium focus:outline-none focus:ring-0',
                )}
              />
              <div className='flex items-center gap-1.5 shrink-0'>
                <span className='font-sans text-[10px] font-semibold text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 bg-slate-100/50 dark:bg-slate-800/50'>
                  ESC
                </span>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 rounded'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* List Results */}
            <div
              ref={listRef}
              className='flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800'
            >
              {filteredItems.length > 0 ? (
                Object.entries(groupedItems).map(([category, group]) => (
                  <div key={category} className='mb-4 last:mb-2'>
                    {/* Category Label */}
                    <div className='px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400/80 dark:text-slate-500/85'>
                      {category}
                    </div>

                    {/* Category Items */}
                    <div className='space-y-0.5 mt-1'>
                      {group.items.map((item, idx) => {
                        const itemFlatIndex = group.startIdx + idx;
                        const isSelected = itemFlatIndex === selectedIndex;

                        return (
                          <div
                            key={item.id}
                            data-active={isSelected}
                            onMouseEnter={() => setSelectedIndex(itemFlatIndex)}
                            onClick={() => {
                              if (item.action) {
                                item.action();
                              } else if (item.url) {
                                if (item.url.startsWith('http')) {
                                  window.open(
                                    item.url,
                                    '_blank',
                                    'noopener,noreferrer',
                                  );
                                } else {
                                  router.push(item.url);
                                }
                                setIsOpen(false);
                              }
                            }}
                            className={cn(
                              'group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200',
                              isSelected
                                ? 'bg-primary-500 dark:bg-primary-500 text-white'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300',
                            )}
                          >
                            <div className='flex items-center gap-3 min-w-0'>
                              {/* Left icon wrapper */}
                              <div
                                className={cn(
                                  'flex items-center justify-center h-8 w-8 rounded-lg border shrink-0',
                                  isSelected
                                    ? 'bg-white/20 border-white/10 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:border-slate-300 dark:group-hover:border-slate-700',
                                )}
                              >
                                {item.icon}
                              </div>

                              <div className='min-w-0'>
                                <p
                                  className={cn(
                                    'text-xs font-semibold truncate',
                                    isSelected
                                      ? 'text-white'
                                      : 'text-slate-800 dark:text-slate-100',
                                  )}
                                >
                                  {item.title}
                                </p>
                                {item.description && (
                                  <p
                                    className={cn(
                                      'text-[10px] truncate mt-0.5 max-w-sm sm:max-w-md',
                                      isSelected
                                        ? 'text-white/80'
                                        : 'text-slate-400 dark:text-slate-500',
                                    )}
                                  >
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Enter indicator */}
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className='flex items-center gap-1 text-[10px] font-semibold text-white/90 shrink-0 pr-1'
                              >
                                <span>Open</span>
                                <CornerDownLeft className='h-3 w-3' />
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <p className='font-secondary text-sm font-semibold text-slate-400 dark:text-slate-500'>
                    No results found
                  </p>
                  <p className='text-xs text-slate-400 dark:text-slate-500 mt-1.5'>
                    Try searching for something else.
                  </p>
                </div>
              )}
            </div>

            {/* Sticky footer with shortcuts info */}
            <div className='hidden sm:flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500'>
              <div className='flex items-center gap-3'>
                <span className='flex items-center gap-1'>
                  <span className='font-sans border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 bg-white dark:bg-slate-900 font-semibold'>
                    ↑↓
                  </span>{' '}
                  Navigate
                </span>
                <span className='flex items-center gap-1'>
                  <span className='font-sans border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 bg-white dark:bg-slate-900 font-semibold'>
                    ↵
                  </span>{' '}
                  Select
                </span>
                <span className='flex items-center gap-1'>
                  <span className='font-sans border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 bg-white dark:bg-slate-900 font-semibold'>
                    ESC
                  </span>{' '}
                  Close
                </span>
              </div>
              <div>
                Use <kbd className='font-semibold'>⌘K</kbd> to toggle
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
