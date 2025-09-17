export const APP_URL = import.meta.env.APP_URL
  ? `https://${import.meta.env.APP_URL}`
  : "http://localhost:3000";
console.log(APP_URL);
