const ENV = {
  dev: {
    API: 'http://localhost:3000/api',
  },
  staging: {
    API: 'http://localhost:3000/api',
  },
  prod: {
    API: 'http://localhost:3000/api',
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
