export type TProjets = IProject[];

export interface IProject {
  image: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  github?: string;
  website?: string;
}
