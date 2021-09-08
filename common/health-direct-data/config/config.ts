export type IHealthDirectDataConfig = {
  healthDirect: {
    data: {
      testingFacilities: {
        url: string;
        apiKey: string;
      };
    };
  };
};

export const config = async (): Promise<IHealthDirectDataConfig> => {
  return {
    healthDirect: {
      data: {
        testingFacilities: {
          url: 'https://api.nhsd.healthdirect.org.au/v5/healthcareServices/_search',
          apiKey: '4YxtCiBhLVagJBXF1PLsk4UQjWaRfich4dYOHDrn',
        },
      },
    },
  };
};

export default config;
