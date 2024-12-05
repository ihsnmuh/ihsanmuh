interface INewRequestInit extends RequestInit {
  withLocalAPI?: boolean;
}

interface INewOptions {
  newUrl: string;
  newOptions: RequestInit;
}

export const Header = {
  // * type here for default header
};

const optionsHandler = (
  url: string,
  options?: INewRequestInit,
): INewOptions => {
  const headers: any = {
    ...Header,
    ...(options?.headers || {}),
  };

  const newUrl: string = options?.withLocalAPI
    ? `${process.env.NEXT_PUBLIC_API}${url}`
    : url;
  delete options?.withLocalAPI;

  const newOptions: RequestInit = {
    ...(options || {}),
    headers,
  };

  return {
    newUrl,
    newOptions,
  };
};

export const api = async (url: string, options?: INewRequestInit) => {
  const { newUrl, newOptions }: INewOptions = optionsHandler(url, options);
  return fetch(newUrl, newOptions);
};
