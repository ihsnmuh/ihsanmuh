import pickBy from 'lodash/pickBy';

export const filteringObject = (payload: { [key: string]: any }) =>
  pickBy(
    payload,
    (value: any) => value !== undefined && value !== null && value !== '',
  );
