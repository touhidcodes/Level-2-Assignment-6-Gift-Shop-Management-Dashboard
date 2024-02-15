export type TCustomError = {
  status: number;
  data: {
    success: false;
    message: string;
    errorSources: {
      path: string;
      message: string;
    }[];
    err: {
      index: number;
      code: number;
      keyPattern: Record<string, number>;
      keyValue: Record<string, string>;
    };
    stack: null | string;
  };
};

export type TApiResponse = {
  error?: any;
  data?: any;
  // other properties...
};
