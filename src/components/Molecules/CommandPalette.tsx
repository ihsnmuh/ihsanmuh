import { useQuery } from '@tanstack/react-query';
import {
  Compass,
  Copy,
  CornerDownLeft,
  FileText,
  FolderKanban,
  Search,
  Smile,
  X,
} from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TSanMood } from '@/lib/san';
import { cn } from '@/lib/utils';

import SanBurst from '@/components/Atoms/svg/SanBurst';
import SanMascotLazy from '@/components/Atoms/svg/SanMascotLazy';

import { useSanBurst } from '@/helpers/useSanBurst';
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
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { burst: sanBurst, trigger: triggerSan } = useSanBurst();
  const listRef = useRef<HTMLDivElement>(null);

  // Copy Link action
  const copyCurrentLink = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      triggerSan();
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1000);
    }
  }, [triggerSan]);

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
        description: 'Return to the homepage workspace.',
        url: '/',
        icon: <Compass className='h-4 w-4' />,
      },
      {
        id: 'nav-blog',
        category: 'Navigation',
        title: 'Blog',
        description: 'Read engineering notes and design thoughts.',
        url: '/blog',
        icon: <FileText className='h-4 w-4' />,
      },
      {
        id: 'nav-project',
        category: 'Navigation',
        title: 'Projects',
        description:
          'Browse applications and developer tools built by Muhammad Ihsan.',
        url: '/project',
        icon: <FolderKanban className='h-4 w-4' />,
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        title: 'About',
        description: 'Profile, background, timeline, and career journey.',
        url: '/about',
        icon: <Compass className='h-4 w-4' />,
      },
      {
        id: 'nav-san',
        category: 'Navigation',
        title: 'San',
        description:
          'The illustrated mascot: 16 moods, haircuts, layers, and SVG parts.',
        url: '/san',
        icon: <Smile className='h-4 w-4' />,
      },
    ],
    [],
  );

  const actionItems = useMemo<SearchItem[]>(
    () => [
      {
        id: 'action-copy',
        category: 'Actions',
        title: copied ? 'Link Copied to Clipboard!' : 'Copy Page Link',
        description: 'Copy current page URL to clipboard.',
        action: copyCurrentLink,
        icon: <Copy className='h-4 w-4' />,
      },
    ],
    [copied, copyCurrentLink],
  );

  // Dynamic lists from posts and projects
  const blogItems = useMemo<SearchItem[]>(
    () =>
      posts.map((post) => ({
        id: `blog-${post.slug}`,
        category: 'Blog',
        title: post.title,
        description: post.description || 'Article file.',
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
        description: project.description || 'Portfolio project file.',
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

  const paletteMood: TSanMood = !searchQuery.trim()
    ? 'curious'
    : filteredItems.length === 0
      ? 'awkward'
      : 'focused';

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
    <>
      <AnimatePresence>
        {isOpen && (
          <div className='fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4'>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 bg-deep-moss/40 backdrop-blur-sm'
            />

            <m.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              onAnimationComplete={() => inputRef.current?.focus()}
              ref={containerRef}
              className={cn(
                'relative w-full max-w-xl rounded-xl border border-hairline overflow-hidden shadow-xl flex flex-col max-h-[65vh]',
                'bg-surface text-body',
              )}
            >
              <div className='flex items-center gap-3 px-4 py-3.5 bg-surface border-b border-hairline'>
                <SanMascotLazy
                  immediate
                  size={24}
                  mood={paletteMood}
                  fallback={<Search className='h-4 w-4 text-muted' />}
                />
                <input
                  ref={inputRef}
                  type='text'
                  placeholder='Search pages, articles, projects...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    'w-full bg-transparent text-ink placeholder-muted font-primary',
                    'text-sm focus-visible:outline-none',
                  )}
                />
                <div className='flex items-center gap-1.5 shrink-0'>
                  <span className='font-mono text-[10px] text-muted border border-hairline rounded px-1.5 py-0.5 bg-subtle'>
                    ESC
                  </span>
                  <button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    aria-label='Close search'
                    className='text-muted hover:text-ink p-1 rounded transition-colors'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </div>
              </div>

              <div
                ref={listRef}
                className='flex-1 overflow-y-auto p-2 scrollbar-thin'
              >
                {filteredItems.length > 0 ? (
                  Object.entries(groupedItems).map(([category, group]) => (
                    <div key={category} className='mb-3 last:mb-1'>
                      <div className='px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-sage-gray'>
                        {category}
                      </div>

                      <div className='space-y-0.5 mt-1'>
                        {group.items.map((item, idx) => {
                          const itemFlatIndex = group.startIdx + idx;
                          const isSelected = itemFlatIndex === selectedIndex;

                          return (
                            <div
                              key={item.id}
                              data-active={isSelected}
                              onMouseEnter={() =>
                                setSelectedIndex(itemFlatIndex)
                              }
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
                                'group flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors duration-100',
                                isSelected
                                  ? 'bg-subtle text-ink'
                                  : 'hover:bg-subtle/60 text-body',
                              )}
                            >
                              <div className='flex items-center gap-3 min-w-0'>
                                <div
                                  className={cn(
                                    'flex items-center justify-center h-7 w-7 rounded-md border shrink-0',
                                    isSelected
                                      ? 'bg-surface border-hairline-strong text-ink'
                                      : 'bg-subtle/60 border-hairline text-muted',
                                  )}
                                >
                                  {item.icon}
                                </div>

                                <div className='min-w-0'>
                                  <p className='text-sm font-medium text-ink truncate'>
                                    {item.title}
                                  </p>
                                  {item.description && (
                                    <p className='text-xs text-muted truncate mt-0.5 max-w-sm sm:max-w-md'>
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {isSelected && (
                                <m.div
                                  initial={{ opacity: 0, x: -4 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className='flex items-center gap-1 text-[11px] font-mono text-muted shrink-0 pr-1'
                                >
                                  <span>Open</span>
                                  <CornerDownLeft className='h-3 w-3' />
                                </m.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-10 text-center'>
                    <p className='font-ui text-sm font-semibold text-deep-moss'>
                      No results found
                    </p>
                    <p className='text-xs text-sage-gray mt-1'>
                      Try searching for another topic or filename.
                    </p>
                  </div>
                )}
              </div>

              <div className='hidden sm:flex items-center justify-between px-4 py-2 bg-cream-paper border-t border-hairline text-[11px] font-mono text-sage-gray'>
                <div className='flex items-center gap-3'>
                  <span className='flex items-center gap-1'>
                    <kbd className='border border-hairline rounded-xs px-1 py-0.5 bg-paper-white font-bold'>
                      ↑↓
                    </kbd>{' '}
                    Navigate
                  </span>
                  <span className='flex items-center gap-1'>
                    <kbd className='border border-hairline rounded-xs px-1 py-0.5 bg-paper-white font-bold'>
                      ↵
                    </kbd>{' '}
                    Select
                  </span>
                  <span className='flex items-center gap-1'>
                    <kbd className='border border-hairline rounded-xs px-1 py-0.5 bg-paper-white font-bold'>
                      ESC
                    </kbd>{' '}
                    Close
                  </span>
                </div>
                <div>
                  Press <kbd className='font-bold'>⌘K</kbd> anywhere
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
      <SanBurst
        burst={sanBurst}
        mood='wink'
        size={44}
        anchorRef={containerRef}
      />
    </>
  );
};

export default CommandPalette;
