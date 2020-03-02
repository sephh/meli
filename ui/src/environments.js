const ENV = {
  dev: {
    API: 'http://localhost:4200/api',
    production: false,
  },
  staging: {
    API: 'http://localhost:4200/api',
    production: false,
  },
  prod: {
    API: 'http://localhost:4200/api',
    production: true,
  }
};

const getEnv = (env = process.env.REACT_APP_ENV || process.env.NODE_ENV) => {
  if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'production') {
    return ENV.prod;
  }

  // development
  return ENV.dev;
};

export default getEnv;
