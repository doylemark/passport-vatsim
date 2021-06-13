/* eslint-disable camelcase */
export interface ApiResponse {
  data: UserProfile;
}

export interface UserProfile {
  cid: number;
  personal?: Personal;
  vatsim?: Vatsim;
  oauth: OAuth;
}

interface OAuth {
  token_valid: string;
}

interface Vatsim {
  rating: Rating;
  pilotrating: Rating;
  division: Country;
  region: Country;
  subdivision: Subdivision;
}

interface Subdivision {
  id: null;
  name: null;
}

interface Rating {
  id: number;
  long: string;
  short: string;
}

interface Personal {
  name_first?: string;
  name_last?: string;
  name_full?: string;
  email?: string;
  country?: Country;
}

interface Country {
  id: string;
  name: string;
}
