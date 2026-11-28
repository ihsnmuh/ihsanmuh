export type TProjets = IProject[];

export interface IProject {
  slug?: string;
  image: string;
  title: string;
  category: string;
  description: string;
  stacks: string[];
  github: string;
  website: string;
}
