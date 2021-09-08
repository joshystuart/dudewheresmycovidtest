export type IDhhsVictoriaWebsiteDataConfig = {
  dhhsVictoria: {
    data: {
      apiEndpoint: string;
      testingFacilitiesUrl: string;
    };
  };
};

export const config = async (): Promise<IDhhsVictoriaWebsiteDataConfig> => {
  return {
    dhhsVictoria: {
      data: {
        apiEndpoint: 'https://www.coronavirus.vic.gov.au/ckan-api/v1/resource/testing_sites?limit=10000',
        testingFacilitiesUrl:
          'https://spreadsheets.google.com/feeds/list/1_tKN6yIxOUjqOOermICjxwhRExlhH3UTx8jsBWjxiy4/1/public/values?alt=json',
      },
    },
  };
};

export default config;
