import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import projectData from './project.json';

async function main() {
  const data = projectData as unknown as Projects[];

  data.forEach(
    async (project) =>
      await prisma.projects.create({
        data: {
          image: project.image,
          title: project.title,
          category: project.category,
          description: project.description,
          stack: project.stacks,
          github: project.github,
          website: project.website,
        },
      }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

type Projects = {
  image: string;
  title: string;
  category: string;
  description: string;
  stacks: string[];
  github: string;
  website: string;
};
