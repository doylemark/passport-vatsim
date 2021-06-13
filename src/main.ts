import {
  InternalOAuthError,
  Strategy as OAuth2Strategy,
  VerifyCallback,
} from "passport-oauth2";

import { makeAuthURLs } from "./constants";
import { ApiResponse, UserProfile } from "./user";

export type Profile = Omit<UserProfile, "oauth">;
class Strategy extends OAuth2Strategy {
  public name = "vatsim";

  public userProfile(
    accessToken: string,
    done: (err: Error, profile: Profile | undefined) => void
  ) {
    this._oauth2.useAuthorizationHeaderforGET(true);
    this._oauth2.get(
      "https://auth-dev.vatsim.net/api/user",
      accessToken,
      (error, result) => {
        if (error || !result) {
          return done(
            new InternalOAuthError("Failed to fetch user profile:", error),
            undefined
          );
        }

        try {
          const {
            data: { cid, personal, vatsim },
          }: ApiResponse = JSON.parse(result as string);
          return done(error, {
            cid,
            personal,
            vatsim,
          });
        } catch (parseError) {
          return done(
            new InternalOAuthError("Failed to parse user profile:", parseError),
            undefined
          );
        }
      }
    );
  }
}

type AuthConfiguration = {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string;
};

/**
 * @param config Authorization configuration, scopes can include: `full_name | vatsim_details | cid | country`
 * @param handler Handler, to verify if user exists in your DB, needs adding to DB etc.
 * @param isDev Optional param to enable use of `auth-dev.vatsim.net`
 */
const vatsim = (
  config: AuthConfiguration,
  handler: (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    callback: VerifyCallback
  ) => void,
  isDev?: boolean
) => {
  const [authorizationURL, tokenURL] = makeAuthURLs(isDev ?? false);

  return new Strategy(
    {
      ...config,
      authorizationURL,
      tokenURL,
      scopeSeparator: "+",
    },
    handler
  );
};

export default vatsim;
