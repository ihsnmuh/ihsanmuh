import { filteringObject } from '@/helpers/filteringObject';
import { IQueryProjectList } from '@/queries/projectList';

import { api } from './API';

import { TProjets } from '@/types/interfaces/projects';

export const fetchProjectList = async (payload: IQueryProjectList) => {
  try {
    const PARAMS = new URLSearchParams(
      filteringObject({
        limit: payload.limit,
        order: payload.order,
      }),
    );

    const url = `${process.env.NEXT_PUBLIC_API_PROJECT}?${PARAMS}` as string;

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
    return Promise.reject(error);
  }
};
