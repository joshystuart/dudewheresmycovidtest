import { IServerConfig } from 'rafter';

export type ICovidAppConfig = IServerConfig & {
  covid: {
    data: {
      sources: {
        testingFacilitiesUrl: string;
        statusListUrl: string;
        waitTimesUrl: string;
      };
    };
  };
};

export const config = async (): Promise<ICovidAppConfig> => {
  return {
    server: {
      port: 4000,
    },
    covid: {
      data: {
        sources: {
          testingFacilitiesUrl:
            'https://spreadsheets.google.com/feeds/list/1_tKN6yIxOUjqOOermICjxwhRExlhH3UTx8jsBWjxiy4/1/public/values?alt=json',
          statusListUrl:
            'https://spreadsheets.google.com/feeds/list/1_tKN6yIxOUjqOOermICjxwhRExlhH3UTx8jsBWjxiy4/2/public/values?alt=json',
          waitTimesUrl:
            'https://spreadsheets.google.com/feeds/list/1dx5fDWCKGSJM3L96jVyhksCIxeSPh3ig5VDowWRTPFs/4/public/values?alt=json',
        },
      },
    },
  };
};

export default config;
