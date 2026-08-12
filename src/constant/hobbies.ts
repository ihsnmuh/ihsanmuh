import {
  IBookItem,
  IPhotoItem,
  THobbyCategory,
} from '@/types/interfaces/hobbies';

export interface IHobbyCategoryConfig {
  id: THobbyCategory;
  name: string;
  icon: string;
  description: string;
  accentColor: string;
}

export const HOBBY_CATEGORIES: IHobbyCategoryConfig[] = [
  {
    id: 'running',
    name: 'Running & Fitness',
    icon: 'Activity',
    description:
      'Logging kilometers, pacing long runs, and chasing personal records connected directly with Strava.',
    accentColor: '#FC4C02', // Strava orange
  },
  {
    id: 'reading',
    name: 'Reading & Books',
    icon: 'BookOpen',
    description:
      'Exploring software craftsmanship, philosophy, systems thinking, and thought-provoking literature.',
    accentColor: '#3B82F6', // Indigo blue
  },
  // {
  //   id: 'photography',
  //   name: 'Visuals & Photography',
  //   icon: 'Camera',
  //   description:
  //     'Capturing urban geometry, quiet morning lights, street moods, and travel frames.',
  //   accentColor: '#10B981', // Emerald green
  // },
];

export const BOOKS_DATA: IBookItem[] = [
  {
    id: 'pragmatic-programmer',
    title: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'David Thomas & Andrew Hunt',
    coverImage:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    status: 'completed',
    rating: 5,
    genre: ['Software Engineering', 'Career', 'Craftsmanship'],
    review:
      'Essential reading for every software engineer. Focuses on taking responsibility for code quality, continuous learning, and practical tips that stand the test of time.',
    quote:
      'Care about your craft. Why spend your life developing software unless you care about doing it well?',
    yearRead: '2024',
  },
];

export const PHOTOS_DATA: IPhotoItem[] = [
  {
    id: 'photo-1',
    title: 'Morning Golden Hour Run',
    image:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
    location: 'Gelora Bung Karno, Jakarta',
    date: 'Jan 2025',
    camera: 'Sony A7 IV',
    lens: 'FE 35mm F1.4 GM',
    settings: '1/1000s · f/2.8 · ISO 100',
    aspectRatio: 'landscape',
    caption:
      'Early morning sunlight breaking through the city skyline right as the morning 10K session wrapped up.',
    tags: ['Running', 'Sunrise', 'Urban'],
  },
  {
    id: 'photo-2',
    title: 'Minimalist Workspace & Shadows',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    location: 'Home Studio',
    date: 'Nov 2024',
    camera: 'Fujifilm X-T5',
    lens: 'XF 23mm F2 R WR',
    settings: '1/250s · f/4.0 · ISO 200',
    aspectRatio: 'landscape',
    caption:
      'Warm afternoon sunlight casting clean diagonal shadows across the mechanical keyboard and desk setup.',
    tags: ['Workspace', 'Minimalism', 'Setup'],
  },
  {
    id: 'photo-3',
    title: 'Foggy Trail Exploration',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    location: 'Taman Hutan Raya, Bandung',
    date: 'Dec 2024',
    camera: 'Sony A7 IV',
    lens: 'FE 24-70mm F2.8 GM II',
    settings: '1/500s · f/2.8 · ISO 400',
    aspectRatio: 'portrait',
    caption:
      'Pine tree trails covered in misty fog during a chilly weekend long trail run.',
    tags: ['Nature', 'Trails', 'Bandung'],
  },
  {
    id: 'photo-4',
    title: 'Urban Architecture & Concrete Lines',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    location: 'SCBD, Jakarta',
    date: 'Oct 2024',
    camera: 'Fujifilm X-T5',
    lens: 'XF 16-55mm F2.8',
    settings: '1/800s · f/5.6 · ISO 160',
    aspectRatio: 'landscape',
    caption:
      'Geometric glass reflections and modern architecture against high clouds.',
    tags: ['Architecture', 'Jakarta', 'Street'],
  },
  {
    id: 'photo-5',
    title: 'Pour Over Coffee Ritual',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    location: 'Weekend Brew Station',
    date: 'Sep 2024',
    camera: 'Fujifilm X-T5',
    lens: 'XF 35mm F1.4 R',
    settings: '1/160s · f/2.0 · ISO 320',
    aspectRatio: 'portrait',
    caption:
      'Morning V60 extraction with single-origin Ethiopian beans notes of jasmine and bergamot.',
    tags: ['Coffee', 'SlowLiving', 'V60'],
  },
];
