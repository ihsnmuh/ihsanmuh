import { api } from './API';

import { TProjets } from '@/types/interfaces/projects';

export const fetchProjectList = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_API_PROJECT as string;

    const options = {
      method: 'GET',
      withLocalAPI: true,
    };

    const response = await api(url, options);
    const result: TProjets = await response.json();

    if (!response.ok) {
      return await Promise.reject(result);
    } else {
      return result;
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: projectList.ts:27 ~ fetchProjectList ~ error:',
      error,
    );

    return Promise.reject(null);
  }
};
