export type TPosts = IPost[];

export interface IPost {
  title: string;
  publishedAt: string;
  description: string;
  banner: string;
  content: string;
  tags: string[];
  slug: string;
  isShow?: boolean;
}
