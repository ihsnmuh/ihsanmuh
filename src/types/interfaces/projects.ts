export type TProjets = IProject[];

export interface IProject {
  image: string;
  title: string;
  category: string;
  description: string;
  stacks: string[];
  github?: string;
  website?: string;
}
