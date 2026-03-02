import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import projectData from './project.json';

async function main() {
  const data = projectData as unknown as Projects[];

  await Promise.all(
    data.map((project) =>
      prisma.projects.upsert({
        where: { slug: project.slug },
        create: {
          image: project.image,
          title: project.title,
          slug: project.slug,
          category: project.category,
          description: project.description,
          stacks: project.stacks,
          github: project.github,
          website: project.website,
          createAt: new Date(project.createAt),
        },
        update: {
          image: project.image,
          title: project.title,
          category: project.category,
          description: project.description,
          stacks: project.stacks,
          github: project.github,
          website: project.website,
          createAt: new Date(project.createAt),
        },
      }),
    ),
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
  slug: string;
  category: string;
  description: string;
  stacks: string[];
  github: string;
  website: string;
  createAt: Date;
};
