import { PROJECT_LIST } from '@/constant/queryKeys/projectList';
import { fetchProjectList } from '@/services/projectList';

export const queryProjectList = () => {
  return {
    queryKey: PROJECT_LIST,
    queryFn: () => fetchProjectList(),
  };
};
