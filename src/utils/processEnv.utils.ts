export const processEnv = (key: string, defaultValue = '') => {
  return process.env[key] || defaultValue;
};
