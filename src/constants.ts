const authorizationURL = "vatsim.net/oauth/authorize";
const tokenURL = "vatsim.net/oauth/token";

export const makeAuthURLs = (isDev: boolean) => {
  const prefix = isDev ? "https://auth-dev." : "https://auth.";

  return [prefix + authorizationURL, prefix + tokenURL];
};
