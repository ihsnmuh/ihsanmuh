import { PROJECT_LIST } from '@/constant/queryKeys/projectList';
import { fetchProjectList } from '@/services/projectList';

export interface IQueryProjectList {
  limit?: number;
  order?: 'asc' | 'desc';
}

export const queryProjectList = (payload: IQueryProjectList) => {
  const normalizedPayload = {
    limit: payload.limit ?? 3,
    order: payload.order ?? 'desc',
  };

  return {
    queryKey: [...PROJECT_LIST, normalizedPayload] as const,
    queryFn: async () => fetchProjectList(normalizedPayload),
  };
};
