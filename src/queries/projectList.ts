import { PROJECT_LIST } from '@/constant/queryKeys/projectList';
import { fetchProjectList } from '@/services/projectList';

export interface IQueryProjectList {
  limit?: number;
  order?: 'asc' | 'desc';
}

export const queryProjectList = (payload: IQueryProjectList) => {
  return {
    queryKey: PROJECT_LIST,
    queryFn: async () => fetchProjectList(payload),
  };
};
