import { IServerConfig } from 'rafter';

export type ICovidAppConfig = IServerConfig & {
  covid: {
    data: {
      websites: {
        testingFacilitiesUrl: string;
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
        websites: {
          // TODO we should update it to use https://www.dhhs.vic.gov.au/testing-site-data which is what the website uses. That page just proxies the spreadsheet data, but it does mean they could deprecate the spreadsheet altogether
          testingFacilitiesUrl:
            'https://spreadsheets.google.com/feeds/list/1_tKN6yIxOUjqOOermICjxwhRExlhH3UTx8jsBWjxiy4/1/public/values?alt=json',
        },
      },
    },
  };
};

export default config;
