export type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];

export type IConfig = {
  api: {
    endpoint: string;
  };
  google: {
    apiKey: string;
    libraries: Libraries;
  };
};

export const config: IConfig = {
  api: {
    endpoint: process.env.REACT_APP_API_ENDPOINT || 'https://api.dudewheresmycovidtest.com',
  },
  google: {
    apiKey: process.env.REACT_APP_MAPS_API_KEY || 'get a google maps api key here',
    libraries: ['places'],
  },
};
