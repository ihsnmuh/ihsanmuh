import prisma from '@/lib/prisma';

import { IQueryProjectList } from '@/queries/projectList';

/**
 * Fetches projects directly from Postgres for SSR prefetching,
 * serializing Date fields to ISO strings to match `/api/projects` JSON output.
 */
export const getProjectsFromDb = async ({
  limit = 3,
  order = 'desc',
}: IQueryProjectList = {}) => {
  const validOrder = order === 'asc' || order === 'desc' ? order : 'desc';

  const projects = await prisma.projects.findMany({
    orderBy: {
      createAt: validOrder,
    },
    take: Number(limit) || 3,
  });

  return projects.map((project) => ({
    ...project,
    createAt: project.createAt.toISOString(),
    updateAt: project.updateAt.toISOString(),
  }));
};
