export type IConfig = {
  api: {
    endpoint: string;
  };
  maps: {
    apiKey: string;
  };
};

export const config: IConfig = {
  api: {
    endpoint: process.env.REACT_APP_API_ENDPOINT || 'https://dix4olw2z3.execute-api.ap-southeast-2.amazonaws.com/prod',
  },
  maps: {
    apiKey: process.env.REACT_APP_MAPS_API_KEY || 'get a google maps api key here',
  },
};
